import {StyleSheet} from 'react-native';
import {getFontSize, getHorizontalPx, getVerticalPx} from '../../../../../../helpers/layoutFoo';

const fontLight = 'DIN2014Narrow-Light';
const darkerText = '#313131';

const stylesThirdSection = StyleSheet.create({
    text: {
        fontFamily: fontLight,
        color: darkerText,
        fontSize: getFontSize(15),
        letterSpacing: 0.42,
    },
    firstColumn: {
        flexDirection: 'row',
        width: '70%',
        justifyContent: 'flex-start',
    },
    firstColumnLeftValue: {
        width: 'auto',
    },
    firstColumnRightValue: {
        width: 'auto',
        marginLeft: getHorizontalPx(20),
    },
});

export default stylesThirdSection;
