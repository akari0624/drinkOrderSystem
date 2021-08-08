import React from 'react';
import { ListGroupItem, Button } from 'reactstrap';
import PropTypes from 'prop-types';

import {getPartStringAndAddSuffix} from '@/util_func/util_func';

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



    const renderPriceArrToString = unitPriceArr => {
        if (unitPriceArr.size === 0) {
            throw new Error(
                'meal unit price arr length is zero, that is not allow'
            );
        }
        
        let result;

        if (unitPriceArr.length === 1 && !unitPriceArr[0].size) {
            
            result = unitPriceArr[0].price;
            return result;
        }
        result = unitPriceArr.reduce((acc, curr) => {
            acc += `${curr.size}:${curr.price} `;
            return acc;
        }, '');

        return getPartStringAndAddSuffix(result,10,'...');

    };

    return (
        <ListGroupItem className="justify-content-between">
            {meal.mealName} {renderPriceArrToString(meal.unitPrice)}元
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
