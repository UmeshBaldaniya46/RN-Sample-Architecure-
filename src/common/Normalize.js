import { Dimensions, Platform, PixelRatio } from 'react-native';
import { ScaledSheet, scale, verticalScale, moderateScale } from 'react-native-size-matters'
const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone 5s's scale
// const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
    return moderateScale(size)
}