import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';

const PicEnlargeWindow = props => {
    const renderEnlargeImage = imgSrc => {
        if (imgSrc !== '') {
            return <img src={imgSrc} style={{ width: '500px' }} />;
        } else {
            return;
        }
    };

    const deleteThisUpload = () => {
        props.deleteThisPicCallback(props.currEnlargeImageIndex);
        props.toggle();
    };

    const canBeDeleteSituation = (
        <Modal isOpen={props.isOpen} toggle={props.toggle}>
            <ModalHeader toggle={props.toggle} />
            <ModalBody>{renderEnlargeImage(props.imageSrc)}</ModalBody>

            <ModalFooter>
                <Button color="danger" onClick={deleteThisUpload}>
                    刪除
                </Button>
            </ModalFooter>
        </Modal>
    );

    const canNotDeleteSituation = (
        <Modal isOpen={props.isOpen} toggle={props.toggle}>
            <ModalHeader toggle={props.toggle} />
            <ModalBody>{renderEnlargeImage(props.imageSrc)}</ModalBody>
        </Modal>
    );

    return props.isForDelete ? canBeDeleteSituation : canNotDeleteSituation;
};

PicEnlargeWindow.propTypes = {
    deleteThisPicCallback: PropTypes.func,
    currEnlargeImageIndex: PropTypes.number,
    toggle: PropTypes.func,
    imageSrc: PropTypes.string,
    isOpen: PropTypes.bool,
    isForDelete: PropTypes.bool
};

PicEnlargeWindow.defaultProps = {
    isForDelete: true
};

export default PicEnlargeWindow;
