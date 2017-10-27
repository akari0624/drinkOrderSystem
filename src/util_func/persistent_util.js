
export default (function(){


return{
loadFromLocalStorage : function(localStorageKey){

     //  in this APP localStorageKey is customerServiceList
    if(localStorage && localStorage.getItem(localStorageKey)!== null){
        
               const lastCustomerServiceList = JSON.parse(localStorage.getItem(localStorageKey));

           return lastCustomerServiceList;

}

          const noDataFromLocalStorage = {};
          return noDataFromLocalStorage;  


}

}

})();