import {StyleSheet, Platform} from 'react-native';
import {
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
        borderRadius: 25,
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
    },
    raitingIcon: {
        marginLeft: 0,
        marginRight: 5,
    },
    localizationDescription: {
        marginTop: getVerticalPx(8),
        fontFamily: fontLight,
        fontSize: 18,
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
        fontSize: 20,
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
        fontSize: 13,
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
        fontSize: 18,
    },
    secondSectionSuffix: {
        fontFamily: fontRegular,
        fontSize: 15,
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
    section: {
        marginHorizontal: 20,
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
