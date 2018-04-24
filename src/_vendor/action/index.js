import { SET_IMG_SRC_AND_FILE_OBJ_TO_REDUCER,
    DELETE_ONE_ImgSrc_AND_ONE_ImgFile,
    REVOKE_OBJECT_URL_IN_ACTION_CREATOR_TO_MAKE_COMPONENT_PURE,
    WHEN_SHOP_INIT_MEAL_LIST_INSERT_DONE,
    REMOVE_ThoseFileArrAndObjectURLArr_but_also_returnObjectUrlArr_to_RevokeObjectURL
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
  
      console.log('revoke this objectURL:',url);
      FileUploadModule.removeOneFromBrowserObjectURLCached(url);
      
    });
          
      // reducers 那邊目前沒人接收這個type , 所以一切都是返回previousState , 眾component 就不再render
    return {
  type:REVOKE_OBJECT_URL_IN_ACTION_CREATOR_TO_MAKE_COMPONENT_PURE,
  payload:''
    }
  
  
  }


  export const uploadDataToServer = (mealArr, img_fileArr) =>{

    console.log('ajax url',UPLOAD_SHOP_INIT_MEAL_LIST_URL);
console.log(mealArr);

  const formDataObj = new FormData();

  formDataObj.append('mealArr',JSON.stringify(mealArr));

  for(let i=0;i<img_fileArr.length;i+=1) {

    let currFile = img_fileArr[i];
    formDataObj.append('menuImg_fileArr',currFile,currFile.name);

  };


    let config = {headers:{'Content-Type':'multipart/form-data'}};

  // const response =  axios.post(UPLOAD_SHOP_INIT_MEAL_LIST_URL,{mealArr:mealArr});
  

    return (dispatch) => {

      const promise =  axios.post(UPLOAD_SHOP_INIT_MEAL_LIST_URL, formDataObj, config);
  
      promise.then(d => {
        dispatch({
          type:WHEN_SHOP_INIT_MEAL_LIST_INSERT_DONE,
          payload:d.data
        });
      }).catch(e => {
        dispatch({
          type:WHEN_SHOP_INIT_MEAL_LIST_INSERT_DONE,
          payload:{errorMsg:'目前網路連線問有問題，請稍後再試'}
        });
      })

    }


  }

  export const removeThoseFileArrAndObjectURLArr_but_also_returnObjectUrlArr_to_RevokeObjectURL = ()=>{


   return {
type:REMOVE_ThoseFileArrAndObjectURLArr_but_also_returnObjectUrlArr_to_RevokeObjectURL,
payload:''

   }

  }