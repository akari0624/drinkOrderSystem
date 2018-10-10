const validateDataBeforeSendToServer = ({vendorName, vendorAddr, vendorTel, addingMeals}) => {


    if(!vendorName || !vendorAddr || !vendorTel){
        
        return `店家資料必須填寫`;
    }
 
    if(addingMeals.length === 0){

        return `至少必須要有一道餐點`;
    } 
    return '';

};

export default  validateDataBeforeSendToServer;