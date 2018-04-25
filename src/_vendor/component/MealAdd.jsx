import React, { Component } from 'react';
import { Label, Input, Button, Modal, ModalHeader, ModalBody, Container } from 'reactstrap';
import PropTypes from 'prop-types';
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
        };
    }

addMeal = () =>{

    const verifyAddMeal = mealObj => {

        if(mealObj.mealName === '' || mealObj.unitPrice === ''){
            return false;
        }
        return true;
    };

    const emptyInputColumn = () => {
        const mealInfo = {
            mealName:'',
            unitPrice:''
        };
        this.setState({mealInfo}); 
    };

    if(!verifyAddMeal(this.state.mealInfo)){
        this.setState(
            { isInfoWindowOpen : true,
                infoWindowMsg : '餐點名稱與價格必須填寫！'}
        );
        return;
    }

    const enteredMealInfo = Object.assign({},this.state.mealInfo);

    emptyInputColumn();

    this.props.addCallBack(enteredMealInfo);
 

};

closeInfoWindow = () => {

    this.setState(
        {isInfoWindowOpen:false,
            infoWindowMsg:''
        });
}

mealNameOnChange =(e)=>{
    const mealInfo = Object.assign({},this.state.mealInfo);
    mealInfo.mealName = e.target.value;
    this.setState({mealInfo});
}

 

  unitPriceOnChange =(e)=>{
      const price = e.target.value;

      const setNewUnitPrice = (p) => {
          const currMealInfo = Object.assign({},this.state.mealInfo);
          currMealInfo.unitPrice = p;
          this.setState({mealInfo:currMealInfo});
      }; 

      if(price === ''){
          setNewUnitPrice(price);
          return;
      } 
      const parsedValue = parseInt(price,10); 

      if(isNaN(parsedValue)){
          return;
      }

      setNewUnitPrice(parsedValue);
  };

  render() {
      return (
          <Container>
              <Modal isOpen={this.state.isInfoWindowOpen} toggle={this.closeInfoWindow}>
                  <ModalHeader toggle={this.closeInfoWindow}>訊息：</ModalHeader>
                  <ModalBody>
                      <div>{this.state.infoWindowMsg}</div>
                  </ModalBody>
              </Modal>
              <div>
                  <span>
                      <Label for="inputMeal">餐名</Label>
                      <Input type="text" id="inputMeal" value={this.state.mealInfo.mealName} onChange={this.mealNameOnChange} />
                      <Label for="inputPrice">單價</Label>
                      <Input type="text" id="inputPrice" placeholder="元" value={this.state.mealInfo.unitPrice} onChange={this.unitPriceOnChange} />
                  </span>
                  <div style={{marginTop:'20px'}}>
                      <Button type="button" color="primary" onClick={this.addMeal}>加入</Button>
                      <Button type="button" color="secondary" onClick={this.props.openPicDropUploadCallback}>上傳菜單圖片</Button>
                  </div>
              </div>
          </Container>
      );
  }

  
}

MealAdd.propTypes = {
    openPicDropUploadCallback: PropTypes.func,
    addCallBack: PropTypes.func
};
