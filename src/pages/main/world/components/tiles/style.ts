import {StyleSheet, Dimensions, Platform} from 'react-native';
import {getHorizontalPx, getVerticalPx} from '../../../../../helpers/layoutFoo';

const isIOS = Platform.OS === 'ios';
const {height} = Dimensions.get('window');
const containerHeight = height < 800 && !isIOS ? 334 : 304;
const nextTileContainerHeight = height < 800 && !isIOS ? 175 : 160;
const imageContainerHeight = height < 800 && !isIOS ? 212 : 182;

const fontLight = 'DIN2014Narrow-Light';
const fontRegular = 'DIN2014Narrow-Regular';
const darkerText = '#313131';
const darkText = '#555555';

const styles = StyleSheet.create({
    container: {
        height: getVerticalPx(containerHeight),
        borderRadius: 25,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
    },
    sectionsContainer: {
        marginTop: getVerticalPx(120),
    },
    raitingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingValue: {
        fontFamily: fontLight,
        letterSpacing: 0.42,
        color: darkText,
    },
    raitingIcon: {
        marginLeft: 0,
        marginRight: 5,
    },
    localizationDescription: {
        marginTop: getVerticalPx(8),
        fontFamily: fontLight,
        fontSize: getVerticalPx(18),
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
        height: 10,
        marginRight: 5,
    },
    tileSectionTitle: {
        fontFamily: fontRegular,
        fontSize: getVerticalPx(23),
    },
    firstSection: {
        marginHorizontal: 20,
        paddingTop: getVerticalPx(20),
        paddingBottom: getVerticalPx(14),
    },
    firstSectionContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    distanceToStart: {
        fontFamily: fontLight,
        fontSize: getVerticalPx(15),
        letterSpacing: 0.42,
        color: darkText,
    },
    secondtSection: {
        marginHorizontal: 20,
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
        fontSize: getVerticalPx(23),
    },
    secondSectionSuffix: {
        fontFamily: fontRegular,
        fontSize: getVerticalPx(18),
        letterSpacing: 0.5,
        color: darkText,
    },
    secondSectionIcon: {
        marginLeft: 0,
        marginRight: getVerticalPx(7),
    },
    mountainIcon: {
        marginLeft: 0,
        marginRight: getVerticalPx(7),
        height: getVerticalPx(8),
        width: getHorizontalPx(12),
    },
    wayIcon: {
        marginLeft: 0,
        marginRight: getVerticalPx(7),
        height: getVerticalPx(12),
        width: getHorizontalPx(12),
    },
    thirdSection: {
        marginHorizontal: 20,
        marginBottom: getVerticalPx(18),
    },
    thirdSectionText: {
        fontFamily: fontLight,
        color: darkerText,
        fontSize: getVerticalPx(15),
        letterSpacing: 0.42,
    },
    thirdSectionFirstColumn: {
        flexDirection: 'row',
        width: '70%',
        justifyContent: 'flex-start',
    },
    thirdSectionFirstColumnLeftValue: {
        width: 'auto',
    },
    thirdSectionFirstColumnRightValue: {
        width: 'auto',
        marginLeft: 20,
    },
    thirdSectionSecondColumn: {
        width: '30%',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    imageWrapper: {
        bottom: getVerticalPx(imageContainerHeight),
        position: 'absolute',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#f1f1f1',
    },
    image: {
        marginTop: getVerticalPx(106),
        height: '100%',
        width: '100%',
    },
    mImg: {
        width: '100%',
        height: '100%',
        backgroundColor: '#f7f7f7',
    },
    column: {
        width: '50%',
    },
    placeholderLogo: {
        marginTop: 0,
    },
});

export const secondTileStyles = StyleSheet.create({
    container: {
        height: getVerticalPx(214),
        borderRadius: 25,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
    },
    sectionsContainer: {},
    firstSection: {
        flexDirection: 'row',
        marginHorizontal: 20,
        paddingTop: getVerticalPx(20),
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

export const nextTileStyles = StyleSheet.create({
    container: {
        height: getVerticalPx(nextTileContainerHeight),
        borderRadius: 25,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
    },
    sectionsContainer: {},
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

export default styles;
