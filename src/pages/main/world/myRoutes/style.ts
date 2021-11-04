import {StyleSheet} from 'react-native';
import {
    getFontSize,
    getHorizontalPx,
    getVerticalPx,
} from '../../../../helpers/layoutFoo';

const fontLight = 'DIN2014Narrow-Light';
const darkText = '#313131';

const styles = StyleSheet.create({
    header: {
        fontFamily: fontLight,
        fontSize: getVerticalPx(30),
        color: darkText,
        marginHorizontal: getHorizontalPx(40),
    },
    tileWrapper: {
        marginTop: getVerticalPx(30),
        marginHorizontal: getHorizontalPx(40),
    },
    lastTile: {
        marginBottom: getVerticalPx(200),
    },
    horizontalSpace: {},
    loaderContainer: {
        height: getHorizontalPx(50),
        width: '100%',
        marginTop: -getVerticalPx(120),
        marginBottom: getVerticalPx(150),
    },
    backdrop: {
        marginTop: -getVerticalPx(250),
    },
    separatorHeader: {
        fontFamily: 'DIN2014Narrow-Light',
        fontSize: getFontSize(18),
        letterSpacing: 0.5,
        color: '#555555',
        paddingBottom: getVerticalPx(15),
    },
});

export default styles;
