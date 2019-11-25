import { combineReducers } from 'redux';

import TestReducer from './reducers/TestReducer';
import CommonReducer from './reducers/CommonReducer';
import LoginReducer from './reducers/LoginReducer';
import NotificationListReducer from './reducers/NotificationListReducer';
import NotificationDetailsReducer from './reducers/NotificationDetailsReducer';
import ArchiveNotificationsReducer from './reducers/ArchiveNotificationsReducer';
import LogoutReducer from './reducers/LogoutReducer';

export default combineReducers({
    TestReducer: TestReducer,
    CommonReducer: CommonReducer,
    LoginReducer: LoginReducer,
    NotificationListReducer: NotificationListReducer,
    NotificationDetailsReducer: NotificationDetailsReducer,
    ArchiveNotificationsReducer: ArchiveNotificationsReducer,
    LogoutReducer: LogoutReducer,
});     