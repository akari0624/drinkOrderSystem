export default function LoggerMiddleware({dispatch,getState}){

    //  最省略的寫法  省略了好幾個return 跟 () , {} ,一般人看第一眼絕對看不懂這在寫什麼@
   return next => action => {

     console.log('action log type1 from middleware :',action);

     return next(action);
   }
    


// same as below 


// return (next)=>{ 
//     return (action)=>{
//         console.log('action log type2 from middleware :',action);
//         return next(action);
//     }
// }



 // and same as

//   return function(next){

//       return function(action){

//         console.log('action log type3 from middleware :',action);
//         return next(action);

//       }


//   }

 


}