import {JOIN_ORDER_MAKE_ORDER_RESULT} from '../_joinOrder/type';
import _CloneDeep from 'lodash.clonedeep';

const defaultJoinOrder_make_order_Info = {

    errorMsg: '',
    orderInfo: [],
    lastAddedOrder:null,

};

export default(state = defaultJoinOrder_make_order_Info, action) => {
    switch (action.type) {
    case JOIN_ORDER_MAKE_ORDER_RESULT:

        if(action.payload.errorMsg === ''){
            let newState1 = _CloneDeep(state);
            newState1.orderInfo.push(action.payload.orderInfo);
            newState1.lastAddedOrder = action.payload.orderInfo;
            return newState1;
        }else{

            let newState2 = _CloneDeep(state);
            newState2.errorMsg = action.payload.errorMsg;
            
            return newState2;
        }

    default:
        return state;
    }
};
