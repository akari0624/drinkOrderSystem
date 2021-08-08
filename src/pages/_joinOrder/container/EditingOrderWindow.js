import React, {Component} from 'react';
import { connect }  from 'react-redux';
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
import MyAlert from '@/_utilComponent/genericAlert';


class EditingOrderWindow extends Component {
    constructor(props) {
        super(props);

        this.onDropdownItemClick = this.onDropdownItemClick.bind(this);
        this.onThisEditingWindowClose = this.onThisEditingWindowClose.bind(this);
        this.showingAlert = this.showingAlert.bind(this);

        this.state = {
            isErrorAlertVisible:false,
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
                isErrorAlertVisible:true,
                onEditConfirmErrorMsg:message,
            });
        }else{
            this.setState({
                isErrorAlertVisible:true,
                onEditConfirmErrorMsg:message,
                alertColor:color,
            });

        }
    } 
    
    //@LifeCycle   this static method will return a new state
    static getDerivedStateFromProps(nextProps, prevState) {
        const errorMsgAfterAddOrder = nextProps.orderAddedServerResponseErrorMsg;
        const afterAddOrderOrderInfo = nextProps.lastAddedSuccessfulyOrder;

        if( errorMsgAfterAddOrder !== ''){

            return{
                isErrorAlertVisible:true,
                onEditConfirmErrorMsg: errorMsgAfterAddOrder,
                alertColor:'danger',
            };
        }else if(errorMsgAfterAddOrder === '' && afterAddOrderOrderInfo){
            return{
                isErrorAlertVisible:true,
                onEditConfirmErrorMsg: `新增訂購${afterAddOrderOrderInfo.ordered_mealName}-${afterAddOrderOrderInfo.quantity} 成功`,
                alertColor:'success',
            };

        }

        return null;
    }

    render() {

        const {name:mealName, unitPrice, _id:mealId} = this.props.data;
        const propsForEditingOrderItem = {
            mealName,
            unitPrice,
            mealId,
            showingAlert: this.showingAlert,
        };

        return (
            <Modal
                isOpen={this.props.isEditingWindowOpen}
                toggle={this.onThisEditingWindowClose}
            >
                <MyAlert visible={this.state.isErrorAlertVisible} message={this.state.onEditConfirmErrorMsg} color={this.state.alertColor}/> 
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
    closeMealEditingWindow: PropTypes.func,
    orderAddedServerResponseErrorMsg: PropTypes.string,
    lastAddedSuccessfulyOrder: PropTypes.object,
};


function mapStateToProps({joinOrder_orderIMake}){


    return {
        orderAddedServerResponseErrorMsg: joinOrder_orderIMake.errorMsg,
        lastAddedSuccessfulyOrder:joinOrder_orderIMake.lastAddedOrder,
    };

}


export default connect(mapStateToProps, null)(EditingOrderWindow);
