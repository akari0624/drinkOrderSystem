import axios from 'axios';
import {getOrderInfoWhenJoinOrder_URL, addOrderMealToOrder_URL} from '../../static/url';
import {
    JOIN_ORDER_FETCH_INIT_DATA_RESULT, 
    JOIN_ORDER_MAKE_ORDER_RESULT,
    JOIN_ORDER_ORDER_I_MAKE_FROM_INIT_FETCH_ORDER,
    CHANGE_OTHERS_ORDER_FROM_INIT_FETCH
} from '../type';
import HeadersProducer from '../../jwt';



const _getMyOrderFromOrderInitFetchData = (data, myID) => { 

    const orders = data.joinOrderInfo.orderInfo.orders;
    console.log('orders in getMyOrder', orders);
    
    const result = orders.filter( d => d.orderer_userID === myID ? true: false);

    console.log('my', result);

    return result;

};


const _getOthersOrderFromOrderInitFetchData = (data, myID)  => { 
    
    const orders = data.joinOrderInfo.orderInfo.orders;
    console.log('orders in getOthersOrder', orders);

    const result = orders.filter( d => d.orderer_userID === myID ? false: true);

    console.log('others', result);

    return result;

};

export const getOrderInfoBy_parameterInUrl_andGetvVendorInfoTogether = (orderId, currUserOAuthID) => {


    return (dispatch) => {
        const promise = axios.post(`${getOrderInfoWhenJoinOrder_URL}`, {orderId}, HeadersProducer.getHeaderAdder().addJWT_Token().getFinalHeaders());

        promise
            .then(d => {
                dispatch({type: JOIN_ORDER_ORDER_I_MAKE_FROM_INIT_FETCH_ORDER, payload: _getMyOrderFromOrderInitFetchData(d.data, currUserOAuthID)});
                dispatch({type:CHANGE_OTHERS_ORDER_FROM_INIT_FETCH, payload:_getOthersOrderFromOrderInitFetchData(d.data, currUserOAuthID)});
                dispatch({type: JOIN_ORDER_FETCH_INIT_DATA_RESULT, payload: d.data});

            })
            .catch(e => dispatch({
                type: JOIN_ORDER_FETCH_INIT_DATA_RESULT,
                payload: {
                    errorMsg: '發生網路錯誤，請稍候再試',
                    payload: {joinOrderInfo:{}},
                }
            }));
    };
};

export const makeOrder = makeOrderParamObj => {


    return (dispatch) => {
        const promise = axios.post(`${addOrderMealToOrder_URL}`, {orderInfo: makeOrderParamObj}, HeadersProducer.getHeaderAdder().addJWT_Token().getFinalHeaders());

        promise
            .then(d => {
            // makeOrderParamObj.savedOrderMealId = d.data.savedOrderMeal._id;
                dispatch({type: JOIN_ORDER_MAKE_ORDER_RESULT, payload: {
                    errorMsg: d.data.errorMsg,
                    orderInfo:d.data.savedOrderMeal,
                }});
            }
            )
            .catch(err => dispatch({
                type: JOIN_ORDER_MAKE_ORDER_RESULT,
                payload: {
                    errorMsg: `發生網路錯誤，請稍候再試，錯誤訊息：${err}`,
                    orderInfo: makeOrderParamObj,
                }
            }));

    };

};
