import { Dimensions } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { normalize } from '../../common/Normalize';
import Fonts from '../../assets/Fonts';
import Colors from '../../common/Colors';

const { width, height } = Dimensions.get('window');

export const styles = ScaledSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.white,
        borderTopLeftRadius: normalize(30),
        borderTopRightRadius: normalize(30),
        // height: height - 100,
        padding: normalize(20),
    },
    username: {

        fontSize: normalize(22),
        marginTop: normalize(10),
        fontWeight: "300",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: Colors.text,
        fontFamily: Fonts.Light,
    },
    text: {
        fontFamily: "Lato",
        fontSize: normalize(16),
        fontWeight: "300",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: "#323232"
    },
    buttonContainer: {
        alignItems: 'center',
        borderRadius: 10,
        padding: normalize(12),
        borderWidth: 1,
        borderColor: Colors.orange,
        height: normalize(46),
        marginTop: normalize(30),
        backgroundColor: Colors.orange
    },
    buttonText: {
        fontFamily: Fonts.Medium,
        fontSize: normalize(16),
        fontWeight: "500",
        color: Colors.white
    },

    loDialog: {
        width: width - normalize(40),
        justifyContent: "center",
        backgroundColor: "transparent",
        shadowColor: "rgba(62, 63, 64, 0.18)",
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: normalize(22),
        shadowOpacity: 1
    },
    loContainer: {
        margin: normalize(10),
        backgroundColor: Colors.white,
        borderRadius: normalize(12),
        padding: normalize(16)
    },

    loEnterPassText: {
        color: Colors.primaryDark,
        fontSize: normalize(14),
        textAlign: "center"
    },
    loYuorResponseTest: {
        color: Colors.black,
        fontSize: normalize(14),
        marginTop: normalize(10),
        textAlign: 'left'
    },
    loSend: {
        flex: 1,
        backgroundColor: Colors.primaryDark,
        width: normalize(110),
        height: normalize(40),
        marginTop: normalize(16),
        marginHorizontal: normalize(16),
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: normalize(5),
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0, 0.4)',
                shadowOffset: { height: 3, width: 0 },
                shadowOpacity: 0.7,
                shadowRadius: 5
            },
            android: {
                elevation: 4,
            }
        }),
    },
    locancelIcon: {
        width: normalize(16),
        height: normalize(16),
        tintColor: Colors.white
    },
    loCenterIcon: {
        width: normalize(30),
        height: normalize(30),
        margin: normalize(20),
        resizeMode: "stretch",
    },
    loSendText: {
        color: Colors.white,
        fontSize: normalize(14)
    },
})