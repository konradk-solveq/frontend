import { StyleSheet, Platform } from 'react-native';
import {
    getFontSize,
    getHorizontalPx,
    getVerticalPx,
} from '../../../../../../helpers/layoutFoo';

const isIOS = Platform.OS === 'ios';
const ichForAndroid = getVerticalPx(270);
// TODO nie wiem jaka wartość powinna być dla ios-a,
// TODO ale napewno powinna być ujęta w funkcji: getVerticalPx()
const imageContainerHeight = isIOS ? 180 : ichForAndroid;

const fontLight = 'DIN2014Narrow-Light';
const fontRegular = 'DIN2014Narrow-Regular';
const darkerText = '#313131';
const darkText = '#555555';

const styles = StyleSheet.create({
    container: {
        borderRadius: getHorizontalPx(25),
        overflow: 'hidden',
        backgroundColor: '#ffffff',
    },
    sectionsContainer: {
        // marginTop: getVerticalPx(120),
    },
    raitingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingValue: {
        fontFamily: fontLight,
        letterSpacing: 0.42,
        color: darkText,
        fontSize: getFontSize(18),
    },
    raitingIcon: {
        marginLeft: 0,
        marginRight: getHorizontalPx(5),
    },
    raitingIconWrap: {
        top: getHorizontalPx(0.4),
    },
    raitingIconFont: {
        marginLeft: 0,
        marginRight: getHorizontalPx(5),
        fontFamily: 'mykross',
        fontSize: getFontSize(10.5),
    },
    bikeIconFontWrap: {
        height: 16,
    },
    bikeIconFont: {
        marginLeft: 0,
        marginRight: getHorizontalPx(5),
        fontFamily: 'mykross',
        fontSize: getFontSize(16),
    },
    clockIconFontWrap: {
        top: 0.2,
    },
    clockIconFont: {
        marginLeft: 0,
        marginRight: getHorizontalPx(5),
        fontFamily: 'mykross',
        fontSize: getFontSize(15),
    },
    localizationDescription: {
        marginTop: getVerticalPx(8),
        fontFamily: fontLight,
        fontSize: getFontSize(18),
        letterSpacing: 0.42,
        color: darkText,
    },
    borderLine: {
        borderBottomColor: '#ebebeb',
        borderBottomWidth: 1,
    },
    borderVerticalLine: {
        borderLeftColor: '#ebebeb',
        borderLeftWidth: 1,
        height: getHorizontalPx(10),
        marginRight: getHorizontalPx(5),
    },
    tileSectionTitle: {
        fontFamily: fontRegular,
        fontSize: getFontSize(20),
    },
    firstSection: {
        marginHorizontal: getHorizontalPx(20),
        paddingTop: getVerticalPx(20),
        paddingBottom: getVerticalPx(14),
    },
    firstSectionContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    distanceToStart: {
        fontFamily: fontLight,
        fontSize: getFontSize(13),
        letterSpacing: 0.42,
        color: darkText,
    },
    secondtSection: {
        marginHorizontal: getHorizontalPx(20),
    },
    sectionContentRow: {
        flexDirection: 'row',
        paddingVertical: getVerticalPx(10),
        justifyContent: 'flex-start',
    },
    sectionTextRow: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    secondSectionText: {
        fontFamily: fontRegular,
        color: darkerText,
        fontSize: getFontSize(18),
    },
    secondSectionSuffix: {
        fontFamily: fontRegular,
        fontSize: getFontSize(15),
        letterSpacing: 0.5,
        color: darkText,
    },
    secondSectionIcon: {
        marginLeft: 0,
        marginRight: getHorizontalPx(7),
    },
    mountainIconFontWrap: {
        marginRight: getHorizontalPx(7),
    },
    mountainIconFont: {
        marginLeft: 0,
        marginRight: getHorizontalPx(5),
        fontFamily: 'mykross',
        fontSize: getFontSize(7.7),
    },
    wayIconFontWrap: {
        top: 0.6,
        marginRight: getHorizontalPx(7),
    },
    wayIconFont: {
        marginLeft: 0,
        marginRight: getHorizontalPx(5),
        fontFamily: 'mykross',
        fontSize: getFontSize(10),
    },
    wayIcon: {
        marginLeft: 0,
        marginRight: getVerticalPx(7),
        height: getVerticalPx(12),
        width: getHorizontalPx(12),
    },
    section: {
        marginHorizontal: getFontSize(20),
        marginBottom: 0,
    },
    imageWrapper: {
        height: getVerticalPx(120),
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#f1f1f1',
    },
    image: {
        height: '100%',
        width: '100%',
    },
    noImage: {
        marginTop: getVerticalPx(-106),
    },
    column: {
        width: '50%',
    },
    placeholderLogo: {
        marginTop: 0,
    },
});

export default styles;
