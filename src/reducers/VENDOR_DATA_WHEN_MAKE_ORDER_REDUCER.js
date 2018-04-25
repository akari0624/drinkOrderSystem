import cloneDeep from 'lodash.clonedeep';
import { VENDOR_DATA_WHEN_MAKE_ORDER } from '../_makeOrder/type';

export default (state = { errorMsg: '', vendorData: [] }, action) => {
    switch (action.type) {

    case VENDOR_DATA_WHEN_MAKE_ORDER:{
        let vendorData = cloneDeep(state);
        vendorData = action.payload;
        return vendorData;
    }

    default:
        return state;
    }
};
