import {
    CURRENT_ACTION, SHOW_LOADER,

    NOTIFICATION_DETAILS_FETCH,
    NOTIFICATION_DETAILS_FETCH_SUCCESS,
    NOTIFICATION_DETAILS_FETCH_ERROR,

    NOTIFICATION_SEND_RESPONSE_FETCH,
    NOTIFICATION_SEND_RESPONSE_FETCH_SUCCESS,
    NOTIFICATION_SEND_RESPONSE_FETCH_ERROR,


} from '../../common/StoreActionTypes';
import {
    getNotificationDetails, sendNotificationResponse
} from '../../common/ApiConfig';
import { postApi } from './ApiCallFunction';
import { fetchFail } from './CommonAction';

export const NotificationDetailsAction = (body, header) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADER, payload: true });
        Promise.all([postApi(getNotificationDetails, NOTIFICATION_DETAILS_FETCH, header, body)])
            .then(function (values) {
                dispatch({ type: SHOW_LOADER, payload: false })
                fetchNotificationDetailsSuccess(dispatch, values[0]);
            }).catch(err => {
                console.log(err)
                fetchFail(dispatch, err);
            });
    }
}

const fetchNotificationDetailsSuccess = (dispatch, res) => {
    dispatch({
        type: CURRENT_ACTION,
        payload: NOTIFICATION_DETAILS_FETCH
    })

    if (res != null && (res.responseCode == 200)) {
        dispatch({
            type: NOTIFICATION_DETAILS_FETCH_SUCCESS,
            payload: res
        });
    } else {
        dispatch({
            type: NOTIFICATION_DETAILS_FETCH_ERROR,
            payload: res.message
        });
    }
};

export const sendNotificationResponseAction = (body, header) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADER, payload: true });
        Promise.all([postApi(sendNotificationResponse, NOTIFICATION_SEND_RESPONSE_FETCH, header, body)])
            .then(function (values) {
                dispatch({ type: SHOW_LOADER, payload: false })
                fetchsendNotificationSuccess(dispatch, values[0]);
            }).catch(err => {
                console.log(err)
                fetchFail(dispatch, err);
            });
    }
}

const fetchsendNotificationSuccess = (dispatch, res) => {
    dispatch({
        type: CURRENT_ACTION,
        payload: NOTIFICATION_SEND_RESPONSE_FETCH
    })

    if (res != null && (res.responseCode == 200)) {
        dispatch({
            type: NOTIFICATION_SEND_RESPONSE_FETCH_SUCCESS,
            payload: res
        });
    } else {
        dispatch({
            type: NOTIFICATION_SEND_RESPONSE_FETCH_ERROR,
            payload: res.message
        });
    }
};

