import {
    SHOW_LOADER, FETCH_FAILED, UN_AUTHORISED, CURRENT_ACTION
} from '../../common/StoreActionTypes';

const INITIAL_STATE = {
    isLoading: false,
    fetchFailed: false,
    unauthorised: false,
    message: null,
    api_type: null
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case CURRENT_ACTION:
            return { ...state, api_type: action.payload, fetchFailed: false, unauthorised: false, message: null }
        case SHOW_LOADER:
            return { ...state, api_type: null, isLoading: action.payload, fetchFailed: false, unauthorised: false, message: null }
            break;
        case FETCH_FAILED:
            return { ...state, isLoading: false, fetchFailed: true, unauthorised: false, message: action.payload }
            break;
        case UN_AUTHORISED:
            return { ...state, isLoading: false, fetchFailed: false, unauthorised: true, message: action.payload }
            break;
        default:
            return state;
    }
}