const domainName = 'localhost';

const protocol_http = 'http://';

const protocol_web_socket = 'ws://';

const serverIp = `${protocol_http}${domainName}`;

const wsUrl = `${protocol_web_socket}${domainName}`;

const serverPort = ':8089';

const wesocketPort = ':8090';

const webAppName = '';


const frontWebAppOrSubDirectoryBaseName = '';


export const reactAppAddr = `http://localhost:9999${frontWebAppOrSubDirectoryBaseName}`;


export const backEndServerBaseURL = `${serverIp}${serverPort}${webAppName}`;

export const vendorImagePathOnNodeServer = `${backEndServerBaseURL}/`;

export const UPLOAD_SHOP_INIT_MEAL_LIST_URL = `${backEndServerBaseURL}/vendor/meal/initlist`;


export const RETRIEVE_VENDOR_URL = `${backEndServerBaseURL}/vendor/retrieve`;


export const INSERT_ORDER_URL = `${backEndServerBaseURL}/order/create`;

export const JOIN_ORDER_BASE_URL = `${reactAppAddr}/order/join`;


export const JOIN_ORDER_BASE_URL_RELATIVE = '/order/join';

export const getOrderInfoWhenJoinOrder_URL = `${backEndServerBaseURL}/order/join/get_order_info`;

export const addOrderMealToOrder_URL = `${backEndServerBaseURL}/order/join/add_order_meal_to_order`;

export const join_order_web_socket_url = `${wsUrl}${wesocketPort}`;

export const fbSignUpOrLogInBackendRoute = `${backEndServerBaseURL}/auth/facebook`;
