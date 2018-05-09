import React from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
import { PropTypes } from 'prop-types';

const EditingOrderWindow = props => {
    return (
        <Modal isOpen={props.isEditingWindowOpen} toggle={props.closeMealEditingWindow}>
            <ModalHeader toggle={props.closeMealEditingWindow} />
            <ModalBody>
                Hi
            </ModalBody>
            <ModalFooter>
            </ModalFooter>
        </Modal>
    );
};


EditingOrderWindow.propTypes = {

    isEditingWindowOpen:PropTypes.bool,
    closeMealEditingWindow:PropTypes.func

};

export default EditingOrderWindow;
