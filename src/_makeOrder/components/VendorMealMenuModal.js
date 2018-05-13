import React from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ListGroup,
    ListGroupItem
} from 'reactstrap';
import {PropTypes} from 'prop-types';

import VendorImgDisplayer from './VendorImgDisplayer';

const VendorMealMenuModal = props => {

    const renderPriceString = (arr) => {

        if (arr.length > 0) {
            if (arr.length > 1) {
                let priceStr = arr.reduce((acc, currPriceObj) => {
                    acc += `${currPriceObj.size}:${currPriceObj.price} `;
                    return acc;
                }, '');

                return priceStr;
            } else {
                return `${arr[0].price} `;
            }
        }
    };

    const renderMealInfo = mealData => mealData.map((m, i) => (
        <ListGroupItem key={i}>
            {m.name}
            {renderPriceString(m.unitPrice)}元
        </ListGroupItem>
    ));

    const closeMenu = () => {
        props.toggleMenu(props.vendorIndex);
    };

    const {mealData, vendorImgSrcArr} = props;

    const onVendorChoosed = () => {
        props.onVendorChoosed(props.vendorIndex);
    };

    const isShowingChooseThisOneButton = (isShowChooseThisOneButton) => {

        if (isShowChooseThisOneButton) {
            return (
                <Button color="success" onClick={onVendorChoosed}>
                    選這間！
                </Button>
            );
        }
    };

    return (
        <Modal isOpen={props.isOpen} toggle={closeMenu}>
            <ModalHeader toggle={closeMenu}/>
            <ModalBody>
                <ListGroup>{renderMealInfo(mealData)}</ListGroup>
            </ModalBody>
            <ModalFooter>
                <VendorImgDisplayer imageSrcArr={vendorImgSrcArr}/> {isShowingChooseThisOneButton(props.isShowChooseThisOneButton)}
            </ModalFooter>
        </Modal>
    );
};

VendorMealMenuModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func.isRequired,
    mealData: PropTypes.array.isRequired,
    onVendorChoosed: PropTypes.func,
    vendorIndex: PropTypes.number.isRequired,
    vendorImgSrcArr: PropTypes.array.isRequired,
    isShowChooseThisOneButton: PropTypes.bool.isRequired
};

export default VendorMealMenuModal;
