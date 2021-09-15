import {StyleSheet} from 'react-native';
import {getHorizontalPx, getVerticalPx} from '../../../../helpers/layoutFoo';

const fontLight = 'DIN2014Narrow-Light';
const darkText = '#313131';

const styles = StyleSheet.create({
    header: {
        fontFamily: fontLight,
        fontSize: getVerticalPx(30),
        color: darkText,
        marginHorizontal: 40,
    },
    tileWrapper: {
        marginTop: getVerticalPx(30),
        marginBottom: getVerticalPx(18),
        marginHorizontal: 40,
        width: getHorizontalPx(334),
    },
    lastTile: {
        marginBottom: getVerticalPx(150),
    },
    horizontalSpace: {},
    loaderContainer: {
        height: 50,
        width: '100%',
        marginTop: -getVerticalPx(120),
        marginBottom: getVerticalPx(150),
    },
    backdrop: {
        marginTop: -getVerticalPx(250),
    },
});

export default styles;
