export const DATE_UTIL = (function(){
    
      const dateObj = new Date();

return{

      getTimeNow:function(){

        const currentDateTime =  dateObj.getFullYear()+'年'+
         (dateObj.getMonth()+1)+'月'+
         dateObj.getDate()+'日('+
         dateObj.getHours()+':'+dateObj.getMinutes()+':'+dateObj.getSeconds()+')';

       return currentDateTime;
      },
      getTimeStamp:function(){

        return dateObj.getTime();

      }
}
})();