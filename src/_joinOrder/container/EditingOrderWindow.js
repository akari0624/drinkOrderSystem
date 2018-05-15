import React, {Component} from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Form,
    FormGroup,
    Label,
} from 'reactstrap';
import { PropTypes } from 'prop-types';
import EditingOrderItem from './EditingOrderItem';

class EditingOrderWindow extends Component {
    constructor(props) {
        super(props);

        this.onDropdownItemClick = this.onDropdownItemClick.bind(this);
        this.onThisEditingWindowClose = this.onThisEditingWindowClose.bind(this);
     
    }

    onDropdownItemClick(e){

        const size_selected = e.currentTarget.textContent;
        console.log('size_selected',size_selected);
        this.setState({
            size_selected:size_selected
        });
    }

    onThisEditingWindowClose(){

        this.setState({
            size_selected:''
        });

        this.props.closeMealEditingWindow();

    }

 
    
   

    render() {
        return (
            <Modal
                isOpen={this.props.isEditingWindowOpen}
                toggle={this.onThisEditingWindowClose}
            >
                <ModalHeader toggle={this.onThisEditingWindowClose}>
                    {this.props.data.name}
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <EditingOrderItem unitPrice={this.props.data.unitPrice}/> 
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter />
            </Modal>
        );
    }
}

EditingOrderWindow.propTypes = {
    data: PropTypes.object,
    isEditingWindowOpen: PropTypes.bool,
    closeMealEditingWindow: PropTypes.func
};

export default EditingOrderWindow;
