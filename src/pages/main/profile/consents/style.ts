import {StyleSheet} from 'react-native';
import {
    getFontSize,
    getHorizontalPx,
    getVerticalPx,
    mainButtonsHeight,
} from '@helpers/layoutFoo';

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    content: {
        marginHorizontal: getHorizontalPx(40),
        paddingBottom: getVerticalPx(45),
        marginTop: getVerticalPx(10),
    },
    consentContainer: {
        flexDirection: 'row',
    },
    consentCheckbox: {padding: 10},
    title: {
        fontFamily: 'DIN2014Narrow-Light',
        fontSize: getFontSize(30),
        lineHeight: getFontSize(38),
        color: '#313131',
    },
    bottomBtn: {
        height: mainButtonsHeight(50),
        marginTop: getVerticalPx(30),
    },
});

export default styles;
