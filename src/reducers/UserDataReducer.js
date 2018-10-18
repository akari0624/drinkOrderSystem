import { SAVE_USERDATA_TO_REDUCER } from '../_main_landing_page/actions/type';

const defaultStateOfThisReducer = {
    userID: '',
    userName:'',
    photoLink:'',
};

export default(state = defaultStateOfThisReducer, action) => {

    switch (action.type) {

    case SAVE_USERDATA_TO_REDUCER:
        const {userID, name:userName, photoLink} = action.payload;
        return {userID, userName, photoLink};


    default:
        return state;
    }

};