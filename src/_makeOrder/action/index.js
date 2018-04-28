import axios from 'axios';
import {RETRIEVE_VENDOR_URL, INSERT_ORDER_URL} from '../../static/url';
import {VENDOR_DATA_WHEN_MAKE_ORDER, WHEN_INSERT_ORDER_COMPLETE} from '../type';

export const fetchVendor = param => {

    const all = 'all';

    return (dispatch) => {
     
        const res = axios.post(`${RETRIEVE_VENDOR_URL}/${all}`);

        res.then(
            d => dispatch({
                type: VENDOR_DATA_WHEN_MAKE_ORDER,
                payload: d.data
            })
        ).catch(e => dispatch({
            
            type: VENDOR_DATA_WHEN_MAKE_ORDER,
            payload: {errorMsg:'發生網路連線錯誤！請稍後再試', vendorData:[]}
        }));
    };
};


export const insertOrder = reqParams => {


    return (dispatch) => {
     
        const res = axios.post(INSERT_ORDER_URL, reqParams);

        res.then(
            d => dispatch({
                type: WHEN_INSERT_ORDER_COMPLETE,
                payload: d.data
            })
        ).catch(e => dispatch({
            
            type: WHEN_INSERT_ORDER_COMPLETE,
            payload: {errorMsg:'發生網路連線錯誤！請稍後再試', responseId:''}
        }));
    };
};

