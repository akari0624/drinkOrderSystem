import {CHANGE_OTHERS_ORDER_FROM_INIT_FETCH} from '@/pages/_joinOrder/type';
import _CloneDeep from 'lodash.clonedeep';

const defaultJoinOrder_OthersOrderState = {

    othersOrders: []
};

export default(state = defaultJoinOrder_OthersOrderState, action) => {
    switch (action.type) {
        case CHANGE_OTHERS_ORDER_FROM_INIT_FETCH:

            return {othersOrders:[
                ...defaultJoinOrder_OthersOrderState,
                ...action.payload
            ]};

        default:
            return state;
    }
};
