import {Dimensions, StyleSheet} from 'react-native';
import {
    getFFontSize,
    getFVerticalPx,
    getFHorizontalPx,
} from '@theme/utils/appLayoutDimensions';
import {appContainerHorizontalMargin} from '@theme/commonStyle';
import colors from '@theme/colors';

const fontLight = 'DIN2014Narrow-Light';
const darkText = '#313131';

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
    background: {
        backgroundColor: colors.whiteGrey,
        height: '100%',
    },
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: appContainerHorizontalMargin,
        zIndex: 10,
    },
    topButton: {
        height: getFVerticalPx(48),
        zIndex: 10,
    },
    topButtonLeft: {},
    topButtonRight: {
        position: 'absolute',
        right: 0,
        width: getFHorizontalPx(70),
    },
    fullscreenBackdrop: {
        top: getFVerticalPx(42),
    },
    dropdownBox: {
        width: width,
        marginHorizontal: 0,
        position: 'absolute',
        top: getFVerticalPx(42),
        left: -appContainerHorizontalMargin,
    },
    dropdownButtonContainerStyle: {
        justifyContent: 'flex-start',
    },
    mapBtn: {
        position: 'absolute',
        bottom: getFVerticalPx(133),
        left: getFHorizontalPx(95),
        width: getFHorizontalPx(200),
        shadowColor: '#333333',
        shadowOffset: {
            width: 0,
            height: getFVerticalPx(4),
        },
        shadowOpacity: 0.07,
        shadowRadius: getFVerticalPx(8),
        elevation: 3,
        borderRadius: getFHorizontalPx(16),
    },
});

export default styles;
