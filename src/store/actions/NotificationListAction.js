import {
    CURRENT_ACTION, SHOW_LOADER,

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

    NOTIFICATION_REFRESH

} from '../../common/StoreActionTypes';
import {
    getNotificationList, getUnreadNotificationCount,
    starredArchivedNotification, markAsRead
} from '../../common/ApiConfig';
import { postApi } from './ApiCallFunction';
import { fetchFail } from './CommonAction';

/* Redux Action to call multiple APIs Simultaneously */
export const NotificationListAction = (body, header) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADER, payload: true });
        Promise.all([postApi(getNotificationList, NOTIFICATION_LIST_FETCH, header, body)])
            .then(function (values) {

                dispatch({ type: SHOW_LOADER, payload: false })
                /* Handle Response of all Apis */
                fetchNotificationListSuccess(dispatch, values[0]);
            }).catch(err => {
                console.log(err)
                /* Will be called in case of No internet or Unauthorised */
                fetchFail(dispatch, err);
            });
    }
}

const fetchNotificationListSuccess = (dispatch, res) => {
    dispatch({
        type: CURRENT_ACTION,
        payload: NOTIFICATION_LIST_FETCH
    })

    if (res != null && (res.responseCode == 200 || res.responseCode == 404)) {
        dispatch({
            type: NOTIFICATION_LIST_FETCH_SUCCESS,
            payload: res
        });
    } else {
        dispatch({
            type: NOTIFICATION_LIST_FETCH_ERROR,
            payload: res.message
        });
    }
};


export const getUnReadNotificationCountAction = (body, header) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADER, payload: true });
        Promise.all([postApi(getUnreadNotificationCount, UNREAD_NOTIFICATION_COUNT_FETCH, header, body)])
            .then(function (values) {

                dispatch({ type: SHOW_LOADER, payload: false })
                /* Handle Response of all Apis */
                fetchgetUnReadNotificationCountSuccess(dispatch, values[0]);
            }).catch(err => {
                console.log(err)
                /* Will be called in case of No internet or Unauthorised */
                fetchFail(dispatch, err);
            });
    }
}

const fetchgetUnReadNotificationCountSuccess = (dispatch, res) => {
    dispatch({
        type: CURRENT_ACTION,
        payload: UNREAD_NOTIFICATION_COUNT_FETCH
    })

    if (res != null && (res.responseCode == 200 || res.responseCode == 404)) {
        dispatch({
            type: UNREAD_NOTIFICATION_COUNT_FETCH_SUCCESS,
            payload: res
        });
    } else {
        dispatch({
            type: UNREAD_NOTIFICATION_COUNT_FETCH_ERROR,
            payload: res.message
        });
    }
};



export const starredArchivedNotificationAction = (body, header) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADER, payload: true });
        Promise.all([postApi(starredArchivedNotification, STAREDARCHIVED_NOTIFICATION_FETCH, header, body)])
            .then(function (values) {
                dispatch({ type: SHOW_LOADER, payload: false })
                fetchstarredArchivedNotificationSuccess(dispatch, values[0]);
            }).catch(err => {
                console.log(err)
                fetchFail(dispatch, err);
            });
    }
}

const fetchstarredArchivedNotificationSuccess = (dispatch, res) => {
    dispatch({
        type: CURRENT_ACTION,
        payload: STAREDARCHIVED_NOTIFICATION_FETCH
    })
    if (res != null && (res.responseCode == 200)) {
        dispatch({
            type: STAREDARCHIVED_NOTIFICATION_FETCH_SUCCESS,
            payload: res
        });
    } else {
        dispatch({
            type: STAREDARCHIVED_NOTIFICATION_FETCH_ERROR,
            payload: res.message
        });
    }
};


export const readUnreadNotificationAction = (body, header) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADER, payload: true });
        Promise.all([postApi(markAsRead, READUNREAD_NOTIFICATION_FETCH, header, body)])
            .then(function (values) {
                dispatch({ type: SHOW_LOADER, payload: false })
                fetchreadUnreadNotificationSuccess(dispatch, values[0]);
            }).catch(err => {
                console.log(err)
                fetchFail(dispatch, err);
            });
    }
}

const fetchreadUnreadNotificationSuccess = (dispatch, res) => {
    dispatch({
        type: CURRENT_ACTION,
        payload: READUNREAD_NOTIFICATION_FETCH
    })
    if (res != null && (res.responseCode == 200)) {
        dispatch({
            type: READUNREAD_NOTIFICATION_FETCH_SUCCESS,
            payload: res
        });
    } else {
        dispatch({
            type: READUNREAD_NOTIFICATION_FETCH_ERROR,
            payload: res.message
        });
    }
};


export const NotificationReloadAction = () => {
    console.log("Notify to dhasboard screen of notification count11")
    return (dispatch) => {
        //dispatch({ type: NOTIFICATION_REFRESH });
        dispatch({
            type: CURRENT_ACTION,
            payload: NOTIFICATION_REFRESH
        })
    }
}