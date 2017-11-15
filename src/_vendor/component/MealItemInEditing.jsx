import React, { Component } from "react";
import { ListGroupItem, Button, Input } from "reactstrap";
import MealItem from "./MealItem";

export default class MealItemInEditing extends Component {
  state = {
    editing: true,
    itemIndex: this.props.itemIndex,
    mealName: this.props.meal.mealName,
    unitPrice: this.props.meal.unitPrice
  };

  mealOnEditClick = () => {
    this.setState({
      editing: true
    });
  };

  onCancelClick = () => {
    this.setState({
      editing: false
    });
  };

  onNameChange = e => {
    this.setState({
      mealName: e.target.value
    });
  };

  onUnitPriceChange = e => {
    this.setState({
      unitPrice: e.target.value
    });
  };

  onEditConfirmClick = () => {
    const editedMeal = {
      mealName: this.state.mealName,
      unitPrice: this.state.unitPrice
    };
    const indexInArr = this.state.itemIndex;
    console.log(
      "confirmClick",
      indexInArr,
      editedMeal,
      this.props.onEditingConfirm
    );
    this.setState({
      editing: false
    });
    this.props.onEditingConfirm(editedMeal, indexInArr);
  };

  render() {
    const { itemIndex, meal } = this.props;
    console.log("itemIndex", itemIndex);
    if (this.state.editing) {
      return (
        <ListGroupItem className="justify-content-between">
          <Input value={this.state.mealName} onChange={this.onNameChange} />
          <Input
            value={this.state.unitPrice}
            onChange={this.onUnitPriceChange}
          />
          <Button
            type="button"
            color="success"
            onClick={this.onEditConfirmClick}
          >
            確定
          </Button>
          <Button type="button" color="info" onClick={this.onCancelClick}>
            取消
          </Button>
        </ListGroupItem>
      );
    } else {
      return (
        <MealItem
          itemIndex={itemIndex}
          meal={meal}
          onEditingConfirm={this.props.onEditingConfirm}
          onDeleteClickCallback={this.props.onDeleteClickCallback}
        />
      );
    }
  }
}
