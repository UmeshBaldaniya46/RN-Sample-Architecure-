import {

    LOGOUT_FETCH,
    LOGOUT_FETCH_SUCCESS,
    LOGOUT_FETCH_ERROR,

} from '../../common/StoreActionTypes';

const INITIAL_STATE = {
    resData: '',
    message: '',
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {

        case LOGOUT_FETCH:
            return { ...state, message: null, resData: null }
            break;
        case LOGOUT_FETCH_SUCCESS:
            return { ...state, message: null, resData: JSON.stringify(action.payload) }
            break;
        case LOGOUT_FETCH_ERROR:
            return { ...state, message: action.payload, resData: null }
            break;

        default:
            return state;
    }
}

