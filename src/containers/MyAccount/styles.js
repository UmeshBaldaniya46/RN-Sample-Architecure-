import { ScaledSheet } from 'react-native-size-matters';
import { normalize } from '../../common/Normalize';
import Fonts from '../../assets/Fonts';
import Colors from '../../common/Colors';

export const styles = ScaledSheet.create({
    mainContainer: {
        backgroundColor: Colors.white,
        borderTopLeftRadius: normalize(30),
        borderTopRightRadius: normalize(30),
        marginTop: normalize(90),
        height: "100%"
    },
    account: {
        fontSize: normalize(20),
        fontFamily: Fonts.Bold,
        color: Colors.text,
        fontWeight: "bold"
    },
    profile: {
        width: normalize(130),
        height: normalize(130),
        borderWidth: 5,
        borderColor: Colors.orange,
        borderRadius: normalize(130 / 2),
        marginTop: -normalize(130 / 2),
        alignSelf: "center"
    },
    name: {
        alignSelf: "center",
        marginTop: normalize(10),
        marginBottom: normalize(20),
        fontSize: normalize(24),
        fontFamily: Fonts.Light,
        color: Colors.text,
        fontWeight: "300",
        textAlign: "center"
    },
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: normalize(20),
        marginTop: normalize(20),
    },
    label: {
        fontFamily: Fonts.Light,
        fontSize: normalize(16),
        fontWeight: "300",
        fontStyle: "italic",
        letterSpacing: 0.32,
        textAlign: "right",
        color: Colors.textSecondary
    },
    value: {
        fontFamily: Fonts.Medium,
        fontSize: normalize(16),
        fontWeight: "400",
        letterSpacing: 0.32,
        textAlign: "left",
        color: Colors.black
    }
})