import {
    LOGIN_FETCH_SUCCESS, LOGIN_FETCH_ERROR, LOGIN_FETCH
} from '../../common/StoreActionTypes';

const INITIAL_STATE = {
    resData: '',
    message: '',
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOGIN_FETCH:
            return { ...state, message: null, resData: null }
            break;
        case LOGIN_FETCH_SUCCESS:
            return { ...state, message: null, resData: JSON.stringify(action.payload) }
            break;
        case LOGIN_FETCH_ERROR:
            return { ...state, message: action.payload, resData: null }
            break;
        default:
            return state;
    }
}

