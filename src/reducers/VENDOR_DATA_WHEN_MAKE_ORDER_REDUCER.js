import cloneDeep from 'lodash.clonedeep';
import { VENDOR_DATA_WHEN_MAKE_ORDER } from '../_makeOrder/type';

const defaultData = { errorMsg: '', vendorData: [] };



export default (state = defaultData, action) => {
    switch (action.type) {

    case VENDOR_DATA_WHEN_MAKE_ORDER:{
      //  let vendorData = cloneDeep(state);
        const vendorData = action.payload;
        return vendorData;
    }

    default:
        return state;
    }
};
