import {
    CURRENT_ACTION, SHOW_LOADER,

    LOGOUT_FETCH,
    LOGOUT_FETCH_SUCCESS,
    LOGOUT_FETCH_ERROR,

} from '../../common/StoreActionTypes';
import { logout } from '../../common/ApiConfig';
import { postApi } from './ApiCallFunction';
import { fetchFail } from './CommonAction';

export const LogoutAction = (body, header) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADER, payload: true });
        Promise.all([postApi(logout, LOGOUT_FETCH, header, body)])
            .then(function (values) {
                dispatch({ type: SHOW_LOADER, payload: false })
                fetchlogoutSuccess(dispatch, values[0]);
            }).catch(err => {
                console.log(err)
                fetchFail(dispatch, err);
            });
    }
}

const fetchlogoutSuccess = (dispatch, res) => {
    dispatch({
        type: CURRENT_ACTION,
        payload: LOGOUT_FETCH
    })

    if (res != null && (res.responseCode == 200)) {
        dispatch({
            type: LOGOUT_FETCH_SUCCESS,
            payload: res
        });
    } else {
        dispatch({
            type: LOGOUT_FETCH_ERROR,
            payload: res.message
        });
    }
};


