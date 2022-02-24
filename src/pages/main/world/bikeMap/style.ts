import {StyleSheet} from 'react-native';
import {
    getFFontSize,
    getFVerticalPx,
    getFHorizontalPx,
} from '@theme/utils/appLayoutDimensions';

const fontLight = 'DIN2014Narrow-Light';
const darkText = '#313131';

const styles = StyleSheet.create({
    header: {
        fontFamily: fontLight,
        fontSize: getFFontSize(30),
        marginTop: getFVerticalPx(30),
        color: darkText,
        marginHorizontal: getFHorizontalPx(16),
    },
    tileWrapper: {
        marginTop: getFVerticalPx(30),
        marginBottom: getFVerticalPx(10),
        marginHorizontal: getFHorizontalPx(16),
    },
    lastTile: {
        marginBottom: getFVerticalPx(150),
    },
    horizontalSpace: {},
    loaderContainer: {
        height: getFHorizontalPx(50),
        width: '100%',
        marginTop: -getFVerticalPx(120),
        marginBottom: getFVerticalPx(150),
    },
    backdrop: {
        marginTop: -getFVerticalPx(250),
    },
    topButtonsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    topButton: {
        height: getFVerticalPx(48),
        width: getFHorizontalPx(115),
    },
});

export default styles;
