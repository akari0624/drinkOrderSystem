import React, {Component} from 'react';
import {
    DropdownItem,
    Input,
    InputGroup,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu
} from 'reactstrap';
import PropTypes from 'prop-types';

class EditingOrderItem extends Component {

    constructor(props) {
        super(props);

        this.onCupInput = this
            .onCupInput
            .bind(this);
        this.onDropdownItemClick = this
            .onDropdownItemClick
            .bind(this);

        this.state = {
            size_selected: '',
            cup_entered: '',
            totalOfThisMealOfThisUser: '',
            currSelectedSize_PriceObj: null
        };
    }

    handleSeeIsMealHasSize_transString(unitPriceObj) {

        if (!unitPriceObj.size) {
            return `${unitPriceObj.price}元`;
        } else {
            return `${unitPriceObj.size}:${unitPriceObj.price}元`;
        }
    }

    onDropdownItemClick(e) {
        const eTarget = e.target;
        const dIndex = eTarget.getAttribute('data-index');

        const currPriceObj = this.props.unitPrice[dIndex];

        if (this.state.cup_entered !== '') {
            const currSubTotal = this.countTotalOfThisMealOfThisUser(currPriceObj.price, this.state.cup_entered);

            this.setState({totalOfThisMealOfThisUser: currSubTotal, size_selected: eTarget.textContent, currSelectedSize_PriceObj: currPriceObj});
        } else {
            this.setState({size_selected: eTarget.textContent, currSelectedSize_PriceObj: currPriceObj});
        }
    }

    renderDropItemByHowManySizeThisMealHave(unitPriceArr) {
        if (unitPriceArr) {
            return unitPriceArr.map((p, i) => (
                <DropdownItem key={i} data-index={i} onClick={this.onDropdownItemClick}>
                    {this.handleSeeIsMealHasSize_transString(p)}
                </DropdownItem>
            ));
        }
    }

    countTotalOfThisMealOfThisUser(price, cupEntered) {

        return parseInt(price, 10) * parseInt(cupEntered, 10);

    }

    onCupInput(e) {

        const v = e.target.value;

        if (v === '') {
            this.setState({cup_entered: v});
            return;
        }
        const tNumber = parseInt(v, 10);
        if (isNaN(tNumber) || tNumber < 1) {
            return;
        }

        if (this.state.size_selected !== '') {

            const currSubTotal = this.countTotalOfThisMealOfThisUser(this.state.currSelectedSize_PriceObj.price, tNumber);
            this.setState({cup_entered: tNumber, totalOfThisMealOfThisUser: currSubTotal});
        } else {
            this.setState({cup_entered: tNumber});

        }
    }

    render() {
        return (
            <div>
                < InputGroup>
                    <UncontrolledDropdown>
                        <DropdownToggle caret>{this.state.size_selected === ''
                            ? '請選擇尺寸/價格'
                            : this.state.size_selected}</DropdownToggle>
                        <DropdownMenu>
                            {this.renderDropItemByHowManySizeThisMealHave(this.props.unitPrice)}
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    < Input placeholder="杯數" onChange={this.onCupInput} value={this.state.cup_entered}/>
                </InputGroup>
                <span>{this.state.totalOfThisMealOfThisUser}</span>
            </div>
        );
    }

}

EditingOrderItem.propTypes = {

    unitPrice: PropTypes.array

};

export default EditingOrderItem;