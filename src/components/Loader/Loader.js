import React, { Component } from "react";
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import Loading from "react-native-whc-loading";
import AppNavKeys from "../../common/AppNavKeys";
import { Assets } from "../../common/AppAssets";
import Navigator from "../../common/Navigator";

class Loader extends Component {
    render() {
        const { isLoading } = this.props.CommonReducer;
        return (
            <Loading ref="loading"
                loading={isLoading}
                image={Assets.loader}
                size={100}
                imageSize={80}
            />
        );
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.CommonReducer.isLoading) {
            if (nextProps.CommonReducer.fetchFailed == true) {
                alert(nextProps.CommonReducer.message)
            } else if (nextProps.CommonReducer.unauthorised == true) {
                Alert.alert(null, nextProps.CommonReducer.message, [
                    {
                        text: "ok",
                        onPress: () => Navigator.navigate(AppNavKeys.Login)
                    }
                ])
            }
        }
    }
}

const mapStateToProps = state => {
    return {
        CommonReducer: state.CommonReducer
    }
}

export default connect(mapStateToProps)(Loader)
