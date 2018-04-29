import { combineReducers } from 'redux';
import DataReducer from './DataReducer';
import HeaderStateReducer from './HeaderStateReducer';
import IMG_SRC_Reducer from './IMG_Preview_srcReducer';
import Shop_Meal_Init_REDUCER from './Shop_Meal_Init_REDUCER'; 
import VENDOR_DATA_WHEN_MAKE_ORDER_REDUCER from './VENDOR_DATA_WHEN_MAKE_ORDER_REDUCER';
import When_Insert_order_complete_REDUCER from './When_Insert_order_complete_REDUCER';

const rootReducer = combineReducers({

    listData: DataReducer,
    headerState: HeaderStateReducer,
    imgPreviewSrcAndImgFile: IMG_SRC_Reducer,
    mealListInsertResult: Shop_Meal_Init_REDUCER,
    vendorDataWhenMakeOrder: VENDOR_DATA_WHEN_MAKE_ORDER_REDUCER,
    insertOrderResult:When_Insert_order_complete_REDUCER
    
});

export default rootReducer;