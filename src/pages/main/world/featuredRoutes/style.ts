import {StyleSheet} from 'react-native';
import {getVerticalPx} from '@helpers/layoutFoo';

const fontLight = 'DIN2014Narrow-Light';
const darkText = '#313131';

const styles = StyleSheet.create({
    header: {
        fontFamily: fontLight,
        fontSize: getVerticalPx(30),
        marginTop: getVerticalPx(30),
        color: darkText,
        marginHorizontal: 40,
    },
    tileWrapper: {
        marginTop: getVerticalPx(30),
        marginBottom: getVerticalPx(10),
        marginHorizontal: 40,
    },
    lastTile: {
        marginBottom: getVerticalPx(50),
    },
    horizontalSpace: {},
    loaderContainer: {
        height: 55,
        width: '100%',
        // marginTop: -getVerticalPx(60),
        marginBottom: getVerticalPx(50),
    },
    backdrop: {
        marginTop: -getVerticalPx(250),
    },
    list: {
        marginTop: 100,
    },
    navHeader: {
        backgroundColor: '#ffffff',
        zIndex: 1000,
    },
});

export default styles;