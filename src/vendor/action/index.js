import { SET_IMG_SRC_AND_FILE_OBJ_TO_REDUCER,
    DELETE_ONE_ImgSrc_AND_ONE_ImgFile,
    REVOKE_OBJECT_URL_IN_ACTION_CREATOR_TO_MAKE_COMPONENT_PURE
} from "./type";

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
