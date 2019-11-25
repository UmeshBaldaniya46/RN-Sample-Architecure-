import React, { Component } from 'react';
import {
    View, Text, Image, TouchableOpacity, TouchableWithoutFeedback,
    BackHandler, AsyncStorage, RefreshControl, ActivityIndicator,
    TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HomeNavigationBar from '../../components/NavigationBar/HomeNavigationBar';
import { styles } from './styles';
import Colors from '../../common/Colors';
import { SwipeListView } from 'react-native-swipe-list-view';
import { normalize } from '../../common/Normalize';
import { Assets } from '../../assets/Icons';
import Navigator from '../../common/Navigator';
import AppNavKeys from '../../common/AppNavKeys';
import { AsyncParamsKeys } from '../../common/Constants';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

import {
    NotificationListAction,
    getUnReadNotificationCountAction,
    starredArchivedNotificationAction,
    readUnreadNotificationAction,
} from '../../store/actions/NotificationListAction';
import {
    NOTIFICATION_LIST_FETCH,
    STAREDARCHIVED_NOTIFICATION_FETCH,
    READUNREAD_NOTIFICATION_FETCH,
    UNREAD_NOTIFICATION_COUNT_FETCH,
    NOTIFICATION_REFRESH,
} from '../../common/StoreActionTypes';


class Dashboard extends Component {
    _menu = null;
    constructor(props) {
        super(props);
        this.state = {
            itemclickNumber: 0,
            UnReadNotificationCount: 0,
            isAnySelected: false,
            noNotificationAailable: "",
            notificationList: [],
            refreshing: true,

            type: 0,
            pageNumber: 1,
            parPage: 0,
            lastCallRecordCount: 0,
            updateTime: "",
        };

        this._updateItemList = this._updateItemList.bind(this)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this)
    }

    async componentDidMount() {

        this._retrieveData();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

        var params = this.props.navigation.state.params;
        var from = "";
        try {
            console.log("Dashboard FROM params ", params)
            from = params.FROM;

            console.log("Dashboard FROM " + from)
            if (from == "NOTIFICATION") {
                var item = params.Item;
                Navigator.navigate(AppNavKeys.NotificationDetail, {
                    Item: item,
                    FROM: "NOTIFICATION"
                })
            }
        } catch (error) {
            console.log("Dashboard FROM ERROR ", error)
        }
    }

    handleBackButtonClick() {
        BackHandler.exitApp()
        return true;
    }

    _retrieveData = async () => {
        try {
            const userData = await AsyncStorage.getItem(AsyncParamsKeys.LoginUserObj);
            console.log("userData ", userData)
            const user_id = (JSON.parse(userData).id);
            const api_key = (JSON.parse(userData).api_key);
            var header = { 'AUTH-TOKEN': api_key }

            this.setState({
                user_id: user_id,
                api_key: api_key,
                header: header,
            })

            this._getUnreadNotificationCount();
            this._getNotificationList(0)

        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    _getUnreadNotificationCount() {
        var body = { "user_id": this.state.user_id }
        this.props.getUnReadNotificationCountAction(body, this.state.header);
    }

    _getNotificationList(type) {

        this.setState({
            type: type,
            notificationList: [],
            isAnySelected: false,
        })

        this.hideMenu();
        var body = { "user_id": this.state.user_id, "page": 1, "type": type }
        this.props.NotificationListAction(body, this.state.header);
    }

    _updateItemList(item = "") {
        try {
            console.log("_updateItemList Item :- " + JSON.stringify(item))
            var array = [...this.state.notificationList];
            array[this.state.ItemFroUpdateIndex] = (item);
            this.setState({
                notificationList: array,
            })
            this._getUnreadNotificationCount();
        } catch (error) {
            console.log("_updateItemList Item error" + error)
        }
    }

    _markAsReadUnRead(type) {
        try {
            this.hideMenu();

            var { header, user_id, notificationList } = this.state
            var notificationList = this.state.notificationList;
            var notificationIds = [];
            if (type == 3) {
                for (var i = 0; i < notificationList.length; i++) {
                    notificationIds.push(notificationList[i].id);
                }
                if (notificationIds.length == 0) {
                    alert("There is no any notification for mark as read")
                    return
                }
            } else {
                for (var i = 0; i < notificationList.length; i++) {
                    if (notificationList[i].isSelected) {
                        notificationIds.push(notificationList[i].id);
                    }
                }
                if (notificationIds.length == 0) {
                    alert("Please select notification for " + ((type == 1) ? "read" : "unread"))
                    return
                }
            }

            //type 1 = Read, 2 = unread and 3 = all read(need to pass in api 1)

            var body = { "notification_id": notificationIds, "emp_id": user_id, "type": (type == 3) ? 1 : type }
            this.setState({ isReadOrUnRead: type })
            this.props.readUnreadNotificationAction(body, header);
        } catch (error) {
            console.log(error)
        }
    }

    _dateToHowManyAgo(stringDate) {
        var currDate = new Date();
        var a = stringDate.split(" ");
        var d = a[0].split("-");
        var t = a[1].split(":");
        var date = new Date(d[0], (d[1] - 1), d[2], t[0], t[1], t[2]);
        var diffMs = currDate.getTime() - date.getTime(); //new Date(stringDate).getTime();
        var sec = diffMs / 1000;
        if (sec < 60)
            return parseInt(sec) + ' second' + (parseInt(sec) > 1 ? 's' : '') + ' ago';
        var min = sec / 60;
        if (min < 60)
            return parseInt(min) + ' minute' + (parseInt(min) > 1 ? 's' : '') + ' ago';
        var h = min / 60;
        if (h < 24)
            return parseInt(h) + ' hour' + (parseInt(h) > 1 ? 's' : '') + ' ago';
        var d = h / 24;
        if (d < 30)
            return parseInt(d) + ' day' + (parseInt(d) > 1 ? 's' : '') + ' ago';
        var m = d / 30;
        if (m < 12)
            return parseInt(m) + ' month' + (parseInt(m) > 1 ? 's' : '') + ' ago';
        var y = m / 12;
        return parseInt(y) + ' year' + (parseInt(y) > 1 ? 's' : '') + ' ago';
    }

    _selectNotificationLongPress(item, index) {

        console.log("_selectNotificationLongPress")
        try {
            var notificationList = this.state.notificationList;
            notificationList[index].isSelected = !item.isSelected;
            this.setState({
                notificationList,
                //momentTime: moment()
            })

            var isAnySelected = false;
            for (var i = 0; i < notificationList.length; i++) {
                if (notificationList[i].isSelected) {
                    isAnySelected = true;
                }
            }
            this.setState({
                isAnySelected,
            })
        } catch (error) {
            console.log("error", error)
        }
    }

    _selectNotificationPress(item, index) {
        try {
            console.log("_selectNotificationPress")

            var isAnySelected = this.state.isAnySelected;
            if (isAnySelected) {
                var notificationList = this.state.notificationList;
                notificationList[index].isSelected = !item.isSelected;
                this.setState({
                    notificationList,
                    //momentTime: moment()
                })
                var isAnySelected = false;
                for (var i = 0; i < notificationList.length; i++) {
                    if (notificationList[i].isSelected) {
                        isAnySelected = true;
                    }
                }
                this.setState({
                    isAnySelected,
                })
            } else {

                this.setState({
                    ItemFroUpdate: item,
                    ItemFroUpdateIndex: index,
                })
                Navigator.navigate(AppNavKeys.NotificationDetail, {
                    _updateItemList: this._updateItemList.bind(this),
                    Item: item
                })
            }
        } catch (error) {
            console.log("error", error)
        }
    }

    // to do arrchive notification
    arrchiveNotification(data) {
        try {
            var { header, user_id } = this.state
            var notificationIds = [];
            notificationIds.push(data.item.id);

            var body = { "notification_id": notificationIds, "user_id": user_id, "type": 2 }
            this.setState({ isArrchiveOrStarted: 1 })
            this.props.starredArchivedNotificationAction(body, header);
        } catch (error) {
            console.log(error)
        }
    }

    // to do stared notification
    stareNotification() {
        try {
            var { header, user_id, notificationList } = this.state
            var notificationList = this.state.notificationList;
            var notificationIds = [];
            for (var i = 0; i < notificationList.length; i++) {
                if (notificationList[i].isSelected) {
                    notificationIds.push(notificationList[i].id);
                }
            }

            var body = { "notification_id": notificationIds, "user_id": user_id, "type": 1 }
            this.setState({ isArrchiveOrStarted: 2 })
            this.props.starredArchivedNotificationAction(body, header);
        } catch (error) {
            console.log(error)
        }
    }

    _onToolMenuItemClick(itemclickNumber) {
        console.log("itemclickNumber " + itemclickNumber);
        if (itemclickNumber == 1) {
            // Start click
            this.stareNotification()
        } else if (itemclickNumber == 2) {
            // Filter click
            this.setState({ itemclickNumber: itemclickNumber }, () => {
                this.showMenu();
            })
        } else if (itemclickNumber == 3) {
            // notification icon click
        } else if (itemclickNumber == 4) {
            // more icon click
            this.setState({ itemclickNumber: itemclickNumber }, () => {
                this.showMenu();
            })
        }
    }

    setMenuRef = ref => {
        this._menu = ref;
    };

    hideMenu = () => {
        this._menu.hide();
    };

    showMenu = () => {
        this._menu.show();
    };

    onRefresh() {

        this.setState({
            notificationList: [],
            isAnySelected: false,
        })

        this._getUnreadNotificationCount();
        this._getNotificationList(this.state.type);
    }

    handleLoadMore() {
        console.log("==========================================================")
        console.log("handleLoadMore")
        console.log("this.state.parPage " + this.state.parPage)
        console.log("lastCallRecordCount " + this.state.lastCallRecordCount)


        if (this.state.parPage > 0 && (this.state.parPage == this.state.lastCallRecordCount)) {
            var pageNumber = this.state.pageNumber + 1;
            this.hideMenu();
            var body = { "user_id": this.state.user_id, "page": pageNumber, "type": this.state.type }
            this.props.NotificationListAction(body, this.state.header);
        }
    }

    render() {
        return (
            <View style={{ backgroundColor: Colors.primary }}>

                {/* Tool bar */}
                <HomeNavigationBar
                    isStartVisible={this.state.isAnySelected}
                    UnReadNotificationCount={this.state.UnReadNotificationCount}
                    onClick={() => { this.props.navigation.openDrawer() }}
                    onToolItemClick={(ItemNumber) => { this._onToolMenuItemClick(ItemNumber) }}
                />

                <View style={styles.mainContainer}>
                    {(this.state.notificationList.length > 0)
                        ? <SwipeListView
                            contentContainerStyle={{
                                paddingBottom: normalize(10),
                                paddingTop: normalize(20),
                            }}
                            useFlatList={true}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this.onRefresh.bind(this)}
                                />
                            }
                            directionalDistanceChangeThreshold={3}
                            leftOpenValue={0}
                            disableLeftSwipe={false}
                            swipeToClosePercent={0}
                            closeOnRowBeginSwipe={true}
                            closeOnRowOpen={true}
                            closeOnScroll={true}
                            rightOpenValue={normalize(-87)}
                            data={this.state.notificationList}
                            previewRowKey={"" + (this.state.notificationList[0].id) + ""}
                            keyExtractor={(item, index) => "" + item.id}
                            extraData={this.state.updateTime}
                            onEndReached={() => this.handleLoadMore()}
                            onEndThreshold={0.01}
                            onEndReachedThreshold={0.01}
                            renderItem={(data, rowMap) => (
                                <TouchableWithoutFeedback
                                    onLongPress={() => this._selectNotificationLongPress(data.item, data.index)}
                                    onPress={() => this._selectNotificationPress(data.item, data.index)}
                                >
                                    <View style={[
                                        (data.item.isSelected)
                                            ? { backgroundColor: Colors.selecteItem }
                                            : { backgroundColor: Colors.white }
                                    ]} >
                                        <View style={styles.rowFront}>
                                            <Text style={styles.rowTimeStyle}>
                                                {(data.item.notify_date != null) ? this._dateToHowManyAgo(data.item.notify_date) : ""}
                                            </Text>
                                            <Text style={[
                                                (data.item.is_read == 1)
                                                    ? [styles.rowTitleStyle, { color: Colors.textSecondary }]
                                                    : styles.rowTitleStyle
                                            ]}>
                                                {(data.item.details != null) ? data.item.details.title : ""}
                                            </Text>
                                        </View>

                                        {(data.item.is_starred == 1)
                                            ? <Image
                                                style={{
                                                    position: 'absolute',
                                                    right: 0, top: -1,
                                                    width: normalize(15), height: normalize(15)
                                                }}
                                                source={Assets.bookmark}
                                            />
                                            : null
                                        }

                                        <View style={{ backgroundColor: Colors.divider, height: normalize(1) }}></View>
                                    </View>
                                </TouchableWithoutFeedback>
                            )}
                            renderHiddenItem={(data, rowMap) => (
                                <View style={styles.rowBack}>
                                    <TouchableOpacity
                                        style={{ alignSelf: "flex-end", width: normalize(84), alignItems: "center" }}
                                        onPress={() => {
                                            rowMap[data.item.id].closeRow();
                                            this.setState({
                                                selectedIndexForDelete: data.index,
                                            });
                                            this.arrchiveNotification(data)
                                        }}
                                    >
                                        <Image
                                            style={{ width: normalize(24), height: normalize(22) }}
                                            source={Assets.archive}
                                        />
                                        <Text style={styles.archiveText}>Archive</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            leftOpenValue={0}
                            rightOpenValue={-90}
                        />
                        : <View style={{ flex: 1, justifyContent: 'center' }}>
                            <TouchableOpacity
                                onPress={() => this.onRefresh()}
                            >
                                <Image
                                    style={{
                                        alignSelf: "center",
                                        width: normalize(50),
                                        height: normalize(50),
                                        margin: normalize(16),
                                        tintColor: Colors.textSecondary
                                    }}
                                    source={Assets.refresh}
                                />
                            </TouchableOpacity>
                            <Text style={styles.noDataAvailable}>{this.state.noNotificationAailable}</Text>
                        </View>
                    }

                </View>
                <View style={{
                    position: 'absolute',
                    right: normalize(10),
                    top: normalize(66),
                }}>
                    {(this.state.itemclickNumber == 2)
                        ? <Menu ref={this.setMenuRef}>
                            <MenuItem onPress={() => this._getNotificationList(0)}
                                style={(this.state.type == 0)
                                    ? { backgroundColor: Colors.primary }
                                    : { backgroundColor: Colors.white }}
                            >All</MenuItem>
                            <MenuDivider />
                            <MenuItem onPress={() => this._getNotificationList(1)}
                                style={(this.state.type == 1)
                                    ? { backgroundColor: Colors.primary }
                                    : { backgroundColor: Colors.white }}
                            >Starred</MenuItem>
                        </Menu>
                        : <Menu ref={this.setMenuRef}>
                            <MenuItem onPress={() => this._markAsReadUnRead(1)}
                            >Mark as read</MenuItem>
                            <MenuDivider />
                            <MenuItem onPress={() => this._markAsReadUnRead(2)}
                            >Mark as unread</MenuItem>
                            <MenuDivider />
                            <MenuItem onPress={() => this._markAsReadUnRead(3)}
                            >Mark all as read</MenuItem>
                        </Menu>}
                </View>
            </View>
        )
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.CommonReducer.isLoading) {
            return
        }
        if (nextProps.NotificationListReducer.message && nextProps.CommonReducer.api_type) {
            alert(nextProps.NotificationListReducer.message);
            return
        }

        switch (nextProps.CommonReducer.api_type) {

            case NOTIFICATION_LIST_FETCH: {
                if (nextProps.NotificationListReducer.resData != null) {
                    var response = JSON.parse(nextProps.NotificationListReducer.resData)
                    console.log("NOTIFICATION_LIST_FETCH ", response)
                    if (response.responseCode == 200 && response.data.notifications.data.length > 0) {
                        var NotifyList = response.data.notifications.data
                        NotifyList.forEach(function (obj) {
                            obj.isSelected = false;
                        });

                        if (this.state.notificationList.length == 0) {
                            this.setState({
                                notificationList: NotifyList,
                                refreshing: false,
                                isAnySelected: false,
                            })
                        } else {
                            var newnotificationList = this.state.notificationList.concat(NotifyList);
                            this.setState({
                                notificationList: newnotificationList,
                                refreshing: false,
                            })
                        }
                        this.setState({
                            parPage: response.data.notifications.per_page,
                            lastCallRecordCount: NotifyList.length,
                            pageNumber: response.data.notifications.current_page,
                        })
                    } else {
                        this.setState({
                            notificationList: [],
                            noNotificationAailable: "No notification available",
                            refreshing: false,
                            isAnySelected: false,
                        })
                    }
                }
                break;
            }

            case UNREAD_NOTIFICATION_COUNT_FETCH: {
                if (nextProps.NotificationListReducer.resDataCount != null) {
                    var response = JSON.parse(nextProps.NotificationListReducer.resDataCount)
                    console.log("UNREAD_NOTIFICATION_COUNT_FETCH " + JSON.stringify(response))
                    try {
                        var count = parseInt(response.data.count);
                        this.setState({
                            UnReadNotificationCount: count,
                        })
                    } catch (error) { }
                }
                break;
            }
            case STAREDARCHIVED_NOTIFICATION_FETCH: {
                if (nextProps.NotificationListReducer.resData1 != null) {
                    var response = JSON.parse(nextProps.NotificationListReducer.resData1)
                    console.log("STAREDARCHIVED_NOTIFICATION_FETCH ", response)

                    if (this.state.isArrchiveOrStarted == 1) {
                        var array = [...this.state.notificationList];
                        array.splice(this.state.selectedIndexForDelete, 1);
                        this.setState({
                            notificationList: array,
                            noNotificationAailable: "No notification available"
                        });
                    } else {

                        var array = this.state.notificationList;
                        console.log("array[i].isSelected ", array)
                        for (var i = 0; i < array.length; i++) {
                            if (array[i].isSelected) {
                                if (array[i].is_starred == 1) {
                                    array[i].is_starred = 0;
                                    array[i].isSelected = false;
                                } else {
                                    array[i].is_starred = 1;
                                    array[i].isSelected = false;
                                }

                            }
                        }
                        this.setState({
                            notificationList: array,
                            isAnySelected: false,
                        });
                    }
                }
                break;
            }

            case READUNREAD_NOTIFICATION_FETCH: {
                if (nextProps.NotificationListReducer.resData1 != null) {
                    var response = JSON.parse(nextProps.NotificationListReducer.resData1)

                    console.log("READUNREAD_NOTIFICATION_FETCH ", response)

                    var array = this.state.notificationList;
                    for (var i = 0; i < array.length; i++) {
                        if (this.state.isReadOrUnRead == 3) {
                            array[i].is_read = 1;
                            array[i].isSelected = false;
                        } else {
                            if (array[i].isSelected && array[i].details != null) {
                                if (this.state.isReadOrUnRead == 1) {
                                    //read
                                    array[i].is_read = 1;
                                    array[i].isSelected = false;
                                } else {
                                    //unread
                                    array[i].is_read = 0;
                                    array[i].isSelected = false;
                                }
                            }
                        }
                    }
                    this.setState({
                        notificationList: array,
                        isAnySelected: false,
                    });
                    this._getUnreadNotificationCount();

                }
                break;
            }

            case NOTIFICATION_REFRESH: {
                console.log("Notify to dhasboard screen of notification count33")
                this._getUnreadNotificationCount();
                break;
            }
        }
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        NotificationListAction: NotificationListAction,
        getUnReadNotificationCountAction: getUnReadNotificationCountAction,
        starredArchivedNotificationAction: starredArchivedNotificationAction,
        readUnreadNotificationAction: readUnreadNotificationAction,
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        NotificationListReducer: state.NotificationListReducer,
        CommonReducer: state.CommonReducer,
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(Dashboard);