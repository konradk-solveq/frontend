import {StyleSheet} from 'react-native';
import {
    getFontSize,
    getHorizontalPx,
    getVerticalPx,
    mainButtonsHeight,
} from '../../../helpers/layoutFoo';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
    title: {
        width: getHorizontalPx(334),
        left: getHorizontalPx(40),
        fontFamily: 'DIN2014Narrow-Regular',
        textAlign: 'center',
        fontSize: getFontSize(40),
        paddingVertical: 5,
        color: '#d8232a',
    },
    imgage: {
        marginTop: getVerticalPx(20),
        width: getHorizontalPx(414 + 95 + 95),
        left: getHorizontalPx(-95),
        height: getHorizontalPx(296),
    },
    content: {
        fontFamily: 'DIN2014Narrow-Light',
        fontSize: getFontSize(23),
        color: '#414141',
        width: getHorizontalPx(334),
        left: getHorizontalPx(40),
        marginTop: getVerticalPx(20),
    },
    wrap: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: getHorizontalPx(414),
        height: getVerticalPx(20 + 30 + 65 + 50) + mainButtonsHeight(50),
        backgroundColor: '#fff',
    },
    buttonsWrapper: {
        width: getHorizontalPx(334),
        left: getHorizontalPx(40),
    },
    btn: {
        height: mainButtonsHeight(50),
        marginTop: getVerticalPx(30),
    },
});

export default styles;
