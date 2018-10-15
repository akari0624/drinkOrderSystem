import { isLoginLocalStorageKey } from '../conf/keys';


export default(function () {

    return {
        loadFromLocalStorage: function (localStorageKey) {

            //  in this APP localStorageKey is customerServiceList
            if (localStorage && localStorage.getItem(localStorageKey) !== null) {

                const lastCustomerServiceList = JSON.parse(localStorage.getItem(localStorageKey));

                return lastCustomerServiceList;

            }

            const noDataFromLocalStorage = {};
            return noDataFromLocalStorage;

        },

        loadJWTFromLocalStorage: function () {

            if (localStorage) {

                return localStorage.getItem(isLoginLocalStorageKey);
            } else {

                throw new Error('請不要使用連LocalStorage都沒有支援的瀏覽器：珍惜生命，遠離ＩＥ。');
            }

        }
    };

})();