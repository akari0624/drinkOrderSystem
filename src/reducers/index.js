import { combineReducers } from 'redux';
import DataReducer from './DataReducer';
import HeaderStateReducer from './HeaderStateReducer';
import IMG_SRC_Reducer from './IMG_Preview_srcReducer';
import Shop_Meal_Init_REDUCER from './Shop_Meal_Init_REDUCER'; 

const rootReducer = combineReducers({

  listData: DataReducer,
  headerState:HeaderStateReducer,
  imgPreviewSrcAndImgFile:IMG_SRC_Reducer,
  mealListInsertResult:Shop_Meal_Init_REDUCER
});

export default rootReducer;