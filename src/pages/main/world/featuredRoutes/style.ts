import {StyleSheet} from 'react-native';
import {getFontSize, getHorizontalPx, getVerticalPx} from '@helpers/layoutFoo';

const fontLight = 'DIN2014Narrow-Light';
const darkText = '#313131';

const styles = StyleSheet.create({
    header: {
        fontFamily: fontLight,
        fontSize: getFontSize(30),
        marginTop: getVerticalPx(30),
        color: darkText,
        marginHorizontal: getHorizontalPx(40),
    },
    tileWrapper: {
        marginTop: getVerticalPx(30),
        marginBottom: getVerticalPx(10),
        marginHorizontal: getHorizontalPx(40),
    },
    lastTile: {
        marginBottom: getVerticalPx(50),
    },
    horizontalSpace: {},
    loaderContainer: {
        height: 50,
        width: '100%',
        // marginTop: -getVerticalPx(60),
        marginBottom: getVerticalPx(50),
    },
    backdrop: {
        marginTop: -getVerticalPx(250),
    },
    list: {
        marginTop: getVerticalPx(100),
    },
    navHeader: {
        backgroundColor: '#ffffff',
        zIndex: 1000,
    },
});

export default styles;
