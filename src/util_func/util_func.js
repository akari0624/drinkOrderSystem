const DATE_UTIL = (function () {
    const dateObj = new Date();

    return {
        getTimeNow: function () {
            const currentDateTime = dateObj.getFullYear() + '年' + (dateObj.getMonth() + 1) + '月' + dateObj.getDate() + '日(' + dateObj.getHours() + ':' + dateObj.getMinutes() + ':' + dateObj.getSeconds() + ')';

            return currentDateTime;
        },
        getTimeStamp: function () {
            return dateObj.getTime();
        }
    };
})();

const getPartStringAndAddSuffix = (tStr, grabHowMany, suffix) => {
    if (typeof tStr !== 'string') {
        throw new Error('tStr should be String!');
    }

    if (tStr.length < grabHowMany + 1) {
        return tStr;
    }
    let result = tStr.substring(0, grabHowMany + 1);

    return `${result}${suffix}`;
};

const grabFromCookie = (name) => {
    let cookie = {};
    document
        .cookie
        .split(';')
        .forEach(function (el) {
            let [k,
                v] = el.split('=');
            cookie[k.trim()] = v;
        });
    return cookie[name];
};

const deleteFromCookie = (name, path, domain) => {
    if (grabFromCookie(name)) {
        document.cookie = name + '=' + ((path)
            ? ';path=' + path
            : '') + ((domain)
            ? ';domain=' + domain
            : '') + ';expires=Thu, 01 Jan 1970 00:00:01 GMT';
    }
};



export {DATE_UTIL, getPartStringAndAddSuffix, grabFromCookie, deleteFromCookie};