import {
    NOTIFICATION_DETAILS_FETCH,
    NOTIFICATION_DETAILS_FETCH_SUCCESS,
    NOTIFICATION_DETAILS_FETCH_ERROR,

    NOTIFICATION_SEND_RESPONSE_FETCH,
    NOTIFICATION_SEND_RESPONSE_FETCH_SUCCESS,
    NOTIFICATION_SEND_RESPONSE_FETCH_ERROR,

} from '../../common/StoreActionTypes';

const INITIAL_STATE = {
    resData: '',
    message: '',
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {

        case NOTIFICATION_DETAILS_FETCH:
            return { ...state, message: null, resData: null }
            break;
        case NOTIFICATION_DETAILS_FETCH_SUCCESS:
            return { ...state, message: null, resData: JSON.stringify(action.payload) }
            break;
        case NOTIFICATION_DETAILS_FETCH_ERROR:
            return { ...state, message: action.payload, resData: null }
            break;

        case NOTIFICATION_SEND_RESPONSE_FETCH:
            return { ...state, message: null, resData: null }
            break;
        case NOTIFICATION_SEND_RESPONSE_FETCH_SUCCESS:
            return { ...state, message: null, resData: JSON.stringify(action.payload) }
            break;
        case NOTIFICATION_SEND_RESPONSE_FETCH_ERROR:
            return { ...state, message: action.payload, resData: null }
            break;

        default:
            return state;
    }
}

