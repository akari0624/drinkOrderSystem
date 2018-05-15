import {JOIN_ORDER_FETCH_INIT_DATA_RESULT} from '../_joinOrder/type';

const defaultJoinOrderInfo = {

    orderInfo: {
        vendor_id: '',
        coda: 0,
        customMessage: '',
        isEnd: false,
        orders: [],
        date: Date.now()
    },
    vendorInfo: {
        vendor_name: '',
        vendor_addreass: '',
        vendor_tel: '',
        meals: [],
        menuImageString: []
    }
};

export default(state = {
    errorMsg: '',
    joinOrderInfo: defaultJoinOrderInfo
}, action) => {
    switch (action.type) {
    case JOIN_ORDER_FETCH_INIT_DATA_RESULT:
        return action.payload;

    default:
        return state;
    }
};
