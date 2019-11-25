import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text, } from 'react-native'
import Colors from '../../common/Colors';
import { Assets } from '../../assets/Icons';
import { normalize } from '../../common/Normalize';

export default class HomeNavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const {
            isStartVisible,
            UnReadNotificationCount,
            onClick = () => { },
            onToolItemClick = () => { }
        } = this.props
        return (
            <View
                style={{
                    flexDirection: "row",
                    width: "100%",
                    backgroundColor: Colors.primary,
                    height: normalize(79),
                    alignItems: "center"
                }}>
                <TouchableOpacity
                    style={{
                        paddingHorizontal: normalize(15),
                        height: '100%',
                        justifyContent: 'center',
                    }}
                    onPress={onClick}>
                    <Image
                        source={Assets.menu}
                        style={{
                            height: normalize(14),
                            width: normalize(18),
                        }}
                    />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <Image
                        source={Assets.slpash_logo}
                        style={{
                            width: normalize(46),
                            height: normalize(46),
                        }}
                    />
                </View>
                {(isStartVisible)
                    ? <TouchableOpacity
                        onPress={() => onToolItemClick(1)}
                        style={{
                            height: "100%",
                            justifyContent: 'center',
                            width: normalize(32),
                            alignItems: "center",
                        }}>
                        <Image
                            source={Assets.menu_star}
                            style={{
                                height: normalize(18),
                                width: normalize(18),
                            }}
                        />
                    </TouchableOpacity>
                    : null
                }

                <TouchableOpacity
                    onPress={() => onToolItemClick(2)}
                    style={{
                        height: "100%",
                        justifyContent: 'center',
                        width: normalize(32),
                        alignItems: "center",
                    }}>
                    <Image
                        source={Assets.filter}
                        style={{
                            height: normalize(18),
                            width: normalize(17),
                        }}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => onToolItemClick(3)}
                    style={{
                        height: "100%",
                        justifyContent: 'center',
                        width: normalize(32),
                        alignItems: "center",
                    }}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        width: normalize(32),
                        alignItems: "center",
                    }}>
                        <Image
                            source={Assets.notification}
                            style={{
                                height: normalize(18),
                                width: normalize(18),
                            }}
                        />
                        {(UnReadNotificationCount != 0)
                            ? <View style={{
                                height: 14,
                                width: 14,
                                top: 28,
                                right: 2,
                                borderRadius: 7,
                                justifyContent: 'center',
                                position: 'absolute',
                                backgroundColor: "red"
                            }}>
                                <Text style={{
                                    fontSize: 9,
                                    color: '#fff',
                                    textAlign: 'center',
                                    textAlignVertical: 'center',
                                }}>{UnReadNotificationCount}</Text>
                            </View>
                            : null
                        }
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => onToolItemClick(4)}
                    style={{
                        height: "100%",
                        justifyContent: 'center',
                        width: normalize(32),
                        marginRight: normalize(6),
                        alignItems: "center",
                    }}>
                    <Image
                        source={Assets.more}
                        style={{
                            height: normalize(16),
                            width: normalize(4),
                            resizeMode: "stretch",

                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}