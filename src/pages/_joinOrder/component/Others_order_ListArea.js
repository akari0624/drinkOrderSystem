import React from 'react';
import PropTypes from 'prop-types';
import {ListGroup, ListGroupItem} from 'reactstrap';

const OthersOrder_ListArea = props => (

    <React.Fragment>
        <h3>
            其他人的訂購
        </h3>
        <ListGroup>
            {props
                .othersOrder
                .map(o => (
                    <ListGroupItem key={o._id}>
                        {`${o.orderer_name}  ${o.ordered_mealName}  數量:${o.quantity} 小計${o.subTotal}元`}
                    </ListGroupItem>
                ))}
        </ListGroup>
    </React.Fragment>

);

OthersOrder_ListArea.propTypes = {

    othersOrder: PropTypes.array, // array of object
};

export default OthersOrder_ListArea;