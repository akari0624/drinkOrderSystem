import React from 'react';
import PropTypes from 'prop-types';
import { stringify } from 'querystring';

const renderErrorMessageAlert = errorMsg => {

    alert(errorMsg);
}

const renderOrderIMakeList = ({errorMsg, orderInfo}) => {

    if (errorMsg) {
        renderErrorMessageAlert(errorMsg);
    }else{
        return JSON.stringify(orderInfo);
    }

};

const Order_I_Make_ListArea = ({orderIMakeObj}) => {
    return (
        <div>
            <h3>
                我的訂購
            </h3>
            <div>
                {renderOrderIMakeList(orderIMakeObj)}
            </div>
        </div>

    );
};

Order_I_Make_ListArea.protoTypes = {

    orderIMakeObj: PropTypes.object
};

export default Order_I_Make_ListArea;