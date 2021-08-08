import React, { Component } from 'react';
import { ListGroup } from 'reactstrap';

import { Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import MealItem from './MealItem';

const grid = 8;

const getItemStyle = (draggableProps, isDragging) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    border: isDragging ? 'solid 1px red' : 'solid 1px white',

    // styles we need to apply on draggables
    ...draggableProps
});

export default class MealList extends Component {
    draggableChildrenFunc_thatGenerateDraggableMealItem = (meal, index) => (
        provided,
        snapshot
    ) => (
        <div>
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
                <MealItem
                    key={index}
                    itemIndex={index}
                    meal={meal}
                    onDeleteClickCallback={this.props.onDeleteClickCallback}
                    openMealEditingWindowWhenBTMealEditClick={
                        this.props.openMealEditingWindowWhenBTMealEditClick
                    }
                />
            </div>
            {provided.placeholder}
        </div>
    );

    renderMeals = meals =>
        meals.map((meal, i) => (
            <Draggable key={i} draggableId={i} index={i}>
                {this.draggableChildrenFunc_thatGenerateDraggableMealItem(
                    meal,
                    i
                )}
            </Draggable>
        ));

    render() {
        return (
            <div>
                <ListGroup>
                    {this.renderMeals(this.props.mealListData)}
                </ListGroup>
            </div>
        );
    }
}

MealList.propTypes = {
    onDeleteClickCallback: PropTypes.func,
    openMealEditingWindowWhenBTMealEditClick: PropTypes.func,
    mealListData: PropTypes.array
};
