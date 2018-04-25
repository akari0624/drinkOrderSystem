import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Alert } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { fetchVendor } from '../action';
import VendorCard from '../components/VendorCard';

class MakeOrderMain extends Component {
    constructor(props) {
        super(props);

        this.renderVendor = this.renderVendor.bind(this);
    }

    renderVendor(vendorArr){

        console.log('func in!!!!!!');
        return vendorArr.map(v => (
            <VendorCard
                key={v._id}
                alt="pic"
                imgSrc={'...'}
                name={v.vendor_name}
                substitle={v.vendor_addreass}
                text={v.vendor_tel} 
            />
        ));
    }

    render() {
        if (this.props.vendorDataWhenMakeOrder.errorMsg !== '') {
            return (
                <Container>
                    <Alert isOpen={true} color={'danger'}>
                        {this.props.vendorDataWhenMakeOrder.errorMsg}
                    </Alert>

                    {
                        '發生錯誤，無法取得店家資料，請檢查網路連線，或是重整網頁來重試看看'
                    }
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
