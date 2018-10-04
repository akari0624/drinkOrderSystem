import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Alert } from 'reactstrap';
import { Link } from 'react-router-dom';
import {
    removeThoseFileArrAndObjectURLArr_but_also_returnObjectUrlArr_to_RevokeObjectURL,
    doRevokeObjectURL
} from '../../_vendor/action';

class LandingPageMain extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shouldAlertOpen: false
        };

        this.shouldShowGlobalAppMessage = this.shouldShowGlobalAppMessage.bind(
            this
        );

        this.closeAlertCB = this.closeAlertCB.bind(this);
    }

    closeAlertCB = () => {
        this.setState({ shouldAlertOpen: false });
    };

    componentWillMount() {
        const result = this.props.globalAppMessage;
        // 在第一次 mount render前 改變 state
        if (result.successMsg) {
            this.setState({
                shouldAlertOpen: true
            });
        }
    }

    shouldShowGlobalAppMessage() {
        const result = this.props.globalAppMessage;

        if (result.successMsg) {
            return (
                <Alert
                    isOpen={this.state.shouldAlertOpen}
                    color={'success'}
                    toggle={this.closeAlertCB}
                >
                    {result.successMsg}
                </Alert>
            );
        }
    }

    render() {
        return (
            <Container>
                {this.shouldShowGlobalAppMessage()}
                <div>mainLanding Page</div>
                <div>
                    <Link to="/make_order">發起訂購</Link>
                </div>
                <div>
                    <Link to="/vendor">新增店家</Link>
                </div>
            </Container>
        );
    }

    componentDidMount() {
        console.log('componentDidMount...');
        this.props.removeThoseFileArrAndObjectURLArr_but_also_returnObjectUrlArr_to_RevokeObjectURL();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            if (nextProps.shopImg_relatedData.srcToDelete.length > 0) {
                nextProps.doRevokeObjectURL(
                    nextProps.shopImg_relatedData.srcToDelete
                );
            }
        }
    }
}

function mapStateToProps(state) {
    return {
        globalAppMessage: state.mealListInsertResult,
        shopImg_relatedData: state.imgPreviewSrcAndImgFile
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            removeThoseFileArrAndObjectURLArr_but_also_returnObjectUrlArr_to_RevokeObjectURL,
            doRevokeObjectURL
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPageMain);
