import axios from 'axios';
import {getOrderInfoWhenJoinOrder_URL, addOrderMealToOrder_URL} from '../../static/url';
import {JOIN_ORDER_FETCH_INIT_DATA_RESULT, JOIN_ORDER_MAKE_ORDER_RESULT} from '../type';
import HeadersProducer from '../../jwt';


export const getOrderInfoBy_parameterInUrl_andGetvVendorInfoTogether = orderId => {



    return (dispatch) => {
        const promise = axios.post(`${getOrderInfoWhenJoinOrder_URL}`, {orderId}, HeadersProducer.getHeaderAdder().addJWT_Token().getFinalHeaders());

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
