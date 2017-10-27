import React, { Component } from "react";
import { Label, Input, Button } from "reactstrap";

export default class MealAdd extends Component {

  state = {
   mealName:'',
   unitPrice:''

  }

addMeal = () =>{

  const copiedCurrentState = Object.assign({},this.state);

  this.setState({
    mealName:'',
    unitPrice:''
  });   

  this.props.addCallBack(copiedCurrentState);
 

};

mealNameOnChange =(e)=>{

  this.setState({mealName:e.target.value});
}

unitPriceOnChange =(e)=>{
  const price = e.target.value;
  const parsedValue = parseInt(price,10); 

  if(isNaN(parsedValue)){
    return;
  }
  this.setState({unitPrice:parsedValue});
  
}

  render() {
    return (
      <div>
        <span>
          <Label for="inputMeal">餐名</Label>
          <Input type="text" id="inputMeal" value={this.state.mealName} onChange={this.mealNameOnChange} />
          <Label for="inputPrice">單價</Label>
          <Input type="text" id="inputPrice" placeholder="元" value={this.state.unitPrice} onChange={this.unitPriceOnChange} />
        </span>
        <div style={{
          marginTop:'20px'
        }}>
          <Button type="button" color="primary" onClick={this.addMeal}>加入</Button>
          <Button type="button" color="secondary" onClick={this.props.openPicDropUploadCallback}>上傳菜單圖片</Button>
        </div>
      </div>
    );
  }

  
}
