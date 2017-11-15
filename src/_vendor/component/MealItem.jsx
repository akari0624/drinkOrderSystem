import React, { Component } from "react";
import { ListGroupItem, Button, Input } from "reactstrap";

//import MealItemInEditing from './MealItemInEditing';

export default class MealItem extends Component {
  state = {
    itemIndex:this.props.itemIndex
   // editing: false
  };

  mealOnEditClick = () => {
    const {itemIndex, meal} = this.props  
    this.props.openMealEditingWindowWhenBTMealEditClick(itemIndex, meal);
  };

  mealOnDeleteClick = () =>{
   this.props.onDeleteClickCallback(this.state.itemIndex);
   

  }

  render() {
    const { itemIndex, meal } = this.props;

  //  if (!this.state.editing) {
      return (
        <ListGroupItem  className="justify-content-between">
          {meal.mealName} {meal.unitPrice}元
          <div className="twoButtonArea">
          <Button type="button" 
          color="danger"
          onClick={
              this.mealOnDeleteClick
          }
          >
            刪除
          </Button>
          <Button
            type="button"
            color="primary"
            onClick={
              this.mealOnEditClick
            }
          >
            修改
          </Button>
          </div>
        </ListGroupItem>
      );
   // } 
    
    // else {
    //  return (
    //  <MealItemInEditing 
    //  itemIndex={itemIndex} 
    //  meal={meal} 
    //  onEditingConfirm={this.props.onEditingConfirm}
    //  onDeleteClickCallback={this.props.onDeleteClickCallback}
    //  /> );
    // }
  }
}
