import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    Container,
    Alert,
    Card,
    CardBody,
    CardTitle,
    CardText,
    Button
} from 'reactstrap';

import Styled from 'styled-components';
import {removeThoseFileArrAndObjectURLArr_but_also_returnObjectUrlArr_to_RevokeObjectURL, doRevokeObjectURL} from '../../_vendor/action';

import {getUserDataFromServerByUserOAuthIDAndSaveToReducer} from '../actions';

import {removeGlobalInsertCompleteMessageOnCloseInsertResultAlert, removeGlobalInsertCompleteMessageWhenUserExitMainLandingPage} from '../actions';

import {grabFromCookie, deleteFromCookie, getSubFromJWT} from '../../util_func/util_func';
import {JWT_KeyInCookie, isLoginLocalStorageKey, currRouteBeforeSignInKey} from '../../conf/keys';



const PageTitleH1 = Styled.h1`
  text-align:center;
`;


class LandingPageMain extends Component {
    constructor(props) {
        super(props);

        this.maybeYouAreRedirectByServerAfterDoingOAuth();

        const isShouldRenderAlert = this.props.globalAppMessage.successMsg
            ? true
            : false;
        this.state = {
            shouldAlertOpen: isShouldRenderAlert
        };

        this.shouldShowGlobalAppMessage = this
            .shouldShowGlobalAppMessage
            .bind(this);

        this.closeAlertCB = this
            .closeAlertCB
            .bind(this);
    }

    closeAlertCB = () => {
        this.setState({shouldAlertOpen: false});
        this
            .props
            .removeGlobalInsertCompleteMessageOnCloseInsertResultAlert();
    };

    redirectCallbackOnGetUserDataSuccess = () => {

        /* 取到之後 就可以把cookie裡的登入後帶回來的jwt刪掉了 */
        deleteFromCookie(JWT_KeyInCookie);

        /* 如果驗證之前網址已經是去某頁的話，就跳過去 */
        this.resirectToOriginalPathBeforeSignIn_IfNeeded();
    }

    maybeYouAreRedirectByServerAfterDoingOAuth = () => {

        const authedJWT = grabFromCookie(JWT_KeyInCookie);

        if (authedJWT) {

            window
                .localStorage
                .setItem(isLoginLocalStorageKey, authedJWT);

            const subInJWT = getSubFromJWT(authedJWT); //目前就是會員Facebook在這個app上的ID

            console.log('subInJWT', subInJWT);
            this
                .props
                .getUserDataFromServerByUserOAuthIDAndSaveToReducer(subInJWT, this.redirectCallbackOnGetUserDataSuccess);

        }

    }

    shouldShowGlobalAppMessage() {
        const result = this.props.globalAppMessage;

        if (result.successMsg) {
            return (
                <Alert
                    isOpen={this.state.shouldAlertOpen}
                    color={'success'}
                    toggle={this.closeAlertCB}>
                    {result.successMsg}
                </Alert>
            );
        }
    }

    toMakeOrder = (e) => {
        this
            .props
            .history
            .push('/make_order');

    }

    toCreateVendorData = (e) => {
        this
            .props
            .history
            .push('/vendor');

    }

    render() {
        return (
            <Container>
                {this.shouldShowGlobalAppMessage()}
                <PageTitleH1>訂購餐點 首頁</PageTitleH1>

                <Card body inverse color="primary">
                    <CardBody>
                        <CardTitle style={{color:'#000000'}}>發起訂購</CardTitle>
                        <CardText>從網友們建立的店家清單中挑選一間來訂購，不保證店家餐點內容的正確度</CardText>
                        <Button onClick={this.toMakeOrder}>前往</Button>
                    </CardBody>
                </Card>

                <Card body inverse color="info">
                    <CardBody>
                        <CardTitle style={{color:'#000000'}}>新增店家</CardTitle>
                        <CardText>建立一間新的店家的資料和菜單資料，為了大家好，請資料盡量輸入正確</CardText>
                        <Button onClick={this.toCreateVendorData}>前往</Button>
                    </CardBody>
                </Card>
            </Container>
        );
    }

    resirectToOriginalPathBeforeSignIn_IfNeeded = () => {

        const pathBeforeDoOAuth = window
            .localStorage
            .getItem(currRouteBeforeSignInKey);
        if (pathBeforeDoOAuth) {

            // 移除快取起來的OAuth驗證前的route
            window
                .localStorage
                .removeItem(currRouteBeforeSignInKey);

            this
                .props
                .history
                .push(pathBeforeDoOAuth);

        }
    }

    componentDidMount() {
        console.log('componentDidMount...onMainPage, remove cached image in browser objectURL');
        this
            .props
            .removeThoseFileArrAndObjectURLArr_but_also_returnObjectUrlArr_to_RevokeObjectURL();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            if (nextProps.shopImg_relatedData.srcToDelete.length > 0) {
                nextProps.doRevokeObjectURL(nextProps.shopImg_relatedData.srcToDelete);
            }
        }
    }

    componentWillUnmount() {
        this
            .props
            .removeGlobalInsertCompleteMessageWhenUserExitMainLandingPage();
    }

}

function mapStateToProps(state) {
    return {globalAppMessage: state.mealListInsertResult, shopImg_relatedData: state.imgPreviewSrcAndImgFile};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        removeThoseFileArrAndObjectURLArr_but_also_returnObjectUrlArr_to_RevokeObjectURL,
        doRevokeObjectURL,
        removeGlobalInsertCompleteMessageOnCloseInsertResultAlert,
        removeGlobalInsertCompleteMessageWhenUserExitMainLandingPage,
        getUserDataFromServerByUserOAuthIDAndSaveToReducer
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPageMain);
