import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import OrderConfirmingEditPage from './OrderConfirmingEditPage';

class MakingOrderConfirming extends Component {
    render() {
        console.log('index? :', this.props.match.params.index);

        return (
            <OrderConfirmingEditPage
                vendorData={
                    this.props.vendorDataWhenMakeOrder.vendorData[
                        this.props.match.params.index
                    ]
                }
                history={this.props.history}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        vendorDataWhenMakeOrder: state.vendorDataWhenMakeOrder
    };
}

MakingOrderConfirming.propTypes = {
    vendorDataWhenMakeOrder: PropTypes.object,
    match: PropTypes.object, // provided by react-router-dom
    history: PropTypes.object // provided by react-router-dom
};

export default connect(mapStateToProps, null)(MakingOrderConfirming);
