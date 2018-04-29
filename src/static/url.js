const serverIp = 'http://localhost';

const serverPort = ':8089';

const webAppName = '';

const baseURL = `${serverIp}${serverPort}${webAppName}`;

const reactAppAddr = 'http://localhost:9999';

export const vendorImagePathOnNodeServer = `${baseURL}/`;

export const UPLOAD_SHOP_INIT_MEAL_LIST_URL = `${baseURL}/vendor/meal/initlist`;


export const RETRIEVE_VENDOR_URL = `${baseURL}/vendor/retrieve`;


export const INSERT_ORDER_URL = `${baseURL}/order/create`;

export const JOIN_ORDER_BASE_URL = `${reactAppAddr}/order/join`;

