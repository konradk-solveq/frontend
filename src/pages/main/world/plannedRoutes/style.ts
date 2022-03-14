import {Dimensions, StyleSheet} from 'react-native';

import {getHorizontalPx, getVerticalPx} from '@helpers/layoutFoo';
import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';
import {appContainerHorizontalMargin} from '@theme/commonStyle';
import colors from '@theme/colors';

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
    background: {
        backgroundColor: colors.whiteGrey,
    },
    header: {
        fontFamily: 'DIN2014Narrow-Light',
        fontSize: getVerticalPx(30),
        color: colors.dark,
        marginHorizontal: getHorizontalPx(16),
    },
    tileWrapper: {
        marginTop: getVerticalPx(30),
        marginHorizontal: getHorizontalPx(16),
    },
    lastTile: {
        marginBottom: getVerticalPx(150),
    },
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
    topButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: appContainerHorizontalMargin,
        zIndex: 10,
    },
    topButton: {
        height: getVerticalPx(48),
        zIndex: 10,
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
        shadowColor: colors.black,
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
