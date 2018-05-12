import React, { Component } from 'react';
import {
    Button,
    Modal,
    Input,
    InputGroup,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
import MealEditingItemInputArea from './MealEditingItemInputArea';

export default class MealEditingWindow extends Component {
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    onNameChange = e => {
        this.props.onNameChange(e.target.value);
    };

    onUnitPriceChange = e => {
        this.props.onUnitPriceChange_noSizeDiff(e.target.value);
    };

    onEditConfirmClick = () => {
        this.props.toggleMealEditingWindow();

        this.props.onEditingMealConfirmClick();
    };

    renderOnePrice = unitPriceObj => (
        <Input
            value={unitPriceObj.price}
            onChange={this.onUnitPriceChange}
        />
    );

    renderMultiplePrice = unitPriceArr => (
            
        unitPriceArr.map( (p, i) => (
            <MealEditingItemInputArea
                key={i} 
                tIndex={i}
                size={p.size}
                price={p.price}
                onSizeChange={this.props.onEditingMealSizeChange}
                onPriceChange={this.props.onEditingMealUnitPriceChange_mealHasSizeDiff}
            />
        ))
        
    );

    renderOnePriceOrMultiplePrice = (unitPriceArr) => {

        if(unitPriceArr.length === 1){
            return  this.renderOnePrice(unitPriceArr[0]);
        }

        return this.renderMultiplePrice(unitPriceArr);
    }

    render() {
        const { mealName, unitPrice } = this.props.editingMeal;

        return (
            <Modal
                isOpen={this.props.modal}
                toggle={this.props.toggleMealEditingWindow}
            >
                <ModalHeader toggle={this.props.toggleMealEditingWindow}>
                    編輯此商品
                </ModalHeader>
                <ModalBody>
                    <InputGroup>
                        <Input value={mealName} onChange={this.onNameChange} />
                    </InputGroup>
                    
                    {this.renderOnePriceOrMultiplePrice(unitPrice)}
                   
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.onEditConfirmClick}>
                        確定
                    </Button>{' '}
                    <Button
                        color="secondary"
                        onClick={this.props.toggleMealEditingWindow}
                    >
                        取消
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

MealEditingWindow.propTypes = {
    modal: PropTypes.bool,
    editingMeal: PropTypes.object,
    toggleMealEditingWindow: PropTypes.func,
    onEditingMealConfirmClick: PropTypes.func,
    onUnitPriceChange_noSizeDiff: PropTypes.func,
    onEditingMealUnitPriceChange_mealHasSizeDiff:PropTypes.func,
    onEditingMealSizeChange:PropTypes.func,
    onNameChange: PropTypes.func,
};
