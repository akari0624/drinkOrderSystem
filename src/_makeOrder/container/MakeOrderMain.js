import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Alert } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { fetchVendor } from '../action';

class MakeOrderMain extends Component {
    constructor(props) {
        super(props);

        this.renderVendor = this.renderVendor.bind(this);
    }

    renderVendor(vendorArr) {
        return (
            <div>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
            </div>
        );
    }

    render() {
        if (this.props.vendorDataWhenMakeOrder.errorMsg !== '') {
            return (
                <Container>
                    <Alert isOpen={true} color={'danger'}>
                        {this.props.vendorDataWhenMakeOrder.errorMsg}
                    </Alert>
                    <div>
                        {
                            '發生錯誤，無法取得店家資料，請檢查網路連線，或是重整網頁來重試看看'
                        }
                    </div>
                </Container>
            );
        }

        if (this.props.vendorDataWhenMakeOrder.vendorData.length > 0) {
            return (
                <Container>
                    {this.renderVendor(
                        this.props.vendorDataWhenMakeOrder.vendorData
                    )}
                </Container>
            );
        }
        
        // initial rendering occured in this place
        return (
            <Container>
                <div> loading....</div>
            </Container>
        );
    }

    componentDidMount() {
        this.props.fetchVendor();
    }
}

MakeOrderMain.propTypes = {
    vendorDataWhenMakeOrder: PropTypes.object,
    fetchVendor: PropTypes.func
};

function mapStateToProps(state) {
    return { vendorDataWhenMakeOrder: state.vendorDataWhenMakeOrder };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            fetchVendor
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(MakeOrderMain);
