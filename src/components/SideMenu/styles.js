import { normalize } from '../../common/Normalize';
import Fonts from '../../assets/Fonts';
import Colors from '../../common/Colors';

export default {
    mainContainer: {
        shadowColor: "rgba(31, 30, 28, 0.25)",
        shadowOffset: {
            width: 4,
            height: 0
        },
        shadowRadius: 12,
        shadowOpacity: 1,
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "#ffffff"
    },
    menuTitle: {
        marginLeft: normalize(16),
        fontFamily: Fonts.Light,
        fontSize: normalize(16),
        fontWeight: "300",
        color: "#323232",
        fontStyle: "normal",
    },
    profileImage: {
        width: normalize(72),
        height: normalize(72),
        borderRadius: normalize(72 / 2),
        borderWidth: 4,
        borderColor: Colors.primaryDark,
        marginLeft: normalize(20),
        marginTop: normalize(50),
        zIndex: 1
    },
    userNameContainer: {
        height: normalize(30),
        backgroundColor: Colors.orange,
        marginTop: normalize(71),
        borderTopRightRadius: normalize(15),
        borderBottomRightRadius: normalize(15),
        width: "54%",
        marginLeft: -4,
        justifyContent: "center"
    },
    userNameText: {
        marginLeft: normalize(14),
        textAlign: "left",
        color: Colors.white,
        fontWeight: "600",
        fontFamily: Fonts.Semibold,
        fontSize: normalize(17)
    },
    touchableRow: {
        flexDirection: 'row',
        marginLeft: normalize(20),
    },
    button: {
        width: '35%',
        alignSelf: 'center',
        alignContent: 'flex-end',
        top: normalize(-23.5),
    }
}