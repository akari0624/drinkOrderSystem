import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Alert } from 'reactstrap';
import { Link } from 'react-router-dom';
import {
    removeThoseFileArrAndObjectURLArr_but_also_returnObjectUrlArr_to_RevokeObjectURL,
    doRevokeObjectURL,
} from '../../_vendor/action';

import {
    getUserDataFromServerByUserOAuthIDAndSaveToReducer
} from '../actions';

import { 
    removeGlobalInsertCompleteMessageOnCloseInsertResultAlert,
    removeGlobalInsertCompleteMessageWhenUserExitMainLandingPage
} from '../actions';

import { grabFromCookie, deleteFromCookie, getSubFromJWT } from '../../util_func/util_func';
import { JWT_KeyInCookie, isLoginLocalStorageKey, currRouteBeforeSignInKey } from '../../conf/keys';

class LandingPageMain extends Component {
    constructor(props) {
        super(props);


        this.maybeYouAreRedirectByServerAfterDoingOAuth();

        const isSholdRenderAlert = this.props.globalAppMessage.successMsg ? true : false;
        this.state = {
            shouldAlertOpen: isSholdRenderAlert,
        };




        this.shouldShowGlobalAppMessage = this.shouldShowGlobalAppMessage.bind(
            this
        );

        this.closeAlertCB = this.closeAlertCB.bind(this);
    }

    closeAlertCB = () => {
        this.setState({ shouldAlertOpen: false });
        this.props.removeGlobalInsertCompleteMessageOnCloseInsertResultAlert();
    };




    redirectCallbackOnGetUserDataSuccess = () => {

        /* 取到之後 就可以把cookie裡的登入後帶回來的jwt刪掉了 */
        deleteFromCookie(JWT_KeyInCookie);


        /* 如果驗證之前網址已經是去某頁的話，就跳過去 */
        this.resirectToOriginalPathBeforeSignIn_IfNeeded();
    }


    maybeYouAreRedirectByServerAfterDoingOAuth = () => {

        const authedJWT = grabFromCookie(JWT_KeyInCookie);

        if(authedJWT){

            window.localStorage.setItem(isLoginLocalStorageKey, authedJWT);
            

            const subInJWT = getSubFromJWT(authedJWT); //目前就是會員Facebook在這個app上的ID

            console.log('subInJWT', subInJWT);
            this.props.getUserDataFromServerByUserOAuthIDAndSaveToReducer(subInJWT, this.redirectCallbackOnGetUserDataSuccess);

        
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


    resirectToOriginalPathBeforeSignIn_IfNeeded = () => {

        const pathBeforeDoOAuth = window.localStorage.getItem(currRouteBeforeSignInKey);
        if(pathBeforeDoOAuth){
            this
                .props
                .history
                .push(pathBeforeDoOAuth);

        }
    }

    componentDidMount() {
        console.log('componentDidMount...onMainPage, remove cached image in browser objectURL');
        this.props.removeThoseFileArrAndObjectURLArr_but_also_returnObjectUrlArr_to_RevokeObjectURL();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            if (nextProps.shopImg_relatedData.srcToDelete.length > 0) {
                nextProps.doRevokeObjectURL(
                    nextProps.shopImg_relatedData.srcToDelete
                );
            }
        }
    }

    componentWillUnmount() {
        this.props.removeGlobalInsertCompleteMessageWhenUserExitMainLandingPage();  
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
            doRevokeObjectURL,
            removeGlobalInsertCompleteMessageOnCloseInsertResultAlert,
            removeGlobalInsertCompleteMessageWhenUserExitMainLandingPage,
            getUserDataFromServerByUserOAuthIDAndSaveToReducer,
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPageMain);
