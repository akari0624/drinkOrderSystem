import cloneDeep from 'lodash.clonedeep';
import {GETDATA, ADD_DATA, UPDATE_DATA, DELETE_ONE, SAVE_LIST} from '../actions/type';

export default function(state={},action){


   switch(action.type){
   case ADD_DATA:
       const newState1 = cloneDeep(state);
       return {...newState1,[action.payload.key]:action.payload};

    case GETDATA:

          return {...state};
    


case UPDATE_DATA:
      const newState2 = cloneDeep(state);

       const editedObj = newState2[action.payload.id] 
       editedObj.pCustomerName = action.payload.data.pCustomerName;

       editedObj.pCustomerContact = action.payload.data.pCustomerContact;
       editedObj.pConcatTelNumber = action.payload.data.pConcatTelNumber;
       editedObj.pAskSystem = action.payload.data.pAskSystem;
       editedObj.pAskContent = action.payload.data.pAskContent;
       editedObj.pFixPerson = action.payload.data.pFixPerson;
       editedObj.pHowToFix = action.payload.data.pHowToFix;
       editedObj.pCurrentSituation = action.payload.data.pCurrentSituation;
       editedObj.pInsertTime = action.payload.data.pInsertTime;

       return newState2;
case DELETE_ONE:
const newState3 = Object.assign({},state);       
       delete newState3[action.payload]
       return newState3;
    default:
       return state;

case SAVE_LIST:

     if(localStorage){

        localStorage.setItem('customerServiceList',JSON.stringify(state));
     }
     else{
         alert('your browser didn\'t support localStorage , so your data won\'t be saved , bye...');
     }
     return state;

   }


}