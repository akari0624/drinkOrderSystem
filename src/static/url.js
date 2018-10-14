

import * as PROD_URL from './url.prod';


import * as DEV_URL from './url.dev';


let URL_MODULE;

if(process.env.NODE_ENV === 'production'){

    console.log('產品模式');
    URL_MODULE = PROD_URL;

}else{
    console.log('現在是在跑本地開發模式，記得mongoDB,express server要打開啊');
    URL_MODULE = DEV_URL;
}




export const FrontWebAppOrSubDirectoryBaseName = URL_MODULE.FrontWebAppOrSubDirectoryBaseName;


export const vendorImagePathOnNodeServer = `${URL_MODULE.vendorImagePathOnNodeServer}/`;

export const UPLOAD_SHOP_INIT_MEAL_LIST_URL = `${URL_MODULE.backEndServerBaseURL}/vendor/meal/initlist`;


export const RETRIEVE_VENDOR_URL = `${URL_MODULE.backEndServerBaseURL}/vendor/retrieve`;


export const INSERT_ORDER_URL = `${URL_MODULE.backEndServerBaseURL}/order/create`;

export const JOIN_ORDER_BASE_URL = `${URL_MODULE.reactAppAddr}/order/join`;


export const JOIN_ORDER_BASE_URL_RELATIVE = '/order/join';

export const getOrderInfoWhenJoinOrder_URL = `${URL_MODULE.backEndServerBaseURL}/order/join/get_order_info`;

export const addOrderMealToOrder_URL = `${URL_MODULE.backEndServerBaseURL}/order/join/add_order_meal_to_order`;

export const join_order_web_socket_url = URL_MODULE.join_order_web_socket_url;


export const fbSignUpOrLogInBackendRoute = URL_MODULE.fbSignUpOrLogInBackendRoute;
