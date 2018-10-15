import axios from 'axios';
import {getOrderInfoWhenJoinOrder_URL, addOrderMealToOrder_URL} from '../../static/url';
import {JOIN_ORDER_FETCH_INIT_DATA_RESULT, JOIN_ORDER_MAKE_ORDER_RESULT} from '../type';
import Persistance from '../../util_func/persistent_util';
import { jwtKeyInEveryRequestHeader } from '../../conf/keys';



export const getOrderInfoBy_parameterInUrl_andGetvVendorInfoTogether = orderId => {

    const headerContent = {};
    headerContent[jwtKeyInEveryRequestHeader] = Persistance.loadJWTFromLocalStorage();
    const axiosConfig = {headers:headerContent};


    return (dispatch) => {
        const promise = axios.post(`${getOrderInfoWhenJoinOrder_URL}`, {orderId}, axiosConfig);

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

    const headerContent = {};
    headerContent[jwtKeyInEveryRequestHeader] = Persistance.loadJWTFromLocalStorage();
    const axiosConfig = {headers:headerContent};

    return (dispatch) => {
        const promise = axios.post(`${addOrderMealToOrder_URL}`, {orderInfo: makeOrderParamObj}, axiosConfig);

        promise
            .then(d => {
                makeOrderParamObj.savedOrderMealId = d.data.savedOrderMealId;
                dispatch({type: JOIN_ORDER_MAKE_ORDER_RESULT, payload: {
                    errorMsg: d.data.errorMsg,
                    orderInfo:makeOrderParamObj,
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
