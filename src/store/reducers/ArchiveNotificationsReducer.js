import {
    ARCHIVE_NOTIFICATION_FETCH,
    ARCHIVE_NOTIFICATION_FETCH_SUCCESS,
    ARCHIVE_NOTIFICATION_FETCH_ERROR,

} from '../../common/StoreActionTypes';

const INITIAL_STATE = {
    resData: '',
    message: '',
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {

        case ARCHIVE_NOTIFICATION_FETCH:
            return { ...state, message: null, resData: null }
            break;
        case ARCHIVE_NOTIFICATION_FETCH_SUCCESS:
            return { ...state, message: null, resData: JSON.stringify(action.payload) }
            break;
        case ARCHIVE_NOTIFICATION_FETCH_ERROR:
            return { ...state, message: action.payload, resData: null }
            break;

        default:
            return state;
    }
}

