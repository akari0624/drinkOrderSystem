import {SET_HEADER_STATE} from '../actions/type';


export default function(state={},action){

   switch(action.type){ 

    case SET_HEADER_STATE:

       return {currentPage:action.payload};


      default:
      return state; 
   }


}