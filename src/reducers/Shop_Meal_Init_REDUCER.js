import {WHEN_SHOP_INIT_MEAL_LIST_INSERT_DONE} from '../_vendor/action/type';


export default  (state={},action={type:'',payload:{}}) => {


 

   switch(action.type){

     case WHEN_SHOP_INIT_MEAL_LIST_INSERT_DONE:     

     
     return {...state, ...action.payload.data}

     break; 
 
      
     default:
     
     return state;

   }



 


  return state;


}