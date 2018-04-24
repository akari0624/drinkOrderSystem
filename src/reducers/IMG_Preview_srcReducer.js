import cloneDeep from 'lodash.clonedeep';

import {SET_IMG_SRC_AND_FILE_OBJ_TO_REDUCER,
    DELETE_ONE_ImgSrc_AND_ONE_ImgFile,
    REMOVE_ThoseFileArrAndObjectURLArr_but_also_returnObjectUrlArr_to_RevokeObjectURL
} from '../_vendor/action/type';

import {MAXUploadPicQuantityOfThisApp} from '../util_func/FileUploadModule';


const identifyPushPicInOrReplaceThem = (action, copyState) => {


  if(((MAXUploadPicQuantityOfThisApp - copyState.imgPreviewSrcArr.length ) >= action.payload.imgPreviewSrcArr.length) ){


    action.payload.imgPreviewSrcArr.forEach( (currSrc) => {
        copyState.imgPreviewSrcArr.push(currSrc);

    });    
    
    action.payload.fileArr.forEach( (currFile) => {
        copyState.fileArr.push(currFile);

    });  

    copyState.srcToDelete = [];
    return copyState;

  }else{

action.payload.srcToDelete = copyState.imgPreviewSrcArr;

    return action.payload;
  }


};


export default function(state={imgPreviewSrcArr:[],fileArr:[], srcToDelete:[]},action){

   switch(action.type){


    case SET_IMG_SRC_AND_FILE_OBJ_TO_REDUCER:

      const copiedState = cloneDeep(state);


      return identifyPushPicInOrReplaceThem(action, copiedState);

    case DELETE_ONE_ImgSrc_AND_ONE_ImgFile:

        const tIndex = action.payload;

        const copiedImgSrcArr = Array.from(state.imgPreviewSrcArr);
        const copiedImgFileArr = Array.from(state.fileArr);
        const theOneDeletedImgSrc = copiedImgSrcArr.splice(tIndex,1);
        copiedImgFileArr.splice(tIndex,1);

        // 還必須做 window.URL.revokeObjectURL(objUrl) .....  可以把這個被刪掉的url傳回component , 
        // 在component那邊做 , 讓reducer保持pure
        return {
            imgPreviewSrcArr:copiedImgSrcArr,        
            fileArr:copiedImgFileArr,
            srcToDelete:theOneDeletedImgSrc}

    case REMOVE_ThoseFileArrAndObjectURLArr_but_also_returnObjectUrlArr_to_RevokeObjectURL:
    
        const objectURL_ImgArr_toRevoke = [...state.imgPreviewSrcArr];

        const newState ={imgPreviewSrcArr:[],fileArr:[],srcToDelete:objectURL_ImgArr_toRevoke};

        
        state.imgPreviewSrcArr = [];
        state.fileArr = [];   

        return newState

      default:
      return state;

   }



}