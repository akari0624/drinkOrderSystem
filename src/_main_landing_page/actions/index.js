import { 
    WHEN_USER_CLICK_THE_INSERT_COMPLETE_MESSAGE_X_BUTON,
    DELETE_GLOBAL_INSERT_COMPLETE_MSG_WHEN_USER_EXIT_FROM_MAIN_LANDING_PAGE
} from './type';


export const removeGlobalInsertCompleteMessageOnCloseInsertResultAlert = () => {

    return {
        type:WHEN_USER_CLICK_THE_INSERT_COMPLETE_MESSAGE_X_BUTON,
        payload:{}
    };

};


export const removeGlobalInsertCompleteMessageWhenUserExitMainLandingPage = () => {

    return {
        type:DELETE_GLOBAL_INSERT_COMPLETE_MSG_WHEN_USER_EXIT_FROM_MAIN_LANDING_PAGE,
        payload:{}
    };

};