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

    },
    account: {
        fontSize: normalize(20),
        fontFamily: Fonts.Bold,
        color: Colors.text,
        fontWeight: "bold"
    },
    rowFront: {
        paddingHorizontal: normalize(20),
        paddingVertical: normalize(20),
    },
    rowTimeStyle: {
        fontSize: normalize(10),
        fontWeight: "600",
        fontStyle: "normal",
        fontFamily: Fonts.Regular,
        letterSpacing: normalize(0.67),
        textAlign: "left",
        textAlignVertical: "center",
        color: Colors.textSecondary
    },
    rowTitleStyle: {
        fontSize: normalize(16),
        fontWeight: "500",
        fontStyle: "normal",
        fontFamily: Fonts.Medium,
        letterSpacing: normalize(0.67),
        textAlign: "left",
        textAlignVertical: "center",
        color: Colors.text
    },
    rowDescriptionStyle: {
        fontSize: normalize(14),
        fontWeight: "500",
        fontStyle: "normal",
        fontFamily: Fonts.Medium,
        letterSpacing: normalize(0.67),
        textAlign: "left",
        textAlignVertical: "center",
        color: Colors.textSecondary,
    },
    rowBack: {
        flex: 1,
        backgroundColor: Colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    archiveText: {
        fontFamily: Fonts.Medium,
        fontSize: normalize(11),
        marginTop: normalize(3),
        fontWeight: "500",
        fontStyle: "normal",
        color: "#2f5a7d"
    },
    noDataAvailable: {
        textAlign: "center",
        textAlignVertical: "center",
        color: Colors.textSecondary
    }
})