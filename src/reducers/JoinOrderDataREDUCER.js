import { JOIN_ORDER_FETCH_INIT_DATA_RESULT } from '../_joinOrder/type';

export default (state = { errorMsg: '', joinOrderInfo: {} }, action) => {
    switch (action.type) {
    case JOIN_ORDER_FETCH_INIT_DATA_RESULT:
        return action.payload;

    default:
        return state;
    }
};
