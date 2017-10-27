import { SET_IMG_SRC_AND_FILE_OBJ_TO_REDUCER,
    DELETE_ONE_ImgSrc_AND_ONE_ImgFile
} from "./type";


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
