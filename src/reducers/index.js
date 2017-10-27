import { combineReducers } from 'redux';
import DataReducer from './DataReducer';
import HeaderStateReducer from './HeaderStateReducer';
import IMG_SRC_Reducer from './IMG_Preview_srcReducer';

const rootReducer = combineReducers({

    listData: DataReducer,
    headerState:HeaderStateReducer,
    imgPreviewSrcAndImgFile:IMG_SRC_Reducer
});

export default rootReducer;