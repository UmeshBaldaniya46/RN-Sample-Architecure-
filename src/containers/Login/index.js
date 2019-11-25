import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, TextInput, ScrollView, AsyncStorage, Platform } from 'react-native'
import Colors from '../../common/Colors';
import { TouchableOpacity } from 'react-native';
import NavigationBar from '../../components/NavigationBar/NavigationView';
import Navigator from '../../common/Navigator';
import AppNavKeys from '../../common/AppNavKeys';
import { styles } from './styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import firebase from 'react-native-firebase';
import { AsyncParamsKeys } from '../../common/Constants';

import { FetchLoginAction } from '../../store/actions/LoginAction';
import { LOGIN_FETCH } from '../../common/StoreActionTypes';

class Login extends Component {

    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            fcmToken: "",
        };
    }

    async componentDidMount() {
        const fcmToken = await firebase.messaging().getToken();
        console.log("====================== fcmToken Login ========================")
        console.log(fcmToken)
        this.setState({
            fcmToken: fcmToken,
        })
    }

    _doLogin() {

        Navigator.navigate(AppNavKeys.Home)
        return;

        const { code, fcmToken } = this.state;

        if (code.trim() == "") {
            alert("Please enter code")
        } else {
            var request = {
                "code": code,
                "device_id": fcmToken,
                "device_type": Platform.OS == "ios" ? 2 : 1
            }
            this.props.FetchLoginAction(request);
        }
    }

    storeData = async (loginData) => {
        try {
            await AsyncStorage.setItem(AsyncParamsKeys.isUserLoggin, JSON.stringify('true'));
            await AsyncStorage.setItem(AsyncParamsKeys.LoginUserObj, JSON.stringify(loginData));
            Navigator.navigate(AppNavKeys.Home)
        } catch (error) {
            console.log("Error saving data " + error);
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.primary }}>
                <NavigationBar />
                <KeyboardAvoidingView>
                    <ScrollView>
                        <View style={styles.mainContainer}>
                            <Text style={styles.welcome}>Welcome to React Natvie Sample App</Text>
                            <Text style={styles.codeText}>Please enter your Unique Code</Text>
                            <TextInput
                                style={styles.codeInput}
                                secureTextEntry={true}
                                onChangeText={text => this.setState({ code: text })}
                                placeholder="Enter Code" />
                            <TouchableOpacity
                                style={styles.loginContainer}
                                onPress={() => this._doLogin()}>
                                <Text style={styles.loginText}>LOGIN</Text>
                            </TouchableOpacity>
                            <Text style={styles.contactText}>If you don't have code contact your Administrator</Text>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        )
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.CommonReducer.isLoading) {
            return
        }
        if (nextProps.LoginReducer.message && nextProps.CommonReducer.api_type) {
            alert(nextProps.LoginReducer.message);
            return
        }
        switch (nextProps.CommonReducer.api_type) {
            case LOGIN_FETCH: {
                if (nextProps.LoginReducer.resData != null) {
                    var response = JSON.parse(nextProps.LoginReducer.resData)
                    console.log("data1 ", response.data.users)
                    this.storeData(response.data.user)
                }
                break;
            }
        }
    }

}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        FetchLoginAction: FetchLoginAction,
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        LoginReducer: state.LoginReducer,
        CommonReducer: state.CommonReducer,
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(Login);