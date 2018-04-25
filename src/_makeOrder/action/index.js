import axios from 'axios';
import {RETRIEVE_VENDOR_URL} from '../../static/url';
import {VENDOR_DATA_WHEN_MAKE_ORDER} from '../type';

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
    }
};