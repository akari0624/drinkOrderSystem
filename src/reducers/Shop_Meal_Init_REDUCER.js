import {WHEN_SHOP_INIT_MEAL_LIST_INSERT_DONE} from '../_vendor/action/type';
import { WHEN_USER_CLICK_THE_INSERT_COMPLETE_MESSAGE_X_BUTON, DELETE_GLOBAL_INSERT_COMPLETE_MSG_WHEN_USER_EXIT_FROM_MAIN_LANDING_PAGE } from '../_main_landing_page/actions/type';

export default  (state={},action={type:'',payload:{}}) => {


 

    switch(action.type){

    case WHEN_SHOP_INIT_MEAL_LIST_INSERT_DONE:     

     
        return {...state, ...action.payload};

 
      
    case WHEN_USER_CLICK_THE_INSERT_COMPLETE_MESSAGE_X_BUTON:
        return {};

    case DELETE_GLOBAL_INSERT_COMPLETE_MSG_WHEN_USER_EXIT_FROM_MAIN_LANDING_PAGE:
        return {};    

    default:
     
        return state;

    }


};