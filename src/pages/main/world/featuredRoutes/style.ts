import {StyleSheet} from 'react-native';
import {getFontSize, getHorizontalPx, getVerticalPx} from '@helpers/layoutFoo';
import colors from '@theme/colors';

const styles = StyleSheet.create({
    header: {
        fontFamily: 'DIN2014Narrow-Light',
        fontSize: getFontSize(30),
        marginTop: getVerticalPx(30),
        color: colors.dark,
        marginHorizontal: getHorizontalPx(16),
    },
    tileWrapper: {
        marginTop: getVerticalPx(30),
        marginBottom: getVerticalPx(10),
        marginHorizontal: getHorizontalPx(16),
    },
    lastTile: {
        marginBottom: getVerticalPx(50),
    },
    horizontalSpace: {},
    loaderContainer: {
        height: getHorizontalPx(50),
        width: '100%',
        marginBottom: getVerticalPx(50),
    },
    backdrop: {
        marginTop: -getVerticalPx(250),
    },
    list: {
        marginTop: getVerticalPx(100),
    },
    navHeader: {
        backgroundColor: colors.white,
        zIndex: 1000,
    },
});

export default styles;
