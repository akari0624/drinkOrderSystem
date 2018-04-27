import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { PropTypes } from 'prop-types';

const VendorMealMenuModal = props => {
    const renderMealInfo = mealData =>
        mealData.map((m, i) => (
            <div key={i}>
                <div>{m.name}</div>
                <div>{m.price}</div>
            </div>
        ));

    const closeMenu = () => {
        props.toggleMenu(props.vendorIndex);
    };

    return (
        <Modal isOpen={props.isOpen} toggle={closeMenu}>
            <ModalHeader toggle={closeMenu} />
            <ModalBody>{renderMealInfo(props.mealData)}</ModalBody>
            <ModalFooter>
                <Button color="success" onClick={props.onVendorChoosed}>
                    選這間！
                </Button>
            </ModalFooter>
        </Modal>
    );
};

VendorMealMenuModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func.isRequired,
    mealData: PropTypes.array.isRequired,
    onVendorChoosed: PropTypes.func.isRequired,
    vendorIndex: PropTypes.number.isRequired
};

export default VendorMealMenuModal;
