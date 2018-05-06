import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {
    Container,
    InputGroup,
    InputGroupAddon,
    Input,
    Button,
    ListGroup,
    ListGroupItem
} from 'reactstrap';
import Styled from 'styled-components';

import { getOrderInfoBy_parameterInUrl_andGetvVendorInfoTogether } from '../action';
import { join_order_web_socket_url } from '../../static/url';
import VendorCard from '../../_makeOrder/components/VendorCard';
import VendorCardMealMenuModal from '../../_makeOrder/components/VendorMealMenuModal';

const FixedHeightAndScrollableDiv = Styled.div`
overflow-y:auto;
max-height:300px;
height:300px;
border:1px solid black;
`;

const SelfMsgDiv = Styled.div`
text-align:right;
`;

class JoinOrderMain extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            chatRoomMessage: [],   // [{senderId:String, msg:String},{},{}.....]
            isVendorDetailModalOpen: false
        };

        this.conn = null;
        this.wsClientId = null;

        this.get_orderId_from_url_params = this.get_orderId_from_url_params.bind(this);
        this.whenWebSocketInitConnect = this.whenWebSocketInitConnect.bind(this);
        this.onSendMessageButtonClick = this.onSendMessageButtonClick.bind(this);

        this.onMessageInputChange = this.onMessageInputChange.bind(this);

        this.catchEnterPress = this.catchEnterPress.bind(this);

        this.renderChatContentList = this.renderChatContentList.bind(this);

        this.onWebSocketMessage = this.onWebSocketMessage.bind(this);

        this.toggleMenuModal = this.toggleMenuModal.bind(this);
    }

    get_orderId_from_url_params() {
        const orderId = this.props.match.params.orderId;
        return orderId;
    }

    onSendMessageButtonClick() {
        const msgObj = {
            type: 'sending-message',
            orderId: this.props.match.params.orderId,
            clientId:this.wsClientId,
            message: this.state.message
        };
        this.conn.send(JSON.stringify(msgObj));
        this.setState({ message: '' });
    }

    onMessageInputChange(e) {
        if (e.target.name === 'msgInput') {
            this.setState({ message: e.target.value });
        }
    }

    catchEnterPress(e) {
        const keyCode = e.key;
        if (keyCode === 'Enter') {
            this.onSendMessageButtonClick();
        }
    }

    renderChatContentList() {
        return this.state.chatRoomMessage.map((msgObj, i) => {

            if(msgObj.senderId !== this.wsClientId){

                return   (<ListGroupItem key={i}> {msgObj.msg}</ListGroupItem>);
            }else{
                return (<SelfMsgDiv key={i}>{msgObj.msg}</SelfMsgDiv>);
            }
        });
    }

    toggleMenuModal() {
        const reverseCondirtion =
            this.state.isVendorDetailModalOpen === false ? true : false;
        this.setState({
            isVendorDetailModalOpen: reverseCondirtion
        });
    }

    render() {
        const data = this.props.joinOrderData;

        console.log('in render,  data :', data);
        if (
            data.errorMsg === '' &&
            Object.keys(data.joinOrderInfo).length === 0
        ) {
            return <div>Loading....</div>;
        } else if (
            data.errorMsg !== '' &&
            Object.keys(data.joinOrderInfo).length === 0
        ) {
            return <div> 發生錯誤！！ {data.errorMsg}</div>;
        } else {
            return (
                <Container>
                    <FixedHeightAndScrollableDiv>
                        <ListGroup>{this.renderChatContentList()}</ListGroup>
                    </FixedHeightAndScrollableDiv>
                    <InputGroup>
                        <Input
                            name="msgInput"
                            onChange={this.onMessageInputChange}
                            value={this.state.message}
                            onKeyPress={this.catchEnterPress}
                        />
                        <InputGroupAddon addonType="append">
                            <Button onClick={this.onSendMessageButtonClick}>
                                傳送訊息
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
                    <VendorCardMealMenuModal
                        isOpen={this.state.isVendorDetailModalOpen}
                        toggleMenu={this.toggleMenuModal}
                        mealData={data.joinOrderInfo.vendorInfo.meals}
                        vendorImgSrcArr={
                            data.joinOrderInfo.vendorInfo.menuImageString
                        }
                        vendorIndex={0}
                        isShowChooseThisOneButton={false}
                    />
                    <VendorCard
                        key={data.joinOrderInfo.vendorInfo._id}
                        alt="pic"
                        imgSrcArr={
                            data.joinOrderInfo.vendorInfo.menuImageString
                        }
                        name={data.joinOrderInfo.vendorInfo.vendor_name}
                        substitle={
                            data.joinOrderInfo.vendorInfo.vendor_addreass
                        }
                        text={data.joinOrderInfo.vendorInfo.vendor_tel}
                        toggleMenu={this.toggleMenuModal}
                        indexIntheVendorArray={0}
                    />
                </Container>
            );
        }
    }

    whenWebSocketInitConnect() {
        console.log('ws connection establish');

        const orderId = this.props.match.params.orderId;
        const message = { type: 'isRoomExist', orderId: orderId };

        this.conn.send(JSON.stringify(message));
    }

    onWebSocketMessage(e) {
        const data = JSON.parse(e.data);

        if (data.type === 'yourWsClientId') {

            this.wsClientId = data.msg;

        } else if (data.type === 'braodcastMessage') {
            const newMessageArr = this.state.chatRoomMessage.slice(
                0,
                this.state.chatRoomMessage.length + 1
            );

            const msgData = 
            {senderId:data.senderId,
                msg: data.msg};

            newMessageArr.push(msgData);
            this.setState({
                chatRoomMessage: newMessageArr
            });
        }
    }

    componentDidMount() {
        this.props.getOrderInitData(this.get_orderId_from_url_params());

        this.conn = new WebSocket(join_order_web_socket_url);

        this.conn.addEventListener('open', this.whenWebSocketInitConnect);
        this.conn.addEventListener('message', this.onWebSocketMessage);
    }

    componentWillUnmount() {
        if (this.conn) {
            this.conn.close();
            this.conn.removeEventListener(
                'open',
                this.whenWebSocketInitConnect
            );
            this.conn.removeEventListener('message', this.onWebSocketMessage);
        }
    }
}

function mapStateToProps({ joinOrderData }) {
    return {
        joinOrderData
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getOrderInitData: getOrderInfoBy_parameterInUrl_andGetvVendorInfoTogether
        },
        dispatch
    );
}

JoinOrderMain.propTypes = {
    match: PropTypes.object.isRequired,
    getOrderInitData: PropTypes.func,
    joinOrderData: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinOrderMain);