import {StyleSheet} from 'react-native';
import {getHorizontalPx, getVerticalPx} from '@helpers/layoutFoo';

const fontLight = 'DIN2014Narrow-Light';
const darkText = '#313131';

const styles = StyleSheet.create({
    header: {
        fontFamily: fontLight,
        fontSize: getVerticalPx(30),
        color: darkText,
        marginHorizontal: getHorizontalPx(16),
    },
    tileWrapper: {
        marginTop: getVerticalPx(30),
        marginHorizontal: getHorizontalPx(16),
    },
    lastTile: {
        marginBottom: getVerticalPx(150),
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
    topButtonsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: getHorizontalPx(16),
    },
    topButton: {
        height: getVerticalPx(48),
        width: 'auto',
    },
});

export default styles;
