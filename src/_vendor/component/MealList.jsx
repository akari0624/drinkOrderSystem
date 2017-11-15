import React, { Component } from "react";
import { ListGroup, ListGroupItem, Button, Input } from "reactstrap";

import { Draggable } from "react-beautiful-dnd";

import MealItem from "./MealItem";


const grid = 8;

const getItemStyle = (draggableStyle, isDragging) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  border: isDragging ? "solid 1px red" : "solid 1px white",

  // styles we need to apply on draggables
  ...draggableStyle
});

export default class MealList extends Component {




  renderMeals = meals => {
    return meals.map((meal, i) => {
     
      return (
        <Draggable key={i} draggableId={i}>
          {(provided, snapshot) => (
            <div>
              <div
                ref={provided.innerRef}
                style={getItemStyle(
                  provided.draggableStyle,
                  snapshot.isDragging
                )}
                {...provided.dragHandleProps}
              >
                <MealItem
                  key={i}
                  itemIndex={i}
                  meal={meal}
                  onDeleteClickCallback={this.props.onDeleteClickCallback}
                  openMealEditingWindowWhenBTMealEditClick={this.props.openMealEditingWindowWhenBTMealEditClick}
                />
              </div>
              {provided.placeholder}
            </div>
          )}
        </Draggable>
      );
    });
  };




  render() {
     
    return (
    <div>
    <ListGroup>{this.renderMeals(this.props.mealListData)}</ListGroup>


        
      </div>
      );
  }
}
