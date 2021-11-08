import {Dimensions, StyleSheet} from 'react-native';
import {getFontSize, getHorizontalPx, getVerticalPx} from '@helpers/layoutFoo';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        paddingBottom: getVerticalPx(50 + 30 + 65),
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
        marginTop: getVerticalPx(width > 365 ? 30 : 0),
    },
    content: {
        fontFamily: 'DIN2014Narrow-Light',
        fontSize: getFontSize(23),
        color: '#414141',
        width: getHorizontalPx(334),
        left: getHorizontalPx(40),
        marginTop: getVerticalPx(20),
    },
    buttonsWrapper: {
        position: 'absolute',
        width: getHorizontalPx(334),
        left: getHorizontalPx(40),
        bottom: getVerticalPx(width > 365 ? 65 : 55),
    },
    btn: {
        height: 50,
        marginTop: getVerticalPx(30),
    },
    bolded: {
        fontFamily: 'DIN2014Narrow-Bold',
        fontSize: getFontSize(23),
    },
});

export default styles;
