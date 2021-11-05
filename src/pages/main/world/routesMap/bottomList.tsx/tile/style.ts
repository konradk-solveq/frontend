import {StyleSheet} from 'react-native';
import {
    getFontSize,
    getHorizontalPx,
    getVerticalPx,
    mainButtonsHeight,
} from '../../../../../../helpers/layoutFoo';

const styles = StyleSheet.create({
    container: {
        paddingVertical: getVerticalPx(7),
    },
    row: {
        flexDirection: 'row',
    },
    tile: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftTileCell: {
        width: '90%',
        marginRight: -getHorizontalPx(10),
    },
    leftCell: {
        marginRight: getHorizontalPx(30),
    },
    textRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: getHorizontalPx(7),
    },
    title: {
        fontFamily: 'DIN2014Narrow-Regular',
        fontSize: getFontSize(23),
        color: '#313131',
        lineHeight: getFontSize(29),
    },
    distance: {
        fontFamily: 'DIN2014Narrow-Regular',
        fontSize: getFontSize(23),
        color: '#313131',
        lineHeight: getFontSize(29),
    },
    suffix: {
        fontFamily: 'DIN2014Narrow-Regular',
        fontSize: getFontSize(18),
        letterSpacing: 0.5,
        color: '#555555',
        marginLeft: 5,
    },
    time: {
        fontFamily: 'DIN2014Narrow-Regular',
        fontSize: getFontSize(23),
        color: '#313131',
    },
    distanceToRoute: {
        fontFamily: 'DIN2014Narrow-Light',
        fontSize: getFontSize(15),
        color: '#555555',
        lineHeight: getFontSize(19),
    },
    button: {
        width: getHorizontalPx(39),
        height: mainButtonsHeight(35),
        marginTop: getVerticalPx(10),
    },
    buttonText: {
        fontFamily: 'DIN2014Narrow-Regular',
        fontSize: getFontSize(18),
        color: '#ffffff',
    },
});

export default styles;
