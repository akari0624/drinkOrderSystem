import axios from 'axios';
import {getOrderInfoWhenJoinOrder_URL, addOrderMealToOrder_URL} from '../../static/url';
import {JOIN_ORDER_FETCH_INIT_DATA_RESULT, JOIN_ORDER_MAKE_ORDER_RESULT} from '../type';

export const getOrderInfoBy_parameterInUrl_andGetvVendorInfoTogether = orderId => {
    return (dispatch) => {
        const promise = axios.post(`${getOrderInfoWhenJoinOrder_URL}`, {orderId});

        promise
            .then(d => dispatch({type: JOIN_ORDER_FETCH_INIT_DATA_RESULT, payload: d.data}))
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
        const promise = axios.post(`${addOrderMealToOrder_URL}`, {orderInfo: makeOrderParamObj});

        promise
            .then(d => dispatch({type: JOIN_ORDER_MAKE_ORDER_RESULT, payload: {
                errorMsg: d.data.errorMsg,
                orderInfo:makeOrderParamObj,
            }}))
            .catch(err => dispatch({
                type: JOIN_ORDER_MAKE_ORDER_RESULT,
                payload: {
                    errorMsg: `發生網路錯誤，請稍候再試，錯誤訊息：${err}`,
                    orderInfo: makeOrderParamObj,
                }
            }));

    };

};
