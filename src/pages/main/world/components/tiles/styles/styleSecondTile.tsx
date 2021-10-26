import {StyleSheet} from 'react-native';
import {
    getHorizontalPx,
    getVerticalPx,
} from '../../../../../../helpers/layoutFoo';

export const secondTileStyles = StyleSheet.create({
    firstSection: {
        flexDirection: 'row',
        paddingBottom: getVerticalPx(10),
    },
    firstSectionLeftColumn: {
        width: '30%',
        marginRight: getHorizontalPx(14),
    },
    firstSectionRightColumn: {
        flexDirection: 'column',
        width: '70%',
    },
    thirdSection: {
        marginHorizontal: getHorizontalPx(20),
        marginBottom: 0,
    },
    imageWrapper: {
        width: getHorizontalPx(95),
        height: getHorizontalPx(95),
        overflow: 'hidden',
        backgroundColor: '#f1f1f1',
        borderRadius: getHorizontalPx(16),
    },
    image: {
        height: '100%',
        width: '100%',
    },
});

export default secondTileStyles;
