import { GETDATA, ADD_DATA, UPDATE_DATA, DELETE_ONE, SAVE_LIST, SET_HEADER_STATE } from './type';

export const getListData = function() {

    return { type: GETDATA, payload: {} };



}

export const addDataToList = function(dataObj) {

    return { type: ADD_DATA, payload: dataObj }

}



export const updateDataInList = function(
    id,
    pCustomerName,
    pCustomerContact,
    pConcatTelNumber,
    pAskSystem,
    pAskContent,
    pFixPerson,
    pHowToFix,
    pCurrentSituation,
    pInsertTimeArr
) {
    const dataObj = {};
    const data = {};

    data.id=id,
    data.pCustomerName = pCustomerName,
    data.pCustomerContact = pCustomerContact,
    data.pConcatTelNumber = pConcatTelNumber,　
    data.pAskSystem = pAskSystem,
    data.pAskContent = pAskContent,
    data.pFixPerson = pFixPerson,
    data.pHowToFix =  pHowToFix,
    data.pCurrentSituation = pCurrentSituation,
    data.pInsertTime = pInsertTimeArr
 
    dataObj.id = id;
    dataObj.data = data;
    return { type: UPDATE_DATA, payload: dataObj }

}

export const deleteOneInList = function(id) {

    return { type: DELETE_ONE, payload: id }
}

export const saveListDataToLocalStorage = function() {

    return { type: SAVE_LIST, payload: {} }

}

export const changeHeaderState = function(inWhichPage){


    return {type: SET_HEADER_STATE, payload:inWhichPage}
}