import React from 'react';
import {DropdownItem} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteMyOrder } from '../action';


const DeleteOrderedMealIcon = props => {


    const  onDeleteClick = (e) => {

        props.deleteMyOrder(props.mealID, props.orderID);

    };



    return (
        <DropdownItem onClick={onDeleteClick}>{props.text}</DropdownItem>
    );
};


DeleteOrderedMealIcon.propTypes = {
    text: PropTypes.string.isRequired,
    orderID:PropTypes.string.isRequired,
    mealID:PropTypes.string.isRequired,
    deleteMyOrder:PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch){

    return bindActionCreators( {
        deleteMyOrder,
    }, dispatch);

}

export default connect(null, mapDispatchToProps)(DeleteOrderedMealIcon);