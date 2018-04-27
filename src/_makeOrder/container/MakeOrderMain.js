import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Alert } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { fetchVendor } from '../action';
import VendorCard from '../components/VendorCard';
import VendorMealMenuModal from '../components/VendorMealMenuModal';

class MakeOrderMain extends Component {
    constructor(props) {
        super(props);

        this.renderVendor = this.renderVendor.bind(this);
        this.toggleMenuModal = this.toggleMenuModal.bind(this);
        this.onVendorGotChoosedInTheMenuModal = this.onVendorGotChoosedInTheMenuModal.bind(this);

        this.state ={
            isMenuModalOpen:false,
            menuShowingVendorIndex:0
        };
    }

    renderVendor(vendorArr){

        console.log('func in!!!!!!');
        return vendorArr.map((v,i) => (
            <VendorCard
                key={v._id}
                alt="pic"
                imgSrcArr={v.menuImageString}
                name={v.vendor_name}
                substitle={v.vendor_addreass}
                text={v.vendor_tel}
                toggleMenu={this.toggleMenuModal} 
                indexIntheVendorArray={i}
            />
        ));
    }

    toggleMenuModal(menuShowingVendorIndex){
        const viceCondition = this.state.isMenuModalOpen ? false : true;
        this.setState({
            isMenuModalOpen:viceCondition,
            menuShowingVendorIndex
        });
    }

    onVendorGotChoosedInTheMenuModal() {
        console.log('vendor choosed');
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
                    <VendorMealMenuModal 
                        isOpen={this.state.isMenuModalOpen} 
                        toggleMenu={this.toggleMenuModal}
                        onVendorChoosed={this.onVendorGotChoosedInTheMenuModal}
                        mealData={this.props.vendorDataWhenMakeOrder.vendorData[this.state.menuShowingVendorIndex].meals}
                        vendorIndex={this.state.menuShowingVendorIndex}
                    />
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