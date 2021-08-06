import {StyleSheet} from 'react-native';
import {
    getHorizontalPx,
    getVerticalPx,
} from '../../../../../../helpers/layoutFoo';

export const nextTileStyles = StyleSheet.create({
    firstSection: {
        flexDirection: 'row',
        marginHorizontal: 20,
        paddingTop: getVerticalPx(20),
        paddingBottom: getVerticalPx(5),
    },
    firstSectionContent: {
        flexDirection: 'row',
        paddingBottom: getVerticalPx(7),
    },
    firstSectionLeftColumn: {
        width: '30%',
        marginRight: getHorizontalPx(14),
    },
    firstSectionRightColumn: {
        flexDirection: 'column',
        width: '70%',
    },
    secondtSection: {
        marginLeft: 0,
        marginRight: 20,
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

export default nextTileStyles;
