import React, { Component } from 'react';
import { View, Image } from 'react-native'
import Colors from '../../common/Colors';
import { Assets } from '../../assets/Icons';
import { normalize } from '../../common/Normalize';

export default class NavigationBar extends Component {
    render() {
        return (
            <View style={{ flexDirection: 'row', width: '100%', backgroundColor: Colors.navBarColor, height: normalize(79) }}>
                <Image
                    source={Assets.logo}
                    style={{ height: normalize(38), width: normalize(174), alignSelf: 'center', marginLeft: 10 }}
                    resizeMode='contain'
                />
            </View>
        )
    }
}
