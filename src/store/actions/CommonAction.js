import { FETCH_FAILED, UN_AUTHORISED } from "../../common/StoreActionTypes";

export const fetchFail = (dispatch, err) => {
    if (err.responseCode == 401) {
        dispatch({
            type: UN_AUTHORISED,
            payload: err.message
        });
    } else {
        dispatch({
            type: FETCH_FAILED,
            payload: err.message
        });
    }
}