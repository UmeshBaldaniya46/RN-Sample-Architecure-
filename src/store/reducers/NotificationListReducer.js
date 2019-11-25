import {
    NOTIFICATION_LIST_FETCH,
    NOTIFICATION_LIST_FETCH_SUCCESS,
    NOTIFICATION_LIST_FETCH_ERROR,

    UNREAD_NOTIFICATION_COUNT_FETCH,
    UNREAD_NOTIFICATION_COUNT_FETCH_SUCCESS,
    UNREAD_NOTIFICATION_COUNT_FETCH_ERROR,

    STAREDARCHIVED_NOTIFICATION_FETCH,
    STAREDARCHIVED_NOTIFICATION_FETCH_SUCCESS,
    STAREDARCHIVED_NOTIFICATION_FETCH_ERROR,


    READUNREAD_NOTIFICATION_FETCH,
    READUNREAD_NOTIFICATION_FETCH_SUCCESS,
    READUNREAD_NOTIFICATION_FETCH_ERROR,

    NOTIFICATION_REFRESH,

} from '../../common/StoreActionTypes';

const INITIAL_STATE = {
    resData: '',
    resDataCount: '',
    resData1: '',
    message: '',
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {

        case NOTIFICATION_LIST_FETCH:
            return { ...state, message: null, resData: null }
            break;
        case NOTIFICATION_LIST_FETCH_SUCCESS:
            return { ...state, message: null, resData: JSON.stringify(action.payload) }
            break;
        case NOTIFICATION_LIST_FETCH_ERROR:
            return { ...state, message: action.payload, resData: null }
            break;

        case UNREAD_NOTIFICATION_COUNT_FETCH:
            return { ...state, message: null, resDataCount: null }
            break;
        case UNREAD_NOTIFICATION_COUNT_FETCH_SUCCESS:
            return { ...state, message: null, resDataCount: JSON.stringify(action.payload) }
            break;
        case UNREAD_NOTIFICATION_COUNT_FETCH_ERROR:
            return { ...state, message: action.payload, resDataCount: null }
            break;

        case STAREDARCHIVED_NOTIFICATION_FETCH:
            return { ...state, message: null, resData1: null }
            break;
        case STAREDARCHIVED_NOTIFICATION_FETCH_SUCCESS:
            return { ...state, message: null, resData1: JSON.stringify(action.payload) }
            break;
        case STAREDARCHIVED_NOTIFICATION_FETCH_ERROR:
            return { ...state, message: action.payload, resData1: null }
            break;


        case READUNREAD_NOTIFICATION_FETCH:
            return { ...state, message: null, resData1: null }
            break;
        case READUNREAD_NOTIFICATION_FETCH_SUCCESS:
            return { ...state, message: null, resData1: JSON.stringify(action.payload) }
            break;
        case READUNREAD_NOTIFICATION_FETCH_ERROR:
            return { ...state, message: action.payload, resData1: null }
            break;


        case NOTIFICATION_REFRESH:
            console.log("Notify to dhasboard screen of notification count22")
            return { ...state, message: null, resData1: null }
            break;


        default:
            return state;
    }
}

