const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_ERROR = "FETCH_ERROR";

export const FETCH_FAILED = "FETCH_FAILED";
export const UN_AUTHORISED = "UN_AUTHORISED";

export const SHOW_LOADER = "SHOW_LOADER";
export const CURRENT_ACTION = "CURRENT_ACTION";

const FIRST_API_DATA = "FIRST_API_DATA"
export const FIRST_API_DATA_FETCH = FIRST_API_DATA;
export const FIRST_API_DATA_FETCH_SUCCESS = FIRST_API_DATA + FETCH_SUCCESS;
export const FIRST_API_DATA_FETCH_ERROR = FIRST_API_DATA + FETCH_ERROR;
export const FIRST_API_DATA_FETCH_FAILED = FIRST_API_DATA + FETCH_FAILED;

const FIRST_USERS_DATA = "FIRST_USERS_DATA"
export const FIRST_USERS_DATA_FETCH = FIRST_USERS_DATA;
export const FIRST_USERS_DATA_FETCH_SUCCESS = FIRST_USERS_DATA + FETCH_SUCCESS;
export const FIRST_USERS_DATA_FETCH_ERROR = FIRST_USERS_DATA + FETCH_ERROR;
export const FIRST_USERS_DATA_FETCH_FAILED = FIRST_USERS_DATA + FETCH_FAILED;

// LOGIN
const LOGIN = "LOGIN_FETCH"
export const LOGIN_FETCH = LOGIN;
export const LOGIN_FETCH_SUCCESS = LOGIN + FETCH_SUCCESS;
export const LOGIN_FETCH_ERROR = LOGIN + FETCH_ERROR;
export const LOGIN_FETCH_FAILED = LOGIN + FETCH_FAILED;

// Notification List
const NOTIFICATION_LIST = "NOTIFICATION_LIST"
export const NOTIFICATION_LIST_FETCH = NOTIFICATION_LIST;
export const NOTIFICATION_LIST_FETCH_SUCCESS = NOTIFICATION_LIST + FETCH_SUCCESS;
export const NOTIFICATION_LIST_FETCH_ERROR = NOTIFICATION_LIST + FETCH_ERROR;
export const NOTIFICATION_LIST_FETCH_FAILED = NOTIFICATION_LIST + FETCH_FAILED;

const NOTIFICATION_DETAILS = "NOTIFICATION_DETAILS"
export const NOTIFICATION_DETAILS_FETCH = NOTIFICATION_DETAILS;
export const NOTIFICATION_DETAILS_FETCH_SUCCESS = NOTIFICATION_DETAILS + FETCH_SUCCESS;
export const NOTIFICATION_DETAILS_FETCH_ERROR = NOTIFICATION_DETAILS + FETCH_ERROR;
export const NOTIFICATION_DETAILS_FETCH_FAILED = NOTIFICATION_DETAILS + FETCH_FAILED;

const NOTIFICATION_SEND_RESPONSE = "NOTIFICATION_SEND_RESPONSE"
export const NOTIFICATION_SEND_RESPONSE_FETCH = NOTIFICATION_SEND_RESPONSE;
export const NOTIFICATION_SEND_RESPONSE_FETCH_SUCCESS = NOTIFICATION_SEND_RESPONSE + FETCH_SUCCESS;
export const NOTIFICATION_SEND_RESPONSE_FETCH_ERROR = NOTIFICATION_SEND_RESPONSE + FETCH_ERROR;
export const NOTIFICATION_SEND_RESPONSE_FETCH_FAILED = NOTIFICATION_SEND_RESPONSE + FETCH_FAILED;

const UNREAD_NOTIFICATION_COUNT = "UNREAD_NOTIFICATION_COUNT"
export const UNREAD_NOTIFICATION_COUNT_FETCH = UNREAD_NOTIFICATION_COUNT;
export const UNREAD_NOTIFICATION_COUNT_FETCH_SUCCESS = UNREAD_NOTIFICATION_COUNT + FETCH_SUCCESS;
export const UNREAD_NOTIFICATION_COUNT_FETCH_ERROR = UNREAD_NOTIFICATION_COUNT + FETCH_ERROR;
export const UNREAD_NOTIFICATION_COUNT_FETCH_FAILED = UNREAD_NOTIFICATION_COUNT + FETCH_FAILED;


const STAREDARCHIVED_NOTIFICATION = "STAREDARCHIVED_NOTIFICATION"
export const STAREDARCHIVED_NOTIFICATION_FETCH = STAREDARCHIVED_NOTIFICATION;
export const STAREDARCHIVED_NOTIFICATION_FETCH_SUCCESS = STAREDARCHIVED_NOTIFICATION + FETCH_SUCCESS;
export const STAREDARCHIVED_NOTIFICATION_FETCH_ERROR = STAREDARCHIVED_NOTIFICATION + FETCH_ERROR;
export const STAREDARCHIVED_NOTIFICATION_FETCH_FAILED = STAREDARCHIVED_NOTIFICATION + FETCH_FAILED;

const READUNREAD_NOTIFICATION = "READUNREAD_NOTIFICATION"
export const READUNREAD_NOTIFICATION_FETCH = READUNREAD_NOTIFICATION;
export const READUNREAD_NOTIFICATION_FETCH_SUCCESS = READUNREAD_NOTIFICATION + FETCH_SUCCESS;
export const READUNREAD_NOTIFICATION_FETCH_ERROR = READUNREAD_NOTIFICATION + FETCH_ERROR;
export const READUNREAD_NOTIFICATION_FETCH_FAILED = READUNREAD_NOTIFICATION + FETCH_FAILED;

const ARCHIVE_NOTIFICATION = "ARCHIVE_NOTIFICATION"
export const ARCHIVE_NOTIFICATION_FETCH = ARCHIVE_NOTIFICATION;
export const ARCHIVE_NOTIFICATION_FETCH_SUCCESS = ARCHIVE_NOTIFICATION + FETCH_SUCCESS;
export const ARCHIVE_NOTIFICATION_FETCH_ERROR = ARCHIVE_NOTIFICATION + FETCH_ERROR;
export const ARCHIVE_NOTIFICATION_FETCH_FAILED = ARCHIVE_NOTIFICATION + FETCH_FAILED;


const LOGOUT = "LOGOUT"
export const LOGOUT_FETCH = LOGOUT;
export const LOGOUT_FETCH_SUCCESS = LOGOUT + FETCH_SUCCESS;
export const LOGOUT_FETCH_ERROR = LOGOUT + FETCH_ERROR;
export const LOGOUT_FETCH_FAILED = LOGOUT + FETCH_FAILED;


export const NOTIFICATION_REFRESH = "NOTIFICATION_REFRESH"