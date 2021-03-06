import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ListGroup,
    Container
} from 'reactstrap';
import { PropTypes } from 'prop-types';

import VendorImgDisplayer from '../../_makeOrder/components/VendorImgDisplayer';
import EditingOrderWindow from '../container/EditingOrderWindow';
import ListGroupItemWrapper from '../HOC/ListGroupItemWrapper';

class VendorMealMenuModalClickAble extends Component {
    constructor(props) {
        super(props);

        this.onMealItemClick = this.onMealItemClick.bind(this);
        this.renderMealInfo = this.renderMealInfo.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.toggleMealEditingWindow = this.toggleMealEditingWindow.bind(this);
        this.onVendorChoosed = this.onVendorChoosed.bind(this);
        this.isShowingChooseThisOneButton = this.isShowingChooseThisOneButton.bind(
            this
        );


        this.state = {
            isEditingWindowOpen: false,
            currentEditingMealOrderData:{name:'',price:''}
        };
    }

    onMealItemClick(mealData) {
        
        const reverseCondition = this.state.isEditingWindowOpen === true ? false : true;

        this.setState({
            isEditingWindowOpen: reverseCondition,
            currentEditingMealOrderData:mealData
        });
       
    }

    renderMealInfo(mealData) {
        return mealData.map((m, i) => (

            <ListGroupItemWrapper key={i} data={m} onItemClick={this.onMealItemClick}/>
        ));
    }

    closeMenu(){
        this.props.toggleMenu(this.props.vendorIndex);
    }

    toggleMealEditingWindow() {

        const reverseCondition = this.state.isEditingWindowOpen === true ? false : true;

        this.setState({
            isEditingWindowOpen: reverseCondition});
       
    }

    onVendorChoosed() {
        this.props.onVendorChoosed(this.props.vendorIndex);
    }

    isShowingChooseThisOneButton(isShowChooseThisOneButton) {
        if (isShowChooseThisOneButton) {
            return (
                <Button color="success" onClick={this.onVendorChoosed}>
                    選這間！
                </Button>
            );
        }
    }

    render() {
        const { mealData, vendorImgSrcArr } = this.props;

        return (
            <Container>
                <EditingOrderWindow 
                    closeMealEditingWindow={this.toggleMealEditingWindow} 
                    isEditingWindowOpen={this.state.isEditingWindowOpen}
                    data={this.state.currentEditingMealOrderData}
                />

                <Modal isOpen={this.props.isOpen} toggle={this.closeMenu}>
                    <ModalHeader toggle={this.closeMenu} />
                    <ModalBody>
                        <ListGroup>{this.renderMealInfo(mealData)}</ListGroup>
                    </ModalBody>
                    <ModalFooter>
                        <VendorImgDisplayer imageSrcArr={vendorImgSrcArr} />
                        {this.isShowingChooseThisOneButton(
                            this.props.isShowChooseThisOneButton
                        )}
                    </ModalFooter>
                </Modal>
            </Container>
        );
    }
}

VendorMealMenuModalClickAble.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func.isRequired,
    mealData: PropTypes.array.isRequired,
    onVendorChoosed: PropTypes.func,
    vendorIndex: PropTypes.number.isRequired,
    vendorImgSrcArr: PropTypes.array.isRequired,
    isShowChooseThisOneButton: PropTypes.bool.isRequired,
};

export default VendorMealMenuModalClickAble;
