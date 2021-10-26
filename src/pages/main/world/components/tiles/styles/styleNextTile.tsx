import {StyleSheet} from 'react-native';
import {
    getFontSize,
    getHorizontalPx,
    getVerticalPx,
} from '../../../../../../helpers/layoutFoo';

export const nextTileStyles = StyleSheet.create({
    firstSection: {
        flexDirection: 'row',
        marginHorizontal: getHorizontalPx(20),
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
    bikeIconFontWrap: {
        top: -0.5,
    },
    bikeIconFont: {
        marginLeft: 0,
        marginRight: getHorizontalPx(5),
        fontFamily: 'mykross',
        fontSize: getHorizontalPx(15),
    },
    clockIconFontWrap: {
        top: 0,
        marginLeft: 5,
    },
    clockIconFont: {
        marginLeft: 0,
        marginRight: getHorizontalPx(5),
        fontFamily: 'mykross',
        fontSize: getHorizontalPx(15),
    },
    secondtSection: {
        marginLeft: 0,
        marginRight: getHorizontalPx(20),
    },
    thirdSection: {
        marginHorizontal: getHorizontalPx(20),
        marginBottom: 0,
    },
    imageWrapper: {
        width: getVerticalPx(95),
        height: getVerticalPx(95),
        overflow: 'hidden',
        backgroundColor: '#f1f1f1',
        borderRadius: getHorizontalPx(16),
    },
    image: {
        height: '100%',
        width: '100%',
    },
});

export default nextTileStyles;
