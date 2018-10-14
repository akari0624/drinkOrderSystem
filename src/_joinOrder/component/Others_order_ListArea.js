import React from 'react';
import PropTypes from 'prop-types';

const OthersOrder_ListArea = props => (

    <div>
        <h3>
            其他人的訂購
        </h3>
        {props
            .othersOrder
            .map(o => (
                <div key={o.savedOrderMealId}>
                    {`${o.ordered_mealName}  數量:${o.quantity} 小計${o.subTotal}元  訂購餐點ID ${o.savedOrderMealId}`}
                </div>
            ))}
    </div>

);

OthersOrder_ListArea.propTypes = {

    othersOrder: PropTypes.array, // array of object
};

export default OthersOrder_ListArea;