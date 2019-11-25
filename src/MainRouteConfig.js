import {
    View, Text, Image, TouchableOpacity, TouchableWithoutFeedback,
    BackHandler, AsyncStorage, RefreshControl, ActivityIndicator
} from 'react-native';
import React from 'react';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Containers } from "./containers";
import AppNavKeys from "./common/AppNavKeys";
import { createDrawerNavigator } from "react-navigation-drawer";
import SideMenu from "./components/SideMenu";
import firebase from 'react-native-firebase';
import Navigator from "./common/Navigator";

import { NotificationReloadAction, } from '../src/store/actions/NotificationListAction';

const SplashStackNavigator = createStackNavigator({
    [AppNavKeys.Splash]: Containers.Splash
}, { 
    headerMode: "none",
    navigationOptions: {
        swipeEnabled: false,
        gesturesEnabled: false,
    }
});

const LoginStackNavigator = createStackNavigator({
    [AppNavKeys.Login]: Containers.Login,
    //[AppNavKeys.NotificationList]:HomeNavigation
}, {
    headerMode: 'none'
})

const DrawerNaviogation = createDrawerNavigator({
    [AppNavKeys.Dashboard]: Containers.Dashboard,
}, {
    contentComponent: SideMenu,
    drawerWidth: "70%"
});

const HomeNavigation = createStackNavigator({
    [AppNavKeys.Home]: DrawerNaviogation,
    [AppNavKeys.NotificationDetail]: Containers.NotificationDetail,
    [AppNavKeys.MyAccount]: Containers.MyAccount,
    [AppNavKeys.ArchiveNotifications]: Containers.ArchiveNotifications,
}, {
    headerMode: 'none'
})

const AppNavigator = createAppContainer(createSwitchNavigator({
    [AppNavKeys.Splash]: SplashStackNavigator,
    [AppNavKeys.Login]: LoginStackNavigator,
    [AppNavKeys.Home]: HomeNavigation
}));


class MainRouteConfig extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return ([
            <AppNavigator key='navigation'
                ref={navigatorRef => {
                    Navigator.setContainer(navigatorRef);
                }} />
        ])
    }

    async createNotificationListeners() {
        try {
            const lastNotification = await AsyncStorage.getItem(
                'lastNotification'
            );
            const notificationOpen = await firebase.notifications().getInitialNotification();

            if (notificationOpen) {
                console.log("Dashboard getInitialNotification");

                const notification = notificationOpen.notification;
                var seen = [];

                if (lastNotification !== notification.notificationId) {

                    AsyncStorage.setItem(
                        'lastNotification',
                        notification.notificationId
                    );

                    var data = "";
                    var res = JSON.stringify(notification.data, function (key, val) {
                        if (val != null && typeof val == "object") {
                            if (seen.indexOf(val) >= 0) {
                                return;
                            }
                            console.log(JSON.stringify(val))
                            data = (val);
                            seen.push(val);
                        }
                        //return val;
                    })
                    console.log(JSON.stringify(res));
                    console.log("seen");
                    console.log(JSON.stringify(seen));
                    console.log("data")
                    console.log(JSON.stringify(data))

                    /** 
                    * Redirection to onther screen once tap on notification
                    * called when app is killed
                    */
                    this._RedirectionFromNotificationClick(data, "AppKill");

                }

                /**
                * Remove notification after in click  
                */
                firebase.notifications().removeDeliveredNotification(notification.notificationId);
            }

            const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max).setDescription('My apps test channel');

            firebase.notifications().android.createChannel(channel);

            this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
                console.log("Dashboard onNotificationDisplayed");
                console.log("notification1");
                console.log(notification);
            });

            this.notificationListener = firebase.notifications().onNotification((notification) => {

                try {

                    console.log('NOTIFICATION ', notification);
                    console.log(notification.data)
                    // let { title, body } = notification;
                    // console.log("title " + title);
                    // console.log("body " + body);
                    console.log("notification._android._notification._DATA ", notification._android._notification._data);

                    const channelId = new firebase.notifications.Android.Channel(
                        'Default', 'Default', firebase.notifications.Android.Importance.High
                    );
                    firebase.notifications().android.createChannel(channelId);

                    let notification_to_be_displayed = new firebase.notifications.Notification({
                        data: notification._android._notification._data,
                        sound: 'default',
                        show_in_foreground: true,
                        title: notification.title,
                        body: notification.body,
                    });

                    if (Platform.OS == 'android') {
                        notification_to_be_displayed.android
                            .setPriority(firebase.notifications.Android.Priority.High)
                            .android.setChannelId('Default')
                            .android.setVibrate(1000);
                    }
                    console.log('FOREGROUND NOTIFICATION LISTENER: \n', notification_to_be_displayed);

                    firebase.notifications().displayNotification(notification_to_be_displayed);


                    //Notify to dhasboard screen of notification count
                    console.log("Notify to dhasboard screen of notification count00")
                    this.props.NotificationReloadAction();

                } catch (error) {
                    console.log("ERROR onNotification ", error)
                }
            })

            this.messageListener = firebase.messaging().onMessage((message) => {
                console.log("MESSAGE " + JSON.stringify(message));
            });

            this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {

                console.log("notificationOpenedListener")
                const notification = notificationOpen.notification;
                var seen = [];

                if (lastNotification !== notification.notificationId) {
                    AsyncStorage.setItem('lastNotification', notification.notificationId);
                    var data = "";
                    var res = JSON.stringify(notification.data, function (key, val) {
                        if (val != null && typeof val == "object") {
                            if (seen.indexOf(val) >= 0) {
                                return;
                            }
                            console.log(JSON.stringify(val))
                            data = (val);
                            seen.push(val);
                        }
                    })

                    /**
                     * Remove notification after in click  
                     */
                    firebase.notifications().removeDeliveredNotification(notification.notificationId);

                    /** 
                    * Redirection to onther screen once tap on notification
                    * call when app is in forground/bacground
                    */
                    this._RedirectionFromNotificationClick(data, "AppOpen");

                } else {
                    firebase.notifications().removeDeliveredNotification(notification.notificationId);
                }
            });

        } catch (err) {
            console.log(err)
        }
    }

    _RedirectionFromNotificationClick(data, From) {

        console.log("From============ " + From)
        console.log("DATA ", data);
        console.log("DATA details ", data.details);
        var notification_id = "";
        try {
            var details = JSON.parse(data.details)
            notification_id = details.notification_id
            console.log("DATA details.notification_id " + notification_id);
        } catch (error) { notification_id = "" }

        if (data != null && notification_id != "") {
            var item = {
                "notification_id": notification_id
            }
            if (From == "AppKill") {
                Navigator.navigate(AppNavKeys.Splash, {
                    Item: item,
                    FROM: "NOTIFICATION"
                })
            } else {
                Navigator.navigate(AppNavKeys.NotificationDetail, {
                    Item: item,
                    FROM: "NOTIFICATION"
                })
            }
        } else {
            Navigator.navigate(AppNavKeys.Home)
        }
    };

    async componentDidMount() {
        this.createNotificationListeners();
        const fcmToken = await firebase.messaging().getToken();
        console.log("====================== fcmToken ========================")
        console.log(fcmToken)
    }

    componentWillUnmount() {
        this.removeAllListenrs()
    }
    removeAllListenrs() {
        this.notificationDisplayedListener();
        this.notificationListener();
        this.messageListener();
        this.notificationOpenedListener();
    }
}


function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        NotificationReloadAction: NotificationReloadAction,
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        CommonReducer: state.CommonReducer,
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(MainRouteConfig);