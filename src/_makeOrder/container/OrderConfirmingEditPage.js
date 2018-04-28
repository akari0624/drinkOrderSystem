import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Modal,
    ModalHeader,
    Container
} from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Styled from 'styled-components';

import {insertOrder} from '../action';

const Div = Styled.div`
color:white;
text-decoration:none;
`;

class OrderConfirmingEditPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            coda: '0',
            customMessage: '',
            isOpen: false
        };

        this.handleFormInputChange = this.handleFormInputChange.bind(this);
        this.handleFormSubmitThenOpenConfirmWindow = this.handleFormSubmitThenOpenConfirmWindow.bind(
            this
        );
        this.toggleWindow = this.toggleWindow.bind(this);
        this.doSubmitMakingOrderToBackend = this.doSubmitMakingOrderToBackend.bind(
            this
        );
    }

    handleFormInputChange(e) {
        const value = e.target.value;
        const name = e.target.name;

        this.setState({
            [name]: value
        });
    }

    handleFormSubmitThenOpenConfirmWindow(e) {
        e.preventDefault();
        this.toggleWindow();
    }

    toggleWindow() {
        const isOpen = this.state.isOpen === true ? false : true;
        this.setState({
            isOpen
        });
    }

    doSubmitMakingOrderToBackend() {

        this.toggleWindow();

        const {coda,customMessage} = this.state;

        const params = {
            vendorId:this.props.vendorData._id,
            coda,
            customMessage
        };

        this.props.insertOrder(params);
        this.prop.history.push('/making_order_result');
    }

    render() {
        return (
            <Container>
                <Modal isOpen={this.state.isOpen} toggle={this.toggleWindow}>
                    <ModalHeader>確定送出？</ModalHeader>
                    <Button
                        color="primary"
                        onClick={this.doSubmitMakingOrderToBackend}
                    >
                        是
                    </Button>
                    <Button color="danger" onClick={this.toggleWindow}>
                        再想想
                    </Button>
                </Modal>
                <Form onSubmit={this.handleFormSubmitThenOpenConfirmWindow}>
                    <FormGroup>
                        <Label>店名：{this.props.vendorData.vendor_name}</Label>
                    </FormGroup>

                    <FormGroup>
                        <Label>
                            地址：{this.props.vendorData.vendor_addreass}
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label>電話：{this.props.vendorData.vendor_tel}</Label>
                    </FormGroup>

                    <FormGroup>
                        <Label for="coda">補助額度</Label>
                        <Input
                            type="number"
                            name="coda"
                            id="coda"
                            placeholder="預設為0元"
                            value={this.state.coda}
                            onChange={this.handleFormInputChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="customMessage">自訂訊息</Label>
                        <Input
                            type="text"
                            name="customMessage"
                            id="customMessage"
                            placeholder="輸入想提醒訂購者的訊息"
                            value={this.state.customMessage}
                            onChange={this.handleFormInputChange}
                        />
                    </FormGroup>
                    <Button color="primary">確定</Button>
                    <Button color="danger">
                        <Link to="/make_order">
                            <Div>取消</Div>
                        </Link>
                    </Button>
                </Form>
            </Container>
        );
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        insertOrder
    },dispatch);
}


OrderConfirmingEditPage.propTypes = {
    vendorData: PropTypes.object,
    insertOrder: PropTypes.func
};


export default connect(null,mapDispatchToProps)(OrderConfirmingEditPage);
