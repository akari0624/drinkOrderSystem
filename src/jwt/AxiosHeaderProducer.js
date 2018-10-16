import Persistance from '../util_func/persistent_util';
import { jwtKeyInEveryRequestHeader } from '../conf/keys';



const _contentType = 'Content-Type';

export default class AxiosHeaderProducer{


    constructor(){

       
        this.axiosHeader = {headers:{}};

    }



    addJWT_Token = () => {

        this.axiosHeader.headers[jwtKeyInEveryRequestHeader] = Persistance.loadJWTFromLocalStorage();

        return this;
    }


    addContentType = (pContentType) => {

        this.axiosHeader.headers[_contentType] = pContentType;

        return this;
    }

    getFinalHeaders = () => {

        return this.axiosHeader;
    }
}