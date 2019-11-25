import { Dimensions } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { normalize } from '../../common/Normalize';
import Fonts from '../../assets/Fonts';
import Colors from '../../common/Colors';

const { width, height } = Dimensions.get('window');

export const styles = ScaledSheet.create({
    mainContainer: {
        backgroundColor: Colors.white,
        borderTopLeftRadius: normalize(30),
        borderTopRightRadius: normalize(30),
        height: height - 100
    },
    welcome: {
        textAlign: "center",
        marginTop: normalize(58),
        fontSize: normalize(21),
        color: '#2f5a7d',
        letterSpacing: 0.43,
        fontFamily: Fonts.DINLight
    },
    codeText: {
        textAlign: 'center',
        marginTop: normalize(14),
        fontSize: normalize(14),
        color: 'rgb(50,50,50)',
        fontFamily: Fonts.Regular
    },
    codeInput: {
        fontFamily: Fonts.DINLight,
        height: normalize(51),
        marginHorizontal: normalize(33),
        backgroundColor: Colors.white,
        marginTop: normalize(50),
        borderRadius: 4,
        shadowColor: "rgba(31, 30, 28, 0.08)",
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 12,
        elevation: 4,
        shadowOpacity: 1,
        borderWidth: 1,
        fontSize: normalize(18),
        borderColor: Colors.primaryDark,
        paddingHorizontal: normalize(10),
    },
    loginContainer: {
        alignItems: 'center',
        borderRadius: 10,
        padding: normalize(12.5),
        marginHorizontal: normalize(33),
        borderWidth: 1,
        borderColor: Colors.orange,
        height: normalize(46),
        marginVertical: normalize(60),
        backgroundColor: Colors.orange
    },
    loginText: {
        fontSize: normalize(16),
        fontWeight: "500",
        color: Colors.white
    },
    contactText: {
        color: Colors.textSecondary,
        textAlign: 'center',
        fontSize: normalize(14)
    }
})