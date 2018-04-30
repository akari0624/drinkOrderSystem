import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import { getOrderInfoBy_parameterInUrl_andGetvVendorInfoTogether } from '../action';

class JoinOrderMain extends Component {
    constructor(props) {
        super(props);

        this.get_orderId_from_url_params = this.get_orderId_from_url_params.bind(
            this
        );
    }

    get_orderId_from_url_params() {
        const orderId = this.props.match.params.orderId;
        return orderId;
    }

    render() {
        const data = this.props.joinOrderData;

        console.log('data :',data);
        if (
            data.errorMsg === '' &&
            Object.keys(data.joinOrderInfo).length === 0
        ) {
            return <div>Loading....</div>;
        }else if(data.errorMsg !== '' && Object.keys(data.joinOrderInfo).length === 0){

            return <div> 發生錯誤！！ {data.errorMsg}</div>;
        }else {

            return <div> Start to render Order and Vendor info </div>;
        }
    }

    componentDidMount() {
        this.props.getOrderInitData(this.get_orderId_from_url_params());
    }
}

function mapStateToProps({ joinOrderData }) {
    return {
        joinOrderData
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getOrderInitData: getOrderInfoBy_parameterInUrl_andGetvVendorInfoTogether
        },
        dispatch
    );
}

JoinOrderMain.propTypes = {
    match: PropTypes.object.isRequired,
    getOrderInitData: PropTypes.func,
    joinOrderData: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinOrderMain);
