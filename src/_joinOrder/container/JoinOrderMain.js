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
import Styled  from 'styled-components';

import { getOrderInfoBy_parameterInUrl_andGetvVendorInfoTogether } from '../action';
import { join_order_web_socket_url } from '../../static/url';


const FixedHeightAndScrollableDiv = Styled.div`
overflow-y:auto;
max-height:300px;
height:300px;
border:1px solid black;
`;

class JoinOrderMain extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message:'',
            chatRoomMessage:[]
        };

        this.conn = null;
        this.get_orderId_from_url_params = this.get_orderId_from_url_params.bind(
            this
        );
        this.whenWebSocketInitConnect = this.whenWebSocketInitConnect.bind(
            this
        );
        this.onSendMessageButtonClick = this.onSendMessageButtonClick.bind(this);

        this.onMessageInputChange = this.onMessageInputChange.bind(this);

        this.catchEnterPress = this.catchEnterPress.bind(this);

        this.renderChatContentList = this.renderChatContentList.bind(this);

        this.onWebSocketMessage = this.onWebSocketMessage.bind(this);

    }

    get_orderId_from_url_params() {
        const orderId = this.props.match.params.orderId;
        return orderId;
    }

    onSendMessageButtonClick(){

        this.conn.send(this.state.message);
        this.setState({message:''});
    }

    onMessageInputChange(e){
        if(e.target.name === 'msgInput'){
            this.setState({message:e.target.value});
        }

    }

    catchEnterPress(e){

        const keyCode =e.key;
        if(keyCode === 'Enter'){
            
            this.onSendMessageButtonClick();

        }
    }

    renderChatContentList(){

        return this.state.chatRoomMessage.map((msg, i) => (
            <ListGroupItem key={i}> {msg}</ListGroupItem> )
        );
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
                        <Input name="msgInput" onChange={this.onMessageInputChange} value={this.state.message} onKeyPress={this.catchEnterPress}/>
                        <InputGroupAddon addonType="append">
                            <Button onClick={this.onSendMessageButtonClick}>傳送訊息</Button>
                        </InputGroupAddon>
                    </InputGroup>
                </Container>
            );
        }
    }

    whenWebSocketInitConnect() {
        console.log('ws connection establish');

        this.conn.send('hello ws server');
    }

    onWebSocketMessage(e){
        const newMessageArr = this.state.chatRoomMessage.slice(0,this.state.chatRoomMessage.length+1);
        newMessageArr.push(e.data);
        this.setState({
            chatRoomMessage:newMessageArr
        });
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
