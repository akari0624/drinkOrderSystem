import axios from 'axios';
import { getOrderInfoWhenJoinOrder_URL } from '../../static/url';
import { JOIN_ORDER_FETCH_INIT_DATA_RESULT } from '../type';

export const getOrderInfoBy_parameterInUrl_andGetvVendorInfoTogether = orderId => {
    return (dispatch) => {
        const promise = axios.post(`${getOrderInfoWhenJoinOrder_URL}`, {
            orderId
        });

        promise
            .then(d =>
                dispatch({
                    type: JOIN_ORDER_FETCH_INIT_DATA_RESULT,
                    payload: d.data
                })
            )
            .catch(e =>
                dispatch({
                    type: JOIN_ORDER_FETCH_INIT_DATA_RESULT,
                    payload: {
                        errorMsg: '發生網路錯誤，請稍候再試',
                        payload: {}
                    }
                })
            );
    };
};