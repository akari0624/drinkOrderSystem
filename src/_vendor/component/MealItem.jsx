import React from 'react';
import { ListGroupItem, Button } from 'reactstrap';
import PropTypes from 'prop-types';

//import MealItemInEditing from './MealItemInEditing';

const MealItem = props => {
    const {
        itemIndex,
        meal,
        openMealEditingWindowWhenBTMealEditClick,
        onDeleteClickCallback
    } = props;

    const mealOnEditClick = () => {
        openMealEditingWindowWhenBTMealEditClick(itemIndex, meal);
    };

    const mealOnDeleteClick = () => {
        onDeleteClickCallback(itemIndex);
    };

    return (
        <ListGroupItem className="justify-content-between">
            {meal.mealName} {meal.unitPrice}元
            <div className="twoButtonArea">
                <Button
                    type="button"
                    color="danger"
                    onClick={mealOnDeleteClick}
                >
                    刪除
                </Button>
                <Button type="button" color="primary" onClick={mealOnEditClick}>
                    修改
                </Button>
            </div>
        </ListGroupItem>
    );
};

MealItem.propTypes = {
    itemIndex: PropTypes.number,
    meal: PropTypes.object,
    openMealEditingWindowWhenBTMealEditClick: PropTypes.func,
    onDeleteClickCallback: PropTypes.func
};

export default MealItem;
