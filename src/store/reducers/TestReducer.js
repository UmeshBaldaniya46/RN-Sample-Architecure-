import {
    FIRST_API_DATA_FETCH, FIRST_API_DATA_FETCH_SUCCESS, FIRST_API_DATA_FETCH_ERROR,
    FIRST_USERS_DATA_FETCH, FIRST_USERS_DATA_FETCH_SUCCESS, FIRST_USERS_DATA_FETCH_ERROR
} from '../../common/StoreActionTypes';

const INITIAL_STATE = {
    resData: '',
    resData1: '',
    message: '',
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FIRST_API_DATA_FETCH:
            return { ...state, api_type: "FIRST_API_DATA_FETCH", message: null, resData: null }
            break;
        case FIRST_API_DATA_FETCH_SUCCESS:
            return { ...state, api_type: "FIRST_API_DATA_FETCH", message: null, resData: JSON.stringify(action.payload) }
            break;
        case FIRST_API_DATA_FETCH_ERROR:
            return { ...state, api_type: "FIRST_API_DATA_FETCH", message: action.payload, resData: null }
            break;

        case FIRST_USERS_DATA_FETCH:
            return { ...state, api_type: "FIRST_USERS_DATA_FETCH", message: null, resData1: null }
            break;
        case FIRST_USERS_DATA_FETCH_SUCCESS:
            return { ...state, api_type: "FIRST_USERS_DATA_FETCH", message: null, resData1: JSON.stringify(action.payload) }
            break;
        case FIRST_USERS_DATA_FETCH_ERROR:
            return { ...state, api_type: "FIRST_USERS_DATA_FETCH", message: action.payload, resData1: null }
            break;
        default:
            return state;
    }
}