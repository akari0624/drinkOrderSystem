import { WHEN_INSERT_ORDER_COMPLETE } from '@/pages/_makeOrder/type';

export default (state = { errorMsg: '', orderId: '' }, action) => {
    
    switch (action.type) {
        
    case WHEN_INSERT_ORDER_COMPLETE:
        return action.payload;

    default:
        return state;
    }
};
