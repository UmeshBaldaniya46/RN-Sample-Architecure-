import {
    LOGIN_FETCH_SUCCESS, LOGIN_FETCH_ERROR, LOGIN_FETCH, CURRENT_ACTION, SHOW_LOADER
} from '../../common/StoreActionTypes';
import { login } from '../../common/ApiConfig';
import { postApi } from './ApiCallFunction';
import { fetchFail } from './CommonAction';

/* Redux Action to call multiple APIs Simultaneously */
export const FetchLoginAction = (body) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADER, payload: true });
        Promise.all([postApi(login, LOGIN_FETCH, {}, body)])
            .then(function (values) {
                 dispatch({ type: SHOW_LOADER, payload: false })
                /* Handle Response of all Apis */
                console.log("Post Success Response11:- ", values)
                 fetchLoginSuccess(dispatch, values[0]);
            }).catch(err => {
                console.log(err)
                /* Will be called in case of No internet or Unauthorised */
                fetchFail(dispatch, err);
            });
    }
}

const fetchLoginSuccess = (dispatch, res) => {
    //console.log("Post Success Response:- " + JSON.stringify(res))
    dispatch({
        type: CURRENT_ACTION,
        payload: LOGIN_FETCH
    })
    if (res != null && res.responseCode == 200) {
        dispatch({
            type: LOGIN_FETCH_SUCCESS,
            payload: res
        });
    } else {
        dispatch({
            type: LOGIN_FETCH_ERROR,
            payload: res.message
        });
    }
};