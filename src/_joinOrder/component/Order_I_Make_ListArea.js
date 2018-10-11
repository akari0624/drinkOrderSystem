import React from 'react';
import PropTypes from 'prop-types';



const renderOrderIMakeList = currMyOrderArr => {

    
        
    return currMyOrderArr.map((o, i) => (
        <div key={o.orderId+i}> 
            { `${o.ordered_mealName}  數量:${o.quantity} 小計${o.subTotal}元`}
        </div>
    ));
    

};

const Order_I_Make_ListArea = ({currMyOrderArr}) => {
    return (
        <div>
            <h3>
                我的訂購
            </h3>
            <div>
                {renderOrderIMakeList(currMyOrderArr)}
            </div>
        </div>

    );
};

Order_I_Make_ListArea.protoTypes = {

    currMyOrderArr: PropTypes.array.isRequired,
};

export default Order_I_Make_ListArea;