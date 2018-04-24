import React, { Component } from "react";
import { Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, Container } from "reactstrap";
import _cloneDeep from 'lodash.clonedeep';

export default class MealAdd extends Component {

  constructor(props){
    super(props);
    
    this.state = {
      mealInfo:{
        mealName:'',
        unitPrice:''
         },
        isInfoWindowOpen:false,
        infoWindowMsg:''
    }
  }



verifyAddMeal = (mealObj) => {

    if(mealObj.mealName === '' || mealObj.unitPrice === ''){
      return false;
    }
    return true;
}

addMeal = () =>{

  const copiedCurrentState = Object.assign({},this.state.mealInfo);

  if(!this.verifyAddMeal(copiedCurrentState)){
     
     const currState = _cloneDeep(this.state);

     currState.isInfoWindowOpen = true;
     currState.infoWindowMsg = '餐點名稱與價格必須填寫！'
     this.setState(currState);
     return;
  };

  const currState = _cloneDeep(this.state);
  currState.mealInfo = {
    mealName:'',
    unitPrice:''
  }
  this.setState(currState);   

  this.props.addCallBack(copiedCurrentState);
 

};

closeInfoWindow = () => {
  const currState = _cloneDeep(this.state);
  currState.isInfoWindowOpen = false;
  currState.infoWindowMsg = '';
  this.setState(currState);
}

mealNameOnChange =(e)=>{
  const currState = _cloneDeep(this.state);
  currState.mealInfo.mealName = e.target.value;
  this.setState(currState);
}

unitPriceOnChange =(e)=>{
  const price = e.target.value;
  const parsedValue = parseInt(price,10); 

  if(isNaN(parsedValue)){
    return;
  }
  const currState = _cloneDeep(this.state);
  currState.mealInfo.unitPrice = parsedValue;
  this.setState(currState);
  
}

  render() {
    return (
      <Container>
      <Modal isOpen={this.state.isInfoWindowOpen} toggle={this.closeInfoWindow}>
          <ModalHeader toggle={this.closeInfoWindow}>
              訊息：
          </ModalHeader>
          <ModalBody>
          <div>
            {this.state.infoWindowMsg}
          </div>
        </ModalBody>
      </Modal>
      <div>
        <span>
          <Label for="inputMeal">餐名</Label>
          <Input type="text" id="inputMeal" value={this.state.mealInfo.mealName} onChange={this.mealNameOnChange} />
          <Label for="inputPrice">單價</Label>
          <Input type="text" id="inputPrice" placeholder="元" value={this.state.mealInfo.unitPrice} onChange={this.unitPriceOnChange} />
        </span>
        <div style={{
          marginTop:'20px'
        }}>
          <Button type="button" color="primary" onClick={this.addMeal}>加入</Button>
          <Button type="button" color="secondary" onClick={this.props.openPicDropUploadCallback}>上傳菜單圖片</Button>
        </div>
      </div>
      </Container>
    );
  }

  
}
