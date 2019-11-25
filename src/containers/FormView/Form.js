import React, { Component } from 'react';
import { KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Header } from "react-navigation-stack";

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.select({ ios: 0, android: Header.HEIGHT + 20 })}
                behavior={(Platform.OS === 'ios') ? "padding" : null}
                enabled
                contentContainerStyle={{ flex: 1, }}
                >
                {/* <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps='handled'
                    enabled
                    style={{ flex: 1 }}
                    contentContainerStyle={{ flexGrow: 1 }}>
                    {
                        this.props.children
                    }
                </ScrollView> */}
            </KeyboardAvoidingView>

        );
    }
}
