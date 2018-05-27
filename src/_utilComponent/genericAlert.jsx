import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';

export default class GenericAlert extends Component {
    constructor(props) {
        super(props);

        console.log('initSetState', this.props);
        this.state = {
            visible: false
        };

        this.onDismiss = this.onDismiss.bind(this);
    }

    onDismiss() {
        this.setState({ visible: false });
        
        if(this.props.closeAlertCB){
            this.props.closeAlertCB();
        
        }
    }

    // lifeCycle
    // React doesn’t call componentWillReceiveProps() with initial props during mounting.
    componentWillReceiveProps(nextProps) {
        // nextProps 是 在這次快要做的render 的新props , this.props 在這裡是上一次render時 收到的舊props

        if (this.props !== nextProps) {
            this.setState({ visible: nextProps.visible });
        }
    }

    render() {
        return (
            <Alert
                isOpen={this.state.visible}
                color={this.props.color}
                toggle={this.onDismiss}
            >
                {this.props.message}
            </Alert>
        );
    }
}


GenericAlert.propTypes = {
    visible:PropTypes.bool,
    message: PropTypes.string,
    color: PropTypes.string,
    closeAlertCB:PropTypes.func
};




