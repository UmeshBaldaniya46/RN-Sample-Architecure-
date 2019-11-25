import {
    FIRST_API_DATA_FETCH, FIRST_API_DATA_FETCH_SUCCESS, FIRST_API_DATA_FETCH_ERROR,
    FIRST_USERS_DATA_FETCH, FIRST_USERS_DATA_FETCH_SUCCESS, FIRST_USERS_DATA_FETCH_ERROR
} from '../../common/StoreActionTypes';
import { SHOW_LOADER } from "../../common/StoreActionTypes";
import { test1, users } from '../../common/ApiConfig';
import { getApi } from './ApiCallFunction';
import { fetchFail } from './CommonAction';


/* Redux Action to call multiple APIs Simultaneously */
export const FetchUserTodoAction = () => {
    return async (dispatch) => {

        dispatch({ type: SHOW_LOADER, payload: true });
        Promise.all(
            [getApi(users, FIRST_USERS_DATA_FETCH),
            getApi(test1, FIRST_API_DATA_FETCH)]

        ).then(function (values) {

            dispatch({ type: SHOW_LOADER, payload: false })

            /* Handle Response of all Apis */
            fetchTodoSuccess(dispatch, values[0]);
            fetchUsersSuccess(dispatch, values[1]);

        }).catch(err => {
            /* Will be called in case of No internet or Unauthorised */
            fetchFail(dispatch, err);
        });
    }
}


const fetchTodoSuccess = (dispatch, res) => {
    if (res != null) {
        dispatch({
            type: FIRST_API_DATA_FETCH_SUCCESS,
            payload: res
        });
    } else {
        dispatch({
            type: FIRST_API_DATA_FETCH_ERROR,
            payload: res.message
        });
    }
};

const fetchUsersSuccess = (dispatch, res) => {
    if (res != null) {
        dispatch({
            type: FIRST_USERS_DATA_FETCH_SUCCESS,
            payload: res
        });
    } else {
        dispatch({
            type: FIRST_USERS_DATA_FETCH_ERROR,
            payload: res.message
        });
    }
};