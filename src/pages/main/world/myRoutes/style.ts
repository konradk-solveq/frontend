import {Dimensions, StyleSheet} from 'react-native';

import {getHorizontalPx, getVerticalPx} from '@helpers/layoutFoo';
import {
    getFFontSize,
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';
import {appContainerHorizontalMargin} from '@theme/commonStyle';
const fontLight = 'DIN2014Narrow-Light';
const darkText = '#313131';

const {width} = Dimensions.get('screen');

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
        marginBottom: getVerticalPx(200),
    },
    horizontalSpace: {},
    loaderContainer: {
        height: getHorizontalPx(50),
        width: '100%',
        marginTop: -getVerticalPx(120),
        marginBottom: getVerticalPx(150),
    },
    listBodyLoader: {
        marginTop: '50%',
    },
    backdrop: {
        marginTop: -getVerticalPx(250),
    },
    separatorHeader: {
        fontFamily: 'DIN2014Narrow-Light',
        fontSize: getFFontSize(18),
        letterSpacing: 0.5,
        color: '#555555',
        paddingBottom: getVerticalPx(15),
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
        width: getFHorizontalPx(135),
    },
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
