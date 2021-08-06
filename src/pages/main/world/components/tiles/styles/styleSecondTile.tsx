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
        marginHorizontal: 20,
        marginBottom: 0,
    },
    imageWrapper: {
        width: getVerticalPx(95),
        height: getVerticalPx(95),
        overflow: 'hidden',
        backgroundColor: '#f1f1f1',
        borderRadius: 16,
    },
    image: {
        height: '100%',
        width: '100%',
    },
});

export default secondTileStyles;
