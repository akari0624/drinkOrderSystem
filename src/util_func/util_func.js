const DATE_UTIL = (function() {
    const dateObj = new Date();

    return {
        getTimeNow: function() {
            const currentDateTime =
                dateObj.getFullYear() +
                '年' +
                (dateObj.getMonth() + 1) +
                '月' +
                dateObj.getDate() +
                '日(' +
                dateObj.getHours() +
                ':' +
                dateObj.getMinutes() +
                ':' +
                dateObj.getSeconds() +
                ')';

            return currentDateTime;
        },
        getTimeStamp: function() {
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


export {DATE_UTIL, getPartStringAndAddSuffix};