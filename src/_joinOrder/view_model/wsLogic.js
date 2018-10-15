export const examineIsMyOrder = (messageOwnerId, myWsId) => {

   
    if(messageOwnerId === myWsId){
        return true;
    }  
    return false;

};


export const generateCorrespondingOrderInfoChatMessage = (wsMsgData, myWsId) => {


    const someone_s_lastAddedOrder = wsMsgData.msg;

    if(!examineIsMyOrder(wsMsgData.senderId, myWsId)){

        const orderName = someone_s_lastAddedOrder.orderer_name;
        return `${orderName ? orderName : '某個人'} 訂購了 ${someone_s_lastAddedOrder.ordered_mealName} ${someone_s_lastAddedOrder.quantity}`;

    }

    return `你訂購了 ${someone_s_lastAddedOrder.ordered_mealName} ${someone_s_lastAddedOrder.quantity}`;
     
    
   
};