import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ButtonDropdown, DropdownToggle, DropdownMenu, ListGroup, ListGroupItem} from 'reactstrap';
import Styled from 'styled-components';
import DeleteOrderedMealIcon from '../container/DeleteOrderedMealIcon';

const LeftMarginSpan = Styled.span `
    margin-left:30px;
`;

class Order_I_Make_ListArea extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isActiveBTDropdownOpen: false
        };
    }

    toggleBTDropdown = (e) => {

        this.setState(prevState => {

            return {
                isActiveBTDropdownOpen: !prevState.isActiveBTDropdownOpen
            };
        });

    }

    renderOrderIMakeList = currMyOrderArr => {

        console.log('myOrderInRenderList', currMyOrderArr);

        return currMyOrderArr.map(o => (
            <ListGroupItem key={o._id}>
                {`${o.ordered_mealName}  數量:${o.quantity} 小計${o.subTotal}元`}
                <LeftMarginSpan>
                    <ButtonDropdown
                        isOpen={this.state.isActiveBTDropdownOpen}
                        toggle={this.toggleBTDropdown}>
                        <DropdownToggle caret>
                            more
                        </DropdownToggle>
                        <DropdownMenu>
                            <DeleteOrderedMealIcon text="刪除" orderID={o.orderId} mealID={o._id}></DeleteOrderedMealIcon>
                        </DropdownMenu>
                    </ButtonDropdown>
                </LeftMarginSpan>
            </ListGroupItem>
        ));

    };

    render() {
        const {currMyOrderArr} = this.props;

        return (
            <div>
                <h3>
                    我的訂購
                </h3>
                <ListGroup>
                    {this.renderOrderIMakeList(currMyOrderArr)}
                </ListGroup>
            </div>

        );
    }

}

Order_I_Make_ListArea.protoTypes = {

    currMyOrderArr: PropTypes.array.isRequired
};

export default Order_I_Make_ListArea;