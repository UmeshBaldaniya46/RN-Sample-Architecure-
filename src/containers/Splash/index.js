import React, { Component } from 'react';
import { SafeAreaView, Image, AsyncStorage, Platform } from 'react-native';
import { Assets } from '../../assets/Icons';
import AppNavKeys from '../../common/AppNavKeys';
import Navigator from '../../common/Navigator';
import { AsyncParamsKeys } from '../../common/Constants';

let timeout = 0;
if (Platform.OS == "android") {
  timeout = 1000;
} else {
  timeout = 1000;
}

export default class Splash extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    console.log('exe');
    try {
      setTimeout(() => {
        this._retrieveData();
      }, timeout);
    } catch (error) {
    }
  }

  _retrieveData = async () => {
    try {
      const isLogin = await AsyncStorage.getItem(AsyncParamsKeys.isUserLoggin);
      console.log("isLogin " + isLogin)
      if (isLogin !== null && JSON.parse(isLogin) == "true") {

        var params = this.props.navigation.state.params;
        var from = "";
        try {
          console.log("Splash FROM params ", params)
          from = params.FROM;
          console.log("Splash FROM " + from)
          if (from == "NOTIFICATION") {
            var item = params.Item;
            Navigator.navigate(AppNavKeys.NotificationDetail, {
              Item: item,
              FROM: "NOTIFICATION"
            })
          } else {
            Navigator.navigate(AppNavKeys.Dashboard)
            console.log('isLogin ', isLogin);
          }
        } catch (error) {
          console.log("Splash FROM ERROR ", error)
          Navigator.navigate(AppNavKeys.Dashboard)
          console.log('isLogin ', isLogin);
        }
      } else {
        Navigator.navigate(AppNavKeys.Login)
        console.log('isLogin ', isLogin)
      }
    } catch (error) {
      Navigator.navigate(AppNavKeys.Login)
    }
  }

  render() {
    return (
      <SafeAreaView style={{
        flex: 1, justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}>
        <Image
          style={{ width: "60%" }}
          source={Assets.slpash_logo}
          resizeMode="contain"
        />
      </SafeAreaView>
    )
  }
}