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
import MyAlert from '../../_utilComponent/genericAlert';

class EditingOrderWindow extends Component {
    constructor(props) {
        super(props);

        this.onDropdownItemClick = this.onDropdownItemClick.bind(this);
        this.onThisEditingWindowClose = this.onThisEditingWindowClose.bind(this);
        this.showingAlert = this.showingAlert.bind(this);

        this.state = {
            isErrorAlertVisiable:false,
            onEditConfirmErrorMsg:'',
            alertColor:'danger',
        };

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

 
    showingAlert(message,color){

        if(!color){
            this.setState({
                isErrorAlertVisiable:true,
                onEditConfirmErrorMsg:message,
            });
        }else{
            this.setState({
                isErrorAlertVisiable:true,
                onEditConfirmErrorMsg:message,
                alertColor:color,
            });

        }
    } 
    
   

    render() {

        const {name:mealName, unitPrice} = this.props.data;
        const propsForEditingOrderItem = {
            mealName,
            unitPrice,
            showingAlert: this.showingAlert,
        };
        return (
            <Modal
                isOpen={this.props.isEditingWindowOpen}
                toggle={this.onThisEditingWindowClose}
            >
                <MyAlert visiable={this.state.isErrorAlertVisiable} message={this.state.onEditConfirmErrorMsg} color={this.state.alertColor}/> 
                <ModalHeader toggle={this.onThisEditingWindowClose}>
                    {mealName}
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <EditingOrderItem  {...propsForEditingOrderItem}/> 
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
