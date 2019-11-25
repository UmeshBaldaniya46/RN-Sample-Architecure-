import React, { Component } from 'react';
import {
    View, Text, Image, TouchableOpacity, TouchableWithoutFeedback,
    BackHandler, AsyncStorage, FlatList
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Navigator from '../../common/Navigator';
import { styles } from './styles';
import Colors from '../../common/Colors';
import { normalize } from '../../common/Normalize';
import { Assets } from '../../assets/Icons';
import { AsyncParamsKeys } from '../../common/Constants';

import {
    ArchiveNotificationsAction,
} from '../../store/actions/ArchiveNotificationsAction';
import {
    ARCHIVE_NOTIFICATION_FETCH,
} from '../../common/StoreActionTypes';
import AppNavKeys from '../../common/AppNavKeys';


class ArchiveNotifications extends Component {

    constructor(props) {
        super(props);
        this.state = {
            itemclickNumber: 0,
            UnReadNotificationCount: 0,
            isAnySelected: false,
            noNotificationAailable: "",
            notificationList: [],

            pageNumber: 1,
            parPage: 0,
            lastCallRecordCount: 0,
            updateTime: "",
        };

        this.handleBackButtonClick = this.handleBackButtonClick.bind(this)
    }

    async componentDidMount() {
        this._retrieveData();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        Navigator.goBack();
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

            this._getNotificationList()

        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    _getNotificationList() {
        var body = { "user_id": this.state.user_id, "page": 1 }
        this.props.ArchiveNotificationsAction(body, this.state.header);
    }

    _dateToHowManyAgo(stringDate) {
        var currDate = new Date();
        var diffMs = currDate.getTime() - new Date(stringDate).getTime();
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


    _selectNotificationPress(item, index) {
        try {

            Navigator.navigate(AppNavKeys.NotificationDetail, {
                Item: item,
                FROM: "ARCHIVE",
            })
        } catch (error) {
            console.log("error", error)
        }
    }


    handleLoadMore() {
        console.log("==========================================================")
        console.log("handleLoadMore")
        console.log("this.state.parPage " + this.state.parPage)
        console.log("lastCallRecordCount " + this.state.lastCallRecordCount)

        if (this.state.parPage > 0 && (this.state.parPage == this.state.lastCallRecordCount)) {
            var pageNumber = this.state.pageNumber + 1;
            var body = { "user_id": this.state.user_id, "page": pageNumber }
            this.props.ArchiveNotificationsAction(body, this.state.header);
        }
    }


    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.primary }}>

                {/* header view */}
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity
                        style={{
                            padding: normalize(20),
                            alignItems: "center",
                        }}
                        onPress={() => { this.handleBackButtonClick() }}>
                        <Image
                            source={Assets.back}
                            style={{ width: normalize(12), height: normalize(20) }}
                        />
                    </TouchableOpacity>
                    <Text style={styles.account}>Archived Notification</Text>
                </View>

                <View style={styles.mainContainer}>
                    {(this.state.notificationList.length > 0)
                        ? <FlatList
                            contentContainerStyle={{
                                paddingTop: normalize(20),
                            }}
                            data={this.state.notificationList}
                            keyExtractor={(item, index) => "" + item.id}
                            extraData={this.state.updateTime}
                            onEndReached={() => this.handleLoadMore()}
                            onEndThreshold={0.01}
                            onEndReachedThreshold={0.01}
                            renderItem={(data, rowMap) => (
                                <TouchableOpacity
                                    onPress={() => this._selectNotificationPress(data.item, data.index)}
                                >
                                    <View style={[{ backgroundColor: Colors.white }]}>
                                        <View style={styles.rowFront}>
                                            <Text style={styles.rowTimeStyle}>
                                                {(data.item.notify_date != null) ? this._dateToHowManyAgo(data.item.notify_date) : ""}
                                            </Text>
                                            <Text style={[styles.rowTitleStyle]}>
                                                {data.item.details.title}
                                            </Text>
                                            <Text
                                                numberOfLines={2}
                                                style={[styles.rowDescriptionStyle]}>
                                                {data.item.details.details}
                                            </Text>
                                        </View>
                                        <View style={{ backgroundColor: Colors.divider, height: normalize(1) }}></View>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                        : <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={styles.noDataAvailable}>{this.state.noNotificationAailable}</Text>
                        </View>
                    }
                </View>
            </View>
        )
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.CommonReducer.isLoading) {
            return
        }
        if (nextProps.ArchiveNotificationsReducer.message && nextProps.CommonReducer.api_type) {
            alert(nextProps.ArchiveNotificationsReducer.message);
            return
        }

        switch (nextProps.CommonReducer.api_type) {

            case ARCHIVE_NOTIFICATION_FETCH: {
                if (nextProps.ArchiveNotificationsReducer.resData != null) {
                    var response = JSON.parse(nextProps.ArchiveNotificationsReducer.resData)
                    if (response.responseCode == 200 && response.data.notifications.data.length > 0) {
                        console.log("ARCHIVE_NOTIFICATION_FETCH ", response)

                        var NotifyList = response.data.notifications.data
                        NotifyList.forEach(function (obj) {
                            obj.isSelected = false;
                        });

                        if (this.state.notificationList.length == 0) {
                            this.setState({
                                notificationList: NotifyList,
                            })
                        } else {
                            var newnotificationList = this.state.notificationList.concat(NotifyList);
                            this.setState({
                                notificationList: newnotificationList,
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
                            noNotificationAailable: "No achive notification available",
                        })
                    }
                }
                break;
            }

        }
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        ArchiveNotificationsAction: ArchiveNotificationsAction,
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        ArchiveNotificationsReducer: state.ArchiveNotificationsReducer,
        CommonReducer: state.CommonReducer,
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(ArchiveNotifications);