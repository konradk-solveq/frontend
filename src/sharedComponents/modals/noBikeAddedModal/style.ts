import {StyleSheet} from 'react-native';
import {
    getFontSize,
    getHorizontalPx,
    getVerticalPx,
    mainButtonsHeight,
} from '../../../helpers/layoutFoo';
import {commonStyle as comStyle} from '@helpers/commonStyle';

const styles = StyleSheet.create({
    container: {
        ...comStyle.container,
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    wrap: {
        flex: 1,
        marginHorizontal: getHorizontalPx(40),
        marginBottom: getVerticalPx(65),
        justifyContent: 'space-between',
    },
    headerWrapper: {
        // marginBottom: getVerticalPx(30),
    },
    header: {
        fontFamily: 'DIN2014Narrow-Regular',
        textAlign: 'center',
        fontSize: getFontSize(40),
        paddingVertical: getVerticalPx(5),
        color: '#d8232a',
    },
    imgage: {
        marginTop: -getVerticalPx(20),
        height: getVerticalPx(416),
        marginHorizontal: getHorizontalPx(-40),
    },
    contentWrapper: {
        // marginTop: getVerticalPx(20),
        // marginBottom: getVerticalPx(5),
    },
    content: {
        fontFamily: 'DIN2014Narrow-Light',
        fontSize: 23,
        color: '#414141',
    },
    buttonsWrapper: {
        marginTop: getVerticalPx(50),
    },
    onPressBtn: {
        height: mainButtonsHeight(50),
    },
    bottomBtn: {
        marginTop: getVerticalPx(30),
    },
    iconContainer: {
        alignItems: 'flex-end',
    },
    icon: {
        marginBottom: getVerticalPx(30),
    },
});

export default styles;
