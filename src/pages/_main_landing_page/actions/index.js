import axios from 'axios';
import {WHEN_USER_CLICK_THE_INSERT_COMPLETE_MESSAGE_X_BUTON, DELETE_GLOBAL_INSERT_COMPLETE_MSG_WHEN_USER_EXIT_FROM_MAIN_LANDING_PAGE, SAVE_USERDATA_TO_REDUCER} from './type';
import {ERROR_MSG} from '@/__site_global_thing/type';

import {getUserInfoByOAUTH_ID_URL} from '@/static/url';
import  HeadersProducer from '@/jwt';

export const removeGlobalInsertCompleteMessageOnCloseInsertResultAlert = () => {

    return {type: WHEN_USER_CLICK_THE_INSERT_COMPLETE_MESSAGE_X_BUTON, payload: {}};

};

export const removeGlobalInsertCompleteMessageWhenUserExitMainLandingPage = () => {

    return {type: DELETE_GLOBAL_INSERT_COMPLETE_MSG_WHEN_USER_EXIT_FROM_MAIN_LANDING_PAGE, payload: {}};

};

export const getUserDataFromServerByUserOAuthIDAndSaveToReducer = (userOAuthID, redirectCallback) => {

    return (dispatch) => {

        const pResult = axios.post(getUserInfoByOAUTH_ID_URL, {user_oathid: userOAuthID}, HeadersProducer.getHeaderAdder().addJWT_Token().getFinalHeaders());

        pResult.then(r => {

            const result = r.data;
            if (result.errorMsg) {
                dispatch({
                    type: ERROR_MSG,
                    payload: '發生資料錯誤：' + result.errorMsg
                });
            } else {

                dispatch({type: SAVE_USERDATA_TO_REDUCER, payload: result});
                
                if(redirectCallback){redirectCallback();}
            }
        }).catch(err => {

            dispatch({
                type: ERROR_MSG,
                payload: '發生網路錯誤：' + err
            });
        });

    };

};