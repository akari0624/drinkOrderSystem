import React, { Component } from 'react';
import {
    Button,
    Modal,
    Input,
    InputGroup,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import PropTypes from 'prop-types';

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
        this.props.onUnitPriceChange(e.target.value);
    };

    onEditConfirmClick = () => {
        this.props.toggleMealEditingWindow();

        this.props.onEditingMealConfirmClick();
    };

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
                        <Input
                            value={unitPrice}
                            onChange={this.onUnitPriceChange}
                        />
                    </InputGroup>
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
    onUnitPriceChange: PropTypes.func,
    onNameChange: PropTypes.func
};
