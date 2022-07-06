import {StyleSheet} from 'react-native';

import {getHorizontalPx, getVerticalPx} from '@helpers/layoutFoo';
import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';
import colors from '@theme/colors';

const styles = StyleSheet.create({
    background: {
        backgroundColor: colors.whiteGrey,
        height: '100%',
    },

    listHeaderContainer: {
        marginTop: getFVerticalPx(60),
    },
    notification: {
        marginBottom: getFVerticalPx(24),
    },
    header: {
        marginHorizontal: getHorizontalPx(16),
    },
    tileWrapper: {
        marginTop: getVerticalPx(30),
        marginHorizontal: getHorizontalPx(16),
    },
    listContent: {
        paddingBottom: getFVerticalPx(150),
    },
    loaderContainer: {
        height: getFVerticalPx(50),
        width: '100%',
        marginVertical: getFVerticalPx(20),
    },
    listBodyLoader: {
        marginTop: '50%',
    },
    backdrop: {
        marginTop: -getVerticalPx(250),
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
