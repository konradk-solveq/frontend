import {StyleSheet} from 'react-native';
import {getFHorizontalPx} from '@src/helpers/appLayoutDimensions';
import colors from '@theme/colors';

export const styles = StyleSheet.create({
    wrap: {
        width: getFHorizontalPx(358),
        left: getFHorizontalPx(16),
    },
    wrapFeatured: {
        width: getFHorizontalPx(342),
        left: getFHorizontalPx(16),
    },
    area: {
        height: getFHorizontalPx(311),
        marginBottom: getFHorizontalPx(8),
    },
    tile: {
        width: '100%',
        height: '100%',
        borderRadius: getFHorizontalPx(12),
        backgroundColor: colors.backgroundPrimary,
        overflow: 'hidden',
    },
    imageWrapper: {
        width: '100%',
        height: getFHorizontalPx(163),
        overflow: 'hidden',
    },
    image: {
        height: '100%',
        width: '100%',
    },
    noImage: {
        marginTop: getFHorizontalPx(-106),
    },
    description: {
        left: getFHorizontalPx(16),
        top: getFHorizontalPx(8),
        width: getFHorizontalPx(326),
        height: getFHorizontalPx(124),
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    reactions: {
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
    },
    number: {
        marginLeft: getFHorizontalPx(4),
        marginRight: getFHorizontalPx(16),
        top: getFHorizontalPx(-1),
    },
    iconWrap: {
        display: 'flex',
        flexDirection: 'row',
        marginRight: getFHorizontalPx(16),
    },
    icon: {
        fontSize: getFHorizontalPx(24),
        width: getFHorizontalPx(24),
        height: getFHorizontalPx(24),
        textAlign: 'center',
        color: colors.black,
    },
    iconNumber: {
        marginLeft: getFHorizontalPx(4),
        top: getFHorizontalPx(2),
    },
    reactionWrap: {
        marginRight: getFHorizontalPx(16),
    },
    edit: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
});
