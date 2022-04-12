import {StyleSheet} from 'react-native';

import {getHorizontalPx, getVerticalPx} from '@helpers/layoutFoo';
import {
    getFFontSize,
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';
import colors from '@theme/colors';

const styles = StyleSheet.create({
    background: {
        backgroundColor: colors.whiteGrey,
        height: '100%',
    },
    header: {
        marginHorizontal: getHorizontalPx(16),
        marginTop: getFVerticalPx(60),
    },
    tileWrapper: {
        marginTop: getVerticalPx(30),
        marginHorizontal: getHorizontalPx(16),
    },
    lastTile: {
        marginBottom: getVerticalPx(200),
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
    separatorHeader: {
        fontFamily: 'DIN2014Narrow-Light',
        fontSize: getFFontSize(18),
        letterSpacing: 0.5,
        color: '#555555',
        paddingBottom: getVerticalPx(15),
    },
    fullscreenBackdrop: {
        top: getFVerticalPx(42),
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
