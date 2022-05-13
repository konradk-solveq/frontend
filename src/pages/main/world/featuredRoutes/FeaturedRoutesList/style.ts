import {StyleSheet} from 'react-native';
import {getFontSize, getHorizontalPx, getVerticalPx} from '@helpers/layoutFoo';
import {getFVerticalPx} from '@theme/utils/appLayoutDimensions';

const fontLight = 'DIN2014Narrow-Light';
const darkText = '#313131';

const styles = StyleSheet.create({
    header: {
        fontFamily: fontLight,
        fontSize: getFontSize(30),
        color: darkText,
        marginHorizontal: getHorizontalPx(40),
    },
    tileWrapper: {
        marginTop: getVerticalPx(30),
        marginBottom: getVerticalPx(18),
        marginHorizontal: getHorizontalPx(40),
        width: getHorizontalPx(334),
    },
    lastTile: {
        marginBottom: getVerticalPx(150),
    },
    horizontalSpace: {},
    loaderContainer: {
        height: getFVerticalPx(50),
        width: '100%',
        marginTop: -getFVerticalPx(120),
        marginBottom: getFVerticalPx(200),
    },
    backdrop: {
        marginTop: -getVerticalPx(250),
    },
});

export default styles;
