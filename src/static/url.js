const serverIp = 'http://localhost';

const serverPort = ':8089';

const webAppName = '';

const backEndServerBaseURL = `${serverIp}${serverPort}${webAppName}`;

const reactAppAddr = 'http://localhost:9999';

export const vendorImagePathOnNodeServer = `${backEndServerBaseURL}/`;

export const UPLOAD_SHOP_INIT_MEAL_LIST_URL = `${backEndServerBaseURL}/vendor/meal/initlist`;


export const RETRIEVE_VENDOR_URL = `${backEndServerBaseURL}/vendor/retrieve`;


export const INSERT_ORDER_URL = `${backEndServerBaseURL}/order/create`;

export const JOIN_ORDER_BASE_URL = `${reactAppAddr}/order/join`;


export const JOIN_ORDER_BASE_URL_RELATIVE = '/order/join';

export const getOrderInfoWhenJoinOrder_URL = `${backEndServerBaseURL}/order/join/get_order_info`;

