import {
    CURRENT_ACTION, SHOW_LOADER,

    ARCHIVE_NOTIFICATION_FETCH,
    ARCHIVE_NOTIFICATION_FETCH_SUCCESS,
    ARCHIVE_NOTIFICATION_FETCH_ERROR,

} from '../../common/StoreActionTypes';
import {
    getArchivedNotifications
} from '../../common/ApiConfig';
import { postApi } from './ApiCallFunction';
import { fetchFail } from './CommonAction';

/* Redux Action to call multiple APIs Simultaneously */
export const ArchiveNotificationsAction = (body, header) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADER, payload: true });
        Promise.all([postApi(getArchivedNotifications, ARCHIVE_NOTIFICATION_FETCH, header, body)])
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
        payload: ARCHIVE_NOTIFICATION_FETCH
    })

    if (res != null && (res.responseCode == 200 || res.responseCode == 404)) {
        dispatch({
            type: ARCHIVE_NOTIFICATION_FETCH_SUCCESS,
            payload: res
        });
    } else {
        dispatch({
            type: ARCHIVE_NOTIFICATION_FETCH_ERROR,
            payload: res.message
        });
    }
};
