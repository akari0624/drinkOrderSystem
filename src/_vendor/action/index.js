import { SET_IMG_SRC_AND_FILE_OBJ_TO_REDUCER,
    DELETE_ONE_ImgSrc_AND_ONE_ImgFile,
    REVOKE_OBJECT_URL_IN_ACTION_CREATOR_TO_MAKE_COMPONENT_PURE,
    WHEN_SHOP_INIT_MEAL_LIST_INSERT_DONE
} from "./type";

import axios from 'axios';
import {UPLOAD_SHOP_INIT_MEAL_LIST_URL} from '../../static/url';

import FileUploadModule from '../../util_func/FileUploadModule';


export const setImgSrcAndFile_ObjToReducer = twoTypeObj => {
  return {
    type: SET_IMG_SRC_AND_FILE_OBJ_TO_REDUCER,
    payload: twoTypeObj
  };
};

export const deleteOneImgSrcAndOneImgFile = tIndex =>{

return {
  type:DELETE_ONE_ImgSrc_AND_ONE_ImgFile,
  payload:tIndex
}

}
 

// extract the revokeObjectURL to here to make PicUploadDropZoneWindow component pure
export const doRevokeObjectURL = urlArr =>{
  
    urlArr.forEach(url =>{
  
      FileUploadModule.removeOneFromBrowserObjectURLCached(url);
      
    });
          
      // reducers 那邊目前沒人接收這個type , 所以一切都是返回previousState , 眾component 就不再render
    return {
  type:REVOKE_OBJECT_URL_IN_ACTION_CREATOR_TO_MAKE_COMPONENT_PURE,
  payload:''
    }
  
  
  }


  export const uploadDataToServer = (mealArr) =>{

    console.log('ajax url',UPLOAD_SHOP_INIT_MEAL_LIST_URL);
console.log(mealArr);

   const response =  axios.post(UPLOAD_SHOP_INIT_MEAL_LIST_URL,{mealArr:mealArr});


    return {
      type:WHEN_SHOP_INIT_MEAL_LIST_INSERT_DONE,
      payload:response
    }


  }