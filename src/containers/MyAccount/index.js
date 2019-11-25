import React, { Component } from 'react';
import { View, Text, Image, AsyncStorage } from 'react-native'
import { AsyncParamsKeys } from '../../common/Constants';
import Colors from '../../common/Colors';
import { TouchableOpacity } from 'react-native';
import Navigator from '../../common/Navigator';
import { styles } from './styles';
import { normalize } from '../../common/Normalize';
import { Assets } from '../../assets/Icons';

export default class MyAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            profile_pic: "",
            email: "",
            phone: "",
            emp_departmentList: "",
        };

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
            const email = (JSON.parse(userData).email);
            const phone = (JSON.parse(userData).phone);
            var emp_department = (JSON.parse(userData).emp_department);
            var emp_departmentList = "";
            for (var i = 0; i < emp_department.length; i++) {
                if (emp_departmentList == "") {
                    emp_departmentList = emp_department[i].department.name
                } else {
                    emp_departmentList = emp_departmentList + "\n" + emp_department[i].department.name
                }

            }

            const api_key = (JSON.parse(userData).api_key);
            var header = { 'AUTH-TOKEN': api_key }

            this.setState({
                user_id: user_id,
                first_name: first_name,
                last_name: last_name,
                profile_pic: profile_pic,
                email: email,
                phone: phone,
                emp_departmentList: emp_departmentList,
                api_key: api_key,
                header: header,
            })

        } catch (error) {
            console.log(error)
            alert(error)
        }
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.primary }}>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity
                        style={{
                            padding: normalize(20),
                            alignItems: "center",
                        }}
                        onPress={() => { Navigator.goBack() }}>
                        <Image
                            source={Assets.back}
                            style={{ width: normalize(12), height: normalize(20) }}
                        />
                    </TouchableOpacity>
                    <Text style={styles.account}>My Account</Text>
                </View>

                <View style={styles.mainContainer}>

                    {(this.state.profile_pic == "" || this.state.profile_pic == null)
                        ? <Image
                            style={styles.profile}
                            source={Assets.profile}
                        />
                        : <Image style={[styles.profile]}
                            source={{ uri: this.state.profile_pic }} />
                    }

                    <Text style={styles.name}>{this.state.first_name + " " + this.state.last_name}</Text>

                    <View style={styles.itemContainer}>
                        <Text style={styles.label}>Username</Text>
                        <Text style={styles.value}>{this.state.first_name + "" + this.state.last_name}</Text>
                    </View>

                    <View style={styles.itemContainer}>
                        <Text style={styles.label}>Email Id</Text>
                        <Text style={styles.value}>{this.state.email}</Text>
                    </View>

                    <View style={styles.itemContainer}>
                        <Text style={styles.label}>Phone Number</Text>
                        <Text style={styles.value}>{this.state.phone}</Text>
                    </View>

                    <View style={styles.itemContainer}>
                        <Text style={styles.label}>Department</Text>
                        <View>
                            <Text style={styles.value}>{this.state.emp_departmentList}</Text>
                        </View>
                    </View>

                </View>
            </View>
        )
    }
}