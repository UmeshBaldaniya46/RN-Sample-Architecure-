import NetInfo from "@react-native-community/netinfo";
import { store } from "../../../App";

/* GET Api Call */
export async function getFetch(apiUrl, actionType, header, body = {}) {
    const isConnected = await NetInfo.isConnected.fetch();
    if (isConnected) { 
        store.dispatch({ type: actionType });
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'AUTH-TOKEN': header
            },
        }).then((response) => {
            return response.json()
        })
            .then((responseJson) => {
                return responseJson;
            })
            .catch((error) => {
                console.log(error)
                return { responseCode: 404, message: "Network Error! Please try again later." }
            });
        return response;
    } else {
        return false;
    }
}

/* Api wrapper for GET Request */
export var getApi = (apiUrl, actionType, header, body = {}) => {
    return new Promise(async (resolve, reject) => {
        const resData = await getFetch(apiUrl, actionType, header, body);
        if (resData == false) {
            reject({ responseCode: 404, message: "Network Error! Please try again later." })
        } else if (resData.responseCode == 401 || resData.responseCode == 400) {
            reject(resData)
        } else {
            resolve(resData)
        }
    });
}

/* POST Api Call */
export async function postFetch(apiUrl, actionType, header = {}, body = {}) {
    const isConnected = await NetInfo.isConnected.fetch();
    if (isConnected) {
        store.dispatch({ type: actionType });
        const response = await fetch(apiUrl, {
            method: 'POST',
            mode: "no-cors",
            headers: header,
            body: JSON.stringify(body),
        }).then((response) => {
            return response.json()
        }).then((responseJson) => {
            return responseJson;
        }).catch((error) => {
            console.log(error)
            return { responseCode: 404, message: "Network Error! Please try again later." }
        });
        return response;
    } else {
        return false;
    }
}

/* Api wrapper for POST Request */
export var postApi = (apiUrl, actionType, header = {}, body = {}) => {

    console.log("==================================")
    console.log(" URL:- " + apiUrl)
    console.log("actionType:- " + actionType)
    console.log("header:- ", header)
    console.log("body:- " + JSON.stringify(body))
    var headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
    headers = Object.assign(headers, header)

    return new Promise(async (resolve, reject) => {
        const resData = await postFetch(apiUrl, actionType, headers, body);
        console.log("POST Response:- " + JSON.stringify(resData))
        if (resData == false) {
            reject({ responseCode: 404, message: "Network Error! Please try again later." })
        } else if (resData.responseCode == 401) {
            reject(resData)
        } else {
            resolve(resData)
        }
    });
}