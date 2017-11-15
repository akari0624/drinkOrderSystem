import React, { Component } from "react";
import {Container, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {connect} from 'react-redux';
import {setImgSrcAndFile_ObjToReducer,deleteOneImgSrcAndOneImgFile,doRevokeObjectURL} from '../action/index';
import {bindActionCreators} from 'redux';

import FileUploadModule from "../../util_func/FileUploadModule";
import PicEnlargeWindow from "./PicEnlargeWindow";

class PicUploadDropZoneWindow extends Component {

  state = {

picPreviewEnlargeWindowModal:false,
currentEnlargeImgSrc:'',
currEnlargeImageIndex:888

  }


  onDrag_enter = e => {
    e.stopPropagation();
    e.preventDefault();
  };
  onDrag_over = e => {
    e.stopPropagation();
    e.preventDefault();
  };
  onFileReallyDrop = e => {
    e.stopPropagation();   // 停止事件繼續往上冒泡
    e.preventDefault();

    const  twoTypeObj = FileUploadModule.onFileDrop(e.dataTransfer.files);

    // 把srcArr 跟 Files 送進redux裡，讓FileUploadModule不負責保管這些東西
    if(twoTypeObj.imgPreviewSrcArr.length > 0){

        this.props.setImgSrcAndFile_ObjToReducer(twoTypeObj);
    }
    // srcArr如果長度是0 代表圖片張數超過可上傳數量上限
    
  };

  enlargePicClickCallback = (anSrc,tIndex) => {

    this.setState({

        picPreviewEnlargeWindowModal:true,
        currentEnlargeImgSrc:anSrc,
        currEnlargeImageIndex:tIndex
    });

  }

  
 

  renderPreviewImage = (imgSrcArr)=>{

   return imgSrcArr.map((anSrc,tIndex)=>(

    <img key={tIndex} 
         src={anSrc} 
         style={{width:'100px'}}
         onClick={this.enlargePicClickCallback.bind(this,anSrc,tIndex)}
         />

   ));


  }

  togglePicEnlargeWindow =()=>{

    this.setState({
        picPreviewEnlargeWindowModal:!this.state.picPreviewEnlargeWindowModal   
    });
  }

  deleteThisPicCallback = (tIndex) =>{

    // const copiedImgSrcArr = Array.from(this.state.imgSrcArr);
    // const [removed] = copiedImgSrcArr.splice(tIndex,1);
    
    // FileUploadModule.removeOne(tIndex);

    // this.setState({

    //     imgSrcArr:copiedImgSrcArr
    // });


   // 用 action 連結 redux , 以tIndex作為參數  刪掉兩個arr裡要被刪掉的那一個

   this.props.deleteOneImgSrcAndOneImgFile(tIndex);
  }


  onUploadConfirmClick = (propsFileList) =>{

// 用 FileUploadModule  做上傳
console.log('必須實作 用 FileUploadModule  做上傳');

  }

  render() {
      const {srcToDelete, imgFileArr} = this.props;
      
      console.log('srcToDelete :', srcToDelete);
      console.log('blob file :', imgFileArr.length);

    if(srcToDelete.length > 0){

            this.props.doRevokeObjectURL(srcToDelete);

        };

    

    return (

<Container>
<PicEnlargeWindow 
        isOpen={this.state.picPreviewEnlargeWindowModal}
        toggle={this.togglePicEnlargeWindow}
        imageSrc={this.state.currentEnlargeImgSrc}
        currEnlargeImageIndex={this.state.currEnlargeImageIndex}
        deleteThisPicCallback = {this.deleteThisPicCallback}
/>

      <Modal
        isOpen={this.props.fileUploadDropZoneModal}
        toggle={this.props.togglePicUploadWindow}
      >
        <ModalHeader toggle={this.props.togglePicUploadWindow}>
          上傳該店菜單圖片
        </ModalHeader>
        <ModalBody>
          <div
            style={{
              border: "solid 2px black",
              width: "400px",
              height: "400px"
            }}
            onDragEnter={this.onDrag_enter}
            onDragOver={this.onDrag_over}
            onDrop={this.onFileReallyDrop}
          >
            drag and drop in
          </div>
        </ModalBody>
        <ModalFooter>
          <div id="imgPreviewArea">
              {this.renderPreviewImage(this.props.imgSrcArr)}
          </div>
          <Button color="primary" onClick={this.onUploadConfirmClick.bind(this.props.imgFileArr)}>
            確定
          </Button>{" "}
          <Button color="secondary" onClick={this.props.togglePicUploadWindow}>
            取消
          </Button>
        </ModalFooter>
      </Modal>

      </Container>
    );
  }


  componentWillUnmount(){

    // 清空redux裡的 fileSrcArr 跟 FileArr
    console.log('必須實作 清空redux裡的 fileSrcArr 跟 FileArr 還必須window.URL.revokeObjectURL 所有的fileSrcArr');
    
}

}

function mapStateToProps(state){


     return {imgSrcArr:state.imgPreviewSrcAndImgFile.imgPreviewSrcArr,
        imgFileArr:state.imgPreviewSrcAndImgFile.fileArr,
        srcToDelete:state.imgPreviewSrcAndImgFile.srcToDelete
        };


}

function mapDispatchToProps(dispatch){

    return   bindActionCreators({setImgSrcAndFile_ObjToReducer,
        deleteOneImgSrcAndOneImgFile,doRevokeObjectURL}, dispatch);

}


export default connect(mapStateToProps, mapDispatchToProps)(PicUploadDropZoneWindow); 