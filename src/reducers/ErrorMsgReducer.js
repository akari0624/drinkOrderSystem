import {ERROR_MSG} from '@/__site_global_thing/type';

const defaultStateOfThisReducer = {
    value: ''
}

export default(state = defaultStateOfThisReducer, action) => {

    switch (action.type) {

    case ERROR_MSG:
        return {value: action.payload};

    default:
        return state;
    }

};