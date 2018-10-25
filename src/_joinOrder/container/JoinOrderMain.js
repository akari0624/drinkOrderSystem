import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {
    InputGroup,
    InputGroupAddon,
    Input,
    Button,
    ListGroup,
    ListGroupItem
} from 'reactstrap';
import Styled from 'styled-components';
import _CloneDeep from 'lodash/cloneDeep';

import {getOrderInfoBy_parameterInUrl_andGetvVendorInfoTogether} from '../action';
import {join_order_web_socket_url} from '../../static/url';
import VendorCard from '../../_makeOrder/components/VendorCard';
import VendorMealMenuModalClickAble from '../component/VendorMealMenuModal';
import OrderIMake_ListArea from '../component/Order_I_Make_ListArea';
import OthersOrder_ListArea from '../component/Others_order_ListArea';

import {generateCorrespondingOrderInfoChatMessage, generateCorrespondingDeleteOrderInfoChatMessage, examineIsMyOrder} from '../view_model/wsLogic';

const FlexContainer = Styled.main `
  width:100vw;
  height:100vh;
  display:flex;
  flex-direction:row-reverse;
  justify-content:center;

  @media (max-width:${props => props.theme.mobileOneColumnWidth}){
    flex-direction:column;
    flex-wrap:wrap;
  }
`;

const WSMsgArea = Styled.section `

    width:30%;
    max-height:100%;
    height:100%;
  @media (max-width:${props => props.theme.mobileOneColumnWidth}){
    
      width:100%;
      max-height:300px;
      height:300px;
    }
`;

const VendorAndMealWrapper = Styled.section `
     width:70%;

  @media (max-width:${props => props.theme.mobileOneColumnWidth}){
    
      width:100%;
 
    }
`;

const FixedHeightAndScrollableDiv = Styled.div `
   
    width:100%;
    overflow-y:auto;
    height:80%;
    border:1px solid black;
`;

const SelfMsgDiv = Styled.div `
   text-align:right;
   margin-right:18px;
`;

class JoinOrderMain extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            chatRoomMessage: [], // [{senderId:String, msg:String},{},{}.....]
            isVendorDetailModalOpen: false,
            othersOrder: []
        };

        this.conn = null;
        this.wsClientId = null;

        this.get_orderId_from_url_params = this
            .get_orderId_from_url_params
            .bind(this);
        this.whenWebSocketInitConnect = this
            .whenWebSocketInitConnect
            .bind(this);
        this.onSendMessageButtonClick = this
            .onSendMessageButtonClick
            .bind(this);

        this.onMessageInputChange = this
            .onMessageInputChange
            .bind(this);

        this.catchEnterPress = this
            .catchEnterPress
            .bind(this);

        this.renderChatContentList = this
            .renderChatContentList
            .bind(this);

        this.onWebSocketMessage = this
            .onWebSocketMessage
            .bind(this);

        this.toggleMenuModal = this
            .toggleMenuModal
            .bind(this);

        this.brocastAddOrderSuccessMessage = this
            .brocastAddOrderSuccessMessage
            .bind(this);

        this.brocastDeleteOrderSuccessMessage = this.brocastDeleteOrderSuccessMessage.bind(this);    
    }

    get_orderId_from_url_params() {
        const orderId = this.props.match.params.orderId;
        return orderId;
    }

    // 送出普通聊天訊息
    onSendMessageButtonClick() {

        const currMsg = this.state.message;
        if (currMsg === '') {
            return;
        }

        const nestedMessage = {
            userName: this.props.userData.userName,
            userPhoto: this.props.userData.photoLink,
            msg: currMsg
        };

        const msgObj = {
            type: 'sending-message',
            orderId: this.props.match.params.orderId,
            clientId: this.wsClientId,
            message: nestedMessage
        };
        this
            .conn
            .send(JSON.stringify(msgObj));
        this.setState({message: ''});
    }

    onMessageInputChange(e) {
        if (e.target.name === 'msgInput') {
            this.setState({message: e.target.value});
        }
    }

    catchEnterPress(e) {
        const keyCode = e.key;
        if (keyCode === 'Enter') {
            this.onSendMessageButtonClick();
        }
    }


    renderUserPhoto = (msgObj) => {

        if(msgObj.userPhoto){
            return <img src={msgObj.userPhoto} />;
        }
    }

    renderMsg = (msgObj) => {
        if(msgObj.userName){
            return  `${msgObj.userName} : ${msgObj.msg}`;
        }

        return msgObj.msg;

    } 

    renderMessage = (msgObj,i) => {
        if (msgObj.senderId !== this.wsClientId) {
            return (
                <ListGroupItem key={i}>
                    {this.renderUserPhoto(msgObj)}
                    {this.renderMsg(msgObj)}</ListGroupItem>
            );
        }
        return (
            <SelfMsgDiv key={i}>
                {msgObj.msg}</SelfMsgDiv>
        );

    }

    renderChatContentList() {
        return this
            .state
            .chatRoomMessage
            .map((msgObj, i) => this.renderMessage(msgObj, i));
    }

    toggleMenuModal() {
        const reverseCondirtion = this.state.isVendorDetailModalOpen === false
            ? true
            : false;
        this.setState({isVendorDetailModalOpen: reverseCondirtion});
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        return {othersOrder: nextProps.joinOrder_othersOrdersFormInitFetch.othersOrders};

    }

    render() {
        const data = this.props.joinOrderData;

        if (data.errorMsg === '' && Object.keys(data.joinOrderInfo).length === 0) {
            return <div>Loading....</div>;
        } else if (data.errorMsg !== '' && Object.keys(data.joinOrderInfo).length === 0) {
            return <div>
                發生錯誤！！ {data.errorMsg}</div>;
        } else {

            console.log(`glovalErrorMsg ?${this.props.globalErrorMsg.value}`);
            return (
                <FlexContainer>
                    <WSMsgArea>

                        <FixedHeightAndScrollableDiv>
                            <ListGroup>{this.renderChatContentList()}</ListGroup>
                        </FixedHeightAndScrollableDiv>
                        <InputGroup>
                            <Input
                                name="msgInput"
                                onChange={this.onMessageInputChange}
                                value={this.state.message}
                                onKeyPress={this.catchEnterPress}/>
                            <InputGroupAddon addonType="append">
                                <Button color="primary" onClick={this.onSendMessageButtonClick}>
                                    傳送訊息
                                </Button>
                            </InputGroupAddon>
                        </InputGroup>

                    </WSMsgArea>
                    <VendorAndMealWrapper>

                        <VendorMealMenuModalClickAble
                            isOpen={this.state.isVendorDetailModalOpen}
                            toggleMenu={this.toggleMenuModal}
                            mealData={data.joinOrderInfo.vendorInfo.meals}
                            vendorImgSrcArr={data.joinOrderInfo.vendorInfo.menuImageString}
                            vendorIndex={0}
                            isShowChooseThisOneButton={false}/>
                        <VendorCard
                            key={data.joinOrderInfo.vendorInfo._id}
                            alt="pic"
                            imgSrcArr={data.joinOrderInfo.vendorInfo.menuImageString}
                            name={data.joinOrderInfo.vendorInfo.vendor_name}
                            substitle={data.joinOrderInfo.vendorInfo.vendor_addreass}
                            text={data.joinOrderInfo.vendorInfo.vendor_tel}
                            toggleMenu={this.toggleMenuModal}
                            indexIntheVendorArray={0}/>

                        <OthersOrder_ListArea othersOrder={this.state.othersOrder}/>
                        <OrderIMake_ListArea
                            currMyOrderArr={this.props.joinOrder_orderIMake.orderInfo}/>

                    </VendorAndMealWrapper>
                </FlexContainer>
            );
        }
    }

    brocastAddOrderSuccessMessage(lastAddedSuccessOrder) {

        const msgObj = {
            type: 'sending-message-order-added',
            orderId: this.props.match.params.orderId,
            clientId: this.wsClientId,
            message: lastAddedSuccessOrder
        };
        this
            .conn
            .send(JSON.stringify(msgObj));

    }

    brocastDeleteOrderSuccessMessage(lastAddedSuccessOrder) {

        const msgObj = {
            type: 'sending-message-order-deleted',
            orderId: this.props.match.params.orderId,
            clientId: this.wsClientId,
            message: lastAddedSuccessOrder
        };
        this
            .conn
            .send(JSON.stringify(msgObj));

    }

    

    componentDidUpdate(prevProps) {

        const lastAddedSuccessMeal = this.props.joinOrder_orderIMake.lastAddedOrder;

        /* 上一次props裡的lastAddedOrder有值  這一次沒值，代表剛成功做完一次刪除 */
        if(prevProps.joinOrder_orderIMake.lastAddedOrder && !lastAddedSuccessMeal){
            this.brocastDeleteOrderSuccessMessage(prevProps.joinOrder_orderIMake.lastAddedOrder);
            return;
        }

        if (lastAddedSuccessMeal !== prevProps.joinOrder_orderIMake.lastAddedOrder) {

            if (lastAddedSuccessMeal) {

                this.brocastAddOrderSuccessMessage(lastAddedSuccessMeal);
            }

        }

    }

    whenWebSocketInitConnect() {
        console.log('ws connection established');

        const orderId = this.props.match.params.orderId;
        const message = {
            type: 'isRoomExist',
            orderId: orderId
        };

        this
            .conn
            .send(JSON.stringify(message));
    }

    onWebSocketMessage(e) {
        const data = JSON.parse(e.data);

        if (data.type === 'yourWsClientId') {

            this.wsClientId = data.msg;

        } else if (data.type === 'braodcastChatMessage') {
            const newMessageArr = this
                .state
                .chatRoomMessage
                .slice(0, this.state.chatRoomMessage.length + 1);

            const msgData = {
                senderId: data.senderId,
                userName: data.msg.userName,
                userPhoto: data.msg.userPhoto,
                msg: data.msg.msg
            };

            newMessageArr.push(msgData);

            this.setState({chatRoomMessage: newMessageArr});
        } else if (data.type === 'braodcastOrderInfoMessage') {

            const orderChatMsgData = {
                senderId: data.senderId,
                msg: generateCorrespondingOrderInfoChatMessage(data, this.wsClientId)
            };

            if (!examineIsMyOrder(data.senderId, this.wsClientId)) {

                this.setState(prevState => {

                    const othersOrderCopied = _CloneDeep(prevState.othersOrder);
                    othersOrderCopied.push(data.msg);

                    return {othersOrder: othersOrderCopied};
                });
            }

            this.setState(prevState => {
                return {
                    chatRoomMessage: [
                        ...prevState.chatRoomMessage,
                        orderChatMsgData
                    ]
                };
            });

        }else if(data.type === 'braodcastDeleteOrderInfoMessage'){

            const orderChatMsgData = {
                senderId: data.senderId,
                msg: generateCorrespondingDeleteOrderInfoChatMessage(data, this.wsClientId)
            };

            if (!examineIsMyOrder(data.senderId, this.wsClientId)) {

                this.setState(prevState => {

                    const othersOrderCopied = _CloneDeep(prevState.othersOrder);
                    return {othersOrder: othersOrderCopied.filter(o => o._id !== data.msg._id)};
                });
            }

            this.setState(prevState => {
                return {
                    chatRoomMessage: [
                        ...prevState.chatRoomMessage,
                        orderChatMsgData
                    ]
                };
            });

        }
    }

    componentDidMount() {
        this
            .props
            .getOrderInitData(this.get_orderId_from_url_params(), this.props.userData.userID);

        this.conn = new WebSocket(join_order_web_socket_url);

        this
            .conn
            .addEventListener('open', this.whenWebSocketInitConnect);
        this
            .conn
            .addEventListener('message', this.onWebSocketMessage);
    }

    componentWillUnmount() {
        if (this.conn) {
            this
                .conn
                .close();
            this
                .conn
                .removeEventListener('open', this.whenWebSocketInitConnect);
            this
                .conn
                .removeEventListener('message', this.onWebSocketMessage);
        }
    }
}

function mapStateToProps({joinOrderData, joinOrder_orderIMake, joinOrder_othersOrdersFormInitFetch, userData, errorMsg}) {
    return {
        joinOrderData, 
        joinOrder_orderIMake, 
        joinOrder_othersOrdersFormInitFetch, 
        userData, 
        globalErrorMsg:errorMsg
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getOrderInitData: getOrderInfoBy_parameterInUrl_andGetvVendorInfoTogether
    }, dispatch);
}

JoinOrderMain.propTypes = {
    match: PropTypes.object.isRequired,
    getOrderInitData: PropTypes.func,
    joinOrderData: PropTypes.object,
    joinOrder_orderIMake: PropTypes.object,
    joinOrder_othersOrdersFormInitFetch: PropTypes.object.isRequired,
    userData: PropTypes.object.isRequired,
    globalErrorMsg: PropTypes.object,   /* from redux store */
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinOrderMain);
