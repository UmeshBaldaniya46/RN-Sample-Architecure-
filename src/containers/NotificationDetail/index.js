import React, { Component } from 'react';
import {
    View, Image, TouchableOpacity, Text, TextInput, AsyncStorage,
    BackHandler, Linking, ScrollView, Platform, KeyboardAvoidingView
} from 'react-native';
import { Header } from "react-navigation-stack";
import { connect } from 'react-redux';
import Navigator from '../../common/Navigator';
import AppNavKeys from '../../common/AppNavKeys';
import { bindActionCreators } from 'redux';
import Dialog from 'react-native-popup-dialog';
import { AsyncParamsKeys } from '../../common/Constants';
import { normalize } from '../../common/Normalize';
import { Assets } from '../../assets/Icons';
import { styles } from './styles';
import Colors from '../../common/Colors';
import Fonts from '../../assets/Fonts';

import {
    NotificationDetailsAction,
    sendNotificationResponseAction
} from '../../store/actions/NotificationDetailsAction';

import {
    NOTIFICATION_DETAILS_FETCH, NOTIFICATION_SEND_RESPONSE_FETCH,
} from '../../common/StoreActionTypes';



class NotificationDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',

            type: 0,
            notify_date: "",
            title: "",
            details: "",
            link_header: "",
            link: "",

            selectedItem: "",
            isVisibleOptionDialog: false,
            options: [],

            isStarred: 0,
            isResponsed: 0,

            isVisibleResponseDialog: false,
            response: '',
        };

        this._retrieveData();
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this)
    }

    async componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {

        if (this.state.isVisibleResponseDialog || this.state.isVisibleOptionDialog) {
            this.setState({
                isVisibleResponseDialog: false,
                isVisibleOptionDialog: false
            })
            return true;
        } else {
            var asd = this.props.navigation.state.params;
            var from = "";
            try {
                from = asd.FROM;
            } catch (error) {
                from = ""
            }
            console.log("FROM " + from)
            if (from == "NOTIFICATION") {
                //From notification
                Navigator.stackReset(AppNavKeys.Home)
                return true;
            } else if (from == "ARCHIVE") {
                Navigator.goBack();
                return true;
            } else {
                var item = asd.Item;
                item.is_read = 1;
                asd._updateItemList(item);
                Navigator.goBack();
                return true;
            }
        }
    }

    _retrieveData = async () => {
        try {
            const userData = await AsyncStorage.getItem(AsyncParamsKeys.LoginUserObj);
            console.log("userData ", userData)
            const user_id = (JSON.parse(userData).id);
            const first_name = (JSON.parse(userData).first_name);
            const last_name = (JSON.parse(userData).last_name);
            const api_key = (JSON.parse(userData).api_key);
            var header = { 'AUTH-TOKEN': api_key }

            this.setState({
                user_id: user_id,
                first_name: first_name,
                last_name: last_name,
                api_key: api_key,
                header: header,
            })

            this._getNotificationDetails()

        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    _getNotificationDetails() {

        var Item = this.props.navigation.state.params.Item;
        var notificationId = Item.notification_id;

        var body = {
            "emp_id": this.state.user_id,
            "notification_id": notificationId
        }
        this.props.NotificationDetailsAction(body, this.state.header);
    }

    handleLinkClick = () => {
        Linking.canOpenURL(this.state.link).then(supported => {
            if (supported) {
                Linking.openURL(this.state.link);
            } else {
                console.log("Don't know how to open URI: " + this.state.link);
            }
        });
    };

    _openDialogResoinse() {

        if (this.state.response.length > 0) {
            this.setState({
                isVisibleResponseDialog: true,
            })
        } else {
            alert("Please enter response")
        }
    }

    _sendResoinse() {

        var Item = this.props.navigation.state.params.Item;
        var notificationId = Item.notification_id;

        var body = {
            "user_id": this.state.user_id,
            "notification_id": notificationId,
            "response": this.state.response,
            "type": 1
        }
        this.props.sendNotificationResponseAction(body, this.state.header);
    }

    openOptionSendDialog() {

        if (this.state.selectedItem == "") {
            alert("Please select any option")
        } else {
            this.setState({
                isVisibleOptionDialog: true,
            })
        }
    }

    _sendOptionsResoinse() {

        var Item = this.props.navigation.state.params.Item;
        var notificationId = Item.notification_id;
        try {
            var body = {
                "user_id": this.state.user_id,
                "notification_id": notificationId,
                "response": this.state.selectedItem.id,
                "type": 2
            }
            this.props.sendNotificationResponseAction(body, this.state.header);
        } catch (error) { console.log(error) }
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

    render() {
        return (
            <KeyboardAvoidingView
                keyboardVerticalOffset={Platform.select({ ios: 0, android: Header.HEIGHT + 20 })} behavior={(Platform.OS === 'ios') ? "padding" : null}
                enabled
                style={{
                    backgroundColor: Colors.primary,
                    flex: 1, flexDirection: 'column',
                }}>

                {/* header view */}
                <View style={{
                    flexDirection: "row",
                    width: "100%",
                    backgroundColor: Colors.primary,
                    height: normalize(79),
                    alignItems: "center"
                }}>
                    <TouchableOpacity
                        style={{
                            padding: normalize(20),
                            alignItems: "center"
                        }}
                        onPress={() => { this.handleBackButtonClick() }}>
                        <Image
                            source={Assets.back}
                            style={{ width: normalize(10), height: normalize(18) }}
                        />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <Image
                            source={Assets.logo}
                            style={{
                                width: normalize(165),
                                height: normalize(38),
                            }}
                        />
                    </View>

                    {/* <TouchableOpacity
                        style={{
                            height: normalize(18),
                            width: normalize(18),
                            marginHorizontal: normalize(20),
                            alignItems: "center"
                        }}>
                        <Image
                            source={Assets.notification}
                            style={{
                                height: normalize(18),
                                width: normalize(16),
                            }}
                        />
                    </TouchableOpacity> */}
                </View>

                <ScrollView style={styles.mainContainer}
                    contentContainerStyle={{ paddingBottom: normalize(40) }}
                    keyboardShouldPersistTaps='handled'>

                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        {(this.state.isStarred == 1)
                            ? <Image
                                source={Assets.menu_star}
                                style={{
                                    height: normalize(12),
                                    width: normalize(12),
                                }}
                            />
                            : null
                        }

                        <Text
                            style={[styles.text,
                            {
                                flex: 1,
                                color: Colors.textSecondary,
                                textAlign: 'right',
                                fontSize: normalize(10)
                            }]}>
                            {(this.state.notify_date != "") ? this._dateToHowManyAgo(this.state.notify_date) : ""}
                        </Text>
                    </View>

                    {/* text notification  */}
                    {(this.state.type == 1)
                        ? <View>
                            <Text style={styles.username}>{"Hi " + this.state.first_name + " " + this.state.last_name}</Text>

                            <Text style={[styles.text, { marginTop: normalize(20) }]}>{this.state.title}</Text>
                            <Text style={[styles.text, { marginTop: normalize(6) }]}>{this.state.details}</Text>
                            <Text style={[styles.text, { marginTop: normalize(40) }]}>Thank You.</Text>

                        </View>
                        : null
                    }

                    {/* link notification  */}
                    {(this.state.type == 2)
                        ? <View>
                            <Text style={styles.username}>{"Hi " + this.state.first_name + " " + this.state.last_name}</Text>

                            <Text style={[styles.text, { marginTop: normalize(20) }]}>{this.state.title}</Text>
                            <Text style={[styles.text, { marginTop: normalize(6) }]}>{this.state.details}</Text>
                            <TouchableOpacity
                                onPress={() => this.handleLinkClick()}>
                                <Text style={[styles.text, { marginTop: normalize(6) }]}>
                                    Click <Text style={{
                                        textDecorationLine: 'underline',
                                        fontFamily: Fonts.Bold,
                                        fontSize: normalize(16),
                                        fontWeight: "600",
                                        fontStyle: "normal",
                                        letterSpacing: 0,
                                        textAlign: "left",
                                        color: Colors.primaryDark
                                    }}>{this.state.link_header}</Text> for more information
                        </Text>
                            </TouchableOpacity>
                            <Text style={[styles.text, { marginTop: normalize(40) }]}>Thank You.</Text>

                        </View>
                        : null
                    }

                    {/* response notification  */}
                    {(this.state.type == 3)
                        ? <View>
                            <Text style={styles.username}>{"Hi " + this.state.first_name + " " + this.state.last_name}</Text>

                            <Text style={[styles.text, { marginTop: normalize(20) }]}>{this.state.title}</Text>
                            <Text style={[styles.text, { marginTop: normalize(6) }]}>{this.state.details}</Text>

                            <View style={{
                                marginTop: normalize(20),
                                minHeight: normalize(150),
                                borderColor: Colors.primary,
                                paddingVertical: normalize(5),
                                paddingHorizontal: normalize(8),
                                borderWidth: 2
                            }}>
                                <Text style={{ color: Colors.primary, fontSize: normalize(12) }}>Write here...</Text>
                                <TextInput
                                    style={{

                                        padding: 0,
                                        fontFamily: Fonts.Regular,
                                        fontSize: normalize(16),
                                        fontWeight: "500",
                                        fontStyle: "normal",
                                        letterSpacing: 0,
                                        textAlign: "left",
                                    }}
                                    placeholder="Write here..."
                                    multiline={true}
                                    editable={this.state.isResponsed == 0 ? true : false}
                                    underlineColorAndroid="transparent"
                                    onChangeText={response => this.setState({ response: response })}
                                    value={this.state.response}
                                />
                            </View>

                            {(this.state.isResponsed == 0)
                                ? <TouchableOpacity
                                    style={styles.buttonContainer}
                                    onPress={() => this._openDialogResoinse()}
                                >
                                    <Text style={styles.buttonText}>SEND RESPONSE</Text>
                                </TouchableOpacity>
                                : null}


                            <Text style={[styles.text, { marginTop: normalize(40) }]}>Thank You.</Text>

                        </View>
                        : null
                    }

                    {/* option notification  */}
                    {/* {(this.state.type == 4)
                        ? <View>
                            <Text style={styles.username}>{"Hi " + this.state.first_name + " " + this.state.last_name}</Text>

                            <Text style={[styles.text, { marginTop: normalize(20) }]}>{this.state.title}</Text>
                            <Text style={[styles.text, { marginTop: normalize(6) }]}>{this.state.details}</Text>

                            {
                                this.state.options.map((item, index) => {
                                    return <TouchableOpacity style={{
                                        minHeight: normalize(46),
                                        justifyContent: 'center',
                                        marginTop: normalize(20),
                                        paddingVertical: normalize(6),
                                        paddingHorizontal: normalize(16),
                                        backgroundColor: item == this.state.selectedItem
                                            ? Colors.primaryDark
                                            : Colors.white,
                                        borderColor: Colors.primaryDark,
                                        borderWidth: 1,
                                        borderRadius: normalize(46 / 2),
                                    }} onPress={() => {
                                        (this.state.isResponsed == 0)
                                            ? this.setState({ selectedItem: item })
                                            : ""
                                    }
                                    }>
                                        <Text
                                            style={[
                                                (item != this.state.selectedItem)
                                                    ? {
                                                        fontFamily: "Lato",
                                                        fontSize: 18,
                                                        fontWeight: "500",
                                                        fontStyle: "normal",
                                                        letterSpacing: 0,
                                                        textAlign: "left",
                                                        color: "#2f5a7d"
                                                    }
                                                    : {
                                                        fontFamily: "Lato",
                                                        fontSize: 18,
                                                        fontWeight: "500",
                                                        fontStyle: "normal",
                                                        letterSpacing: 0,
                                                        textAlign: "left",
                                                        color: "#ffffff"
                                                    }]}
                                        >
                                            {item.name}</Text>
                                    </TouchableOpacity>
                                })
                            }{
                                this.state.options.length == 0 ? <Text style={{ textAlign: "center", marginTop: 10, alignSelf: "center" }}>No slots available</Text> : null
                            }

                            {(this.state.isResponsed == 0)
                                ? <TouchableOpacity
                                    style={styles.buttonContainer}
                                    onPress={() =>
                                        this.openOptionSendDialog()
                                    }>
                                    <Text style={styles.buttonText}>SEND RESPONSE</Text>
                                </TouchableOpacity>
                                : null}

                            <Text style={[styles.text, { marginTop: normalize(40) }]}>Thank You.</Text>

                        </View>
                        : null
                    } */}

                </ScrollView>

                {/* Response dialog */}
                <Dialog
                    dialogStyle={styles.loDialog}
                    onTouchOutside={() => this.setState({ isVisibleResponseDialog: false })}
                    visible={this.state.isVisibleResponseDialog}>
                    <View style={styles.loContainer}>
                        <Text style={styles.loEnterPassText}>Are you sure you want to send response?</Text>
                        <Text style={styles.loYuorResponseTest}>Your Response: </Text>
                        <Text style={[styles.loYuorResponseTest, { color: Colors.textSecondary, marginTop: 2 }]}>
                            {this.state.response}</Text>
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <TouchableOpacity
                                style={styles.loSend}
                                onPress={() => {
                                    this.setState({ isVisibleResponseDialog: false })
                                }}>
                                <Text style={styles.loSendText}>EDIT</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.loSend, { backgroundColor: Colors.orange, }]}
                                onPress={() => {
                                    this.setState({ isVisibleResponseDialog: false })
                                    this._sendResoinse();
                                }}>
                                <Text style={styles.loSendText}>SEND</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Dialog>

                {/* options dialog */}
                <Dialog
                    dialogStyle={styles.loDialog}
                    onTouchOutside={() => this.setState({ isVisibleOptionDialog: false })}
                    visible={this.state.isVisibleOptionDialog}>
                    <View style={styles.loContainer}>
                        <Text style={styles.loEnterPassText}>Are you sure you want to send response?</Text>
                        <Text style={styles.loYuorResponseTest}>Your Response: </Text>
                        <Text style={[styles.loYuorResponseTest, { color: Colors.textSecondary, marginTop: 2 }]}>
                            {this.state.selectedItem.name}</Text>
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <TouchableOpacity
                                style={styles.loSend}
                                onPress={() => {
                                    this.setState({ isVisibleOptionDialog: false })
                                }}>
                                <Text style={styles.loSendText}>EDIT</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.loSend, { backgroundColor: Colors.orange, }]}
                                onPress={() => {
                                    this.setState({ isVisibleOptionDialog: false })
                                    this._sendOptionsResoinse();
                                }}>
                                <Text style={styles.loSendText}>SEND</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Dialog>

            </KeyboardAvoidingView>
        )
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.CommonReducer.isLoading) {
            return
        }

        if (nextProps.NotificationDetailsReducer.message && nextProps.CommonReducer.api_type) {
            alert(nextProps.NotificationDetailsReducer.message);
            return
        }

        switch (nextProps.CommonReducer.api_type) {

            case NOTIFICATION_DETAILS_FETCH: {
                if (nextProps.NotificationDetailsReducer.resData != null) {
                    var response = JSON.parse(nextProps.NotificationDetailsReducer.resData)
                    console.log("NOTIFICATION_DETAILS_FETCH ", response)
                    var NotificationDetails = response.data.notifications

                    if (NotificationDetails.details != null) {
                        var notify_date = NotificationDetails.notify_date;
                        var title = NotificationDetails.details.title;

                        // 1=normal, 2=Link, 3=response and 4=choiece 
                        var type = NotificationDetails.details.type;
                        var details = NotificationDetails.details.details;

                        var link_header = NotificationDetails.details.link_header;
                        var link = NotificationDetails.details.link;
                        var options = NotificationDetails.details.options;
                        var is_starred = NotificationDetails.is_starred;

                        var response = "";
                        var selectedItem = "";

                        if (NotificationDetails.details.response.length > 0) {
                            response = NotificationDetails.details.response[0].response;
                        }

                        if (type == 3) {

                        } else if (type == 4) {

                            if (response.length > 0) {
                                for (var i = 0; i < options.length; i++) {
                                    if (options[i].id == response) {
                                        selectedItem = options[i];
                                    }
                                }

                            }
                        }
                        var isResponsed = NotificationDetails.details.response.length > 0 ? 1 : 0;

                        this.setState({
                            type: type,
                            notify_date: notify_date,
                            title: title,
                            details: details,
                            link_header: link_header,
                            link: link,
                            options: options,
                            response: response,
                            selectedItem: selectedItem,

                            isResponsed: isResponsed,
                            isStarred: is_starred,

                        })
                    }
                }
                break;
            }
            case NOTIFICATION_SEND_RESPONSE_FETCH: {
                if (nextProps.NotificationDetailsReducer.resData != null) {
                    var response = JSON.parse(nextProps.NotificationDetailsReducer.resData)
                    console.log("NOTIFICATION_DETAILS_FETCH ", response)
                    this.handleBackButtonClick();
                }
                break;
            }

        }
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        NotificationDetailsAction: NotificationDetailsAction,
        sendNotificationResponseAction: sendNotificationResponseAction,
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        NotificationDetailsReducer: state.NotificationDetailsReducer,
        CommonReducer: state.CommonReducer,
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(NotificationDetail);