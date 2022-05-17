import {StyleSheet} from 'react-native';
import {
    getFVerticalPx,
    getFHorizontalPx,
} from '@theme/utils/appLayoutDimensions';
import colors from '@theme/colors';

const styles = StyleSheet.create({
    background: {
        backgroundColor: colors.whiteGrey,
        height: '100%',
    },
    header: {
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
        marginBottom: getFVerticalPx(200),
    },
    backdrop: {
        marginTop: -getFVerticalPx(250),
    },
    listHeader: {
        paddingTop: getFVerticalPx(52),
    },
    fullscreenBackdrop: {
        top: getFVerticalPx(52),
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
