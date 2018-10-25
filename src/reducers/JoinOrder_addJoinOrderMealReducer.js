import {JOIN_ORDER_MAKE_ORDER_RESULT, JOIN_ORDER_ORDER_I_MAKE_FROM_INIT_FETCH_ORDER, AFTER_DELETE_SELF_ORDERED_MEAL_SUCCESS} from '../_joinOrder/type';
import _CloneDeep from 'lodash.clonedeep';

const defaultJoinOrder_make_order_Info = {

    errorMsg: '',
    orderInfo: [],
    lastAddedOrder: null
};

const afterDeleteSelfOrderedMealSuccess = (oldState, payload) => {

    const {orderedMealId} = payload;
    let newCopiedState = _CloneDeep(oldState);

    const newOrderInfo = newCopiedState
        .orderInfo
        .filter(o => o._id !== orderedMealId);

    newCopiedState.orderInfo = newOrderInfo;
    newCopiedState.lastAddedOrder  = null;

    return newCopiedState;
};

export default(state = defaultJoinOrder_make_order_Info, action) => {
    switch (action.type) {
        case JOIN_ORDER_MAKE_ORDER_RESULT:

            if (action.payload.errorMsg === '') {
                let newState1 = _CloneDeep(state);
                newState1
                    .orderInfo
                    .push(action.payload.orderInfo);
                newState1.lastAddedOrder = action.payload.orderInfo;
                return newState1;
            } else {

                let newState2 = _CloneDeep(state);
                newState2.errorMsg = action.payload.errorMsg;

                return newState2;
            }

        case JOIN_ORDER_ORDER_I_MAKE_FROM_INIT_FETCH_ORDER:
            let newState3 = _CloneDeep(state);
            newState3.orderInfo = [
                ...newState3.orderInfo,
                ...action.payload
            ];

            return newState3;

        case AFTER_DELETE_SELF_ORDERED_MEAL_SUCCESS:

            return afterDeleteSelfOrderedMealSuccess(state, action.payload);

        default:
            return state;
    }
};
