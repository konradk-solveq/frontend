import {StyleSheet} from 'react-native';
import {getFontSize, getHorizontalPx, getVerticalPx} from '@helpers/layoutFoo';

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        width: '100%',
    },
    content: {
        marginHorizontal: getHorizontalPx(40),
        paddingBottom: getVerticalPx(45),
        marginTop: getVerticalPx(10),
        alignItems: 'center',
        height: '100%',
        justifyContent: 'space-between',
    },
    title: {
        fontFamily: 'DIN2014Narrow-Light',
        fontSize: getFontSize(30),
        lineHeight: getFontSize(38),
        color: '#313131',
    },
    shareImageContainer: {
        width: getHorizontalPx(358),
        height: getVerticalPx(239),
        backgroundColor: '#ffffff',
        borderRadius: 12,
    },
    sharebutton: {
        height: getVerticalPx(40),
        width: getHorizontalPx(40),
    },
});

export default styles;
