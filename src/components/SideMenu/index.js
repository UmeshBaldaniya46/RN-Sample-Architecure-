import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, AsyncStorage } from 'react-native'
import Navigator from '../../common/Navigator';
import { AsyncParamsKeys } from '../../common/Constants';
import AppNavKeys from '../../common/AppNavKeys';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { normalize } from '../../common/Normalize';
import styles from './styles';
import { Assets } from '../../assets/Icons';
import Colors from '../../common/Colors';

import { LogoutAction } from '../../store/actions/LogoutAction';
import { LOGOUT_FETCH, } from '../../common/StoreActionTypes';

class SideMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            profile_pic: '',
        };
    }

    componentDidMount() {
        this._retrieveData();
    }

    _retrieveData = async () => {
        try {
            const userData = await AsyncStorage.getItem(AsyncParamsKeys.LoginUserObj);
            console.log("userData ", userData)
            const user_id = (JSON.parse(userData).id);
            const first_name = (JSON.parse(userData).first_name);
            const last_name = (JSON.parse(userData).last_name);
            const profile_pic = (JSON.parse(userData).profile_pic);
            const api_key = (JSON.parse(userData).api_key);
            var header = { 'AUTH-TOKEN': api_key }

            this.setState({
                user_id: user_id,
                first_name: first_name,
                last_name: last_name,
                profile_pic: profile_pic,
                api_key: api_key,
                header: header,
            })

        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    navigateToScreen = (route) => () => {
        Navigator.navigate(route)
    }

    _logoutAlert = async () => {

        Alert.alert(
            'Sample App', 'Are you sure you want to logout?',
            [{
                text: 'No',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'YES', onPress: () => {
                    console.log('OK Pressed')
                    var body = {
                        "user_id": this.state.user_id
                    }
                    this.props.LogoutAction(body, this.state.header);
                }
            },], { cancelable: false },
        );

    }

    _logout = async () => {
        try {
            await AsyncStorage.removeItem(AsyncParamsKeys.isUserLoggin);
            await AsyncStorage.removeItem(AsyncParamsKeys.LoginUserObj);
            Navigator.navigate(AppNavKeys.Login)
        } catch (error) {
            console.log("Error saving data " + error);
        }
    }

    render() {
        return (
            <View
                style={styles.mainContainer}>
                {/* Outer view for shadow and other stuff */}
                {/* ContainerView for Profile Image and Name */}
                <View style={{ flexDirection: "row" }}>

                    {(this.state.profile_pic == "" || this.state.profile_pic == null)
                        ? <Image
                            source={Assets.profile}
                            style={styles.profileImage}
                        />
                        : <Image style={[styles.profileImage]}
                            source={{ uri: this.state.profile_pic }} />
                    }
                    <View style={styles.userNameContainer}>
                        <Text style={styles.userNameText}>{this.state.first_name + " " + this.state.last_name}</Text>
                    </View>
                </View>

                <View style={{
                    backgroundColor: Colors.divider,
                    height: normalize(2),
                    marginHorizontal: normalize(16),
                    marginVertical: normalize(30)
                }}></View>
                {/*ContainerView for Menu Items  */}
                <View>

                    {/* Touchable Row */}
                    <TouchableOpacity style={styles.touchableRow}
                        onPress={() => {
                            Navigator.navigate(AppNavKeys.MyAccount)
                            this.props.navigation.closeDrawer()
                        }}>
                        <View style={{ width: normalize(24), height: normalize(24), alignItems: "center", justifyContent: "center" }}>
                            <Image
                                source={Assets.user}
                                style={{ width: normalize(18.3), height: normalize(24) }} />
                        </View>
                        <Text style={styles.menuTitle}>My Account</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={[styles.touchableRow, { marginVertical: normalize(30) }]}
                        onPress={() => {
                            Navigator.navigate(AppNavKeys.ArchiveNotifications)
                            this.props.navigation.closeDrawer()
                        }}
                    >
                        <View style={{ width: normalize(24), height: normalize(24), alignItems: "center", justifyContent: "center" }}>
                            <Image
                                source={Assets.archive}
                                style={{
                                    height: normalize(22),
                                    width: normalize(24)
                                }} />
                        </View>
                        <Text style={styles.menuTitle}>Archived Notification</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.touchableRow}
                        onPress={() => {
                            this.props.navigation.closeDrawer()
                            this._logoutAlert()
                        }}>
                        <View style={{ width: normalize(24), height: normalize(24), alignItems: "center", justifyContent: "center" }}>
                            <Image
                                source={Assets.logout}
                                style={{
                                    height: normalize(24),
                                    width: normalize(24)
                                }} />
                        </View>
                        <Text style={styles.menuTitle}>Logout</Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
    componentWillReceiveProps(nextProps) {

        if (nextProps.CommonReducer.isLoading) {
            return
        }

        if (nextProps.LogoutReducer.message && nextProps.CommonReducer.api_type) {
            alert(nextProps.LogoutReducer.message);
            return
        }

        switch (nextProps.CommonReducer.api_type) {

            case LOGOUT_FETCH: {
                if (nextProps.LogoutReducer.resData != null) {
                    var response = JSON.parse(nextProps.LogoutReducer.resData)
                    console.log("NOTIFICATION_DETAILS_FETCH ", response)
                    this._logout();
                }
                break;
            }
        }
    }
}

//export default SideMenu;

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        LogoutAction: LogoutAction,
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        LogoutReducer: state.LogoutReducer,
        CommonReducer: state.CommonReducer,
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(SideMenu);