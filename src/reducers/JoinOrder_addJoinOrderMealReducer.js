import {JOIN_ORDER_MAKE_ORDER_RESULT} from '../_joinOrder/type';

const defaultJoinOrder_make_order_Info = {

    errorMsg: '',
    orderInfo: null,
    
};

export default(state = {
    joinOrderInfo: defaultJoinOrder_make_order_Info
}, action) => {
    switch (action.type) {
    case JOIN_ORDER_MAKE_ORDER_RESULT:
        return action.payload;

    default:
        return state;
    }
};
