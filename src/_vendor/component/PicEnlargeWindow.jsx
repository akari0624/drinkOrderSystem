import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import FileUploadModule from "../../util_func/FileUploadModule";

export default class PicEnlargeWindow extends Component {


    renderEnlargeImage = (imgSrc)=>{

     
        if(imgSrc !== ''){

            return (
                <img  
         src={this.props.imageSrc} 
         style={{width:'500px'}}
         />
            );
        }else{

            return;
        }

    }


    
    
    deleteThisUpload = ()=>{
        
        this.props.deleteThisPicCallback(this.props.currEnlargeImageIndex);
        this.props.toggle();
    }

render(){

    return(
<Modal
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
      >
        <ModalHeader toggle={this.props.toggle}>
        </ModalHeader>
        <ModalBody>
          
          {this.renderEnlargeImage(this.props.imageSrc)}
        
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={this.deleteThisUpload}>
            刪除
          </Button>
        </ModalFooter>
      </Modal>
    );
        }


    }