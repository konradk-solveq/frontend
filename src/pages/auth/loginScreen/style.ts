import {Platform, StyleSheet} from 'react-native';
import {
    getFontSize,
    getHorizontal,
    getHorizontalPx,
    getVerticalPx,
    mainButtonsHeight,
} from '@helpers/layoutFoo';

const isIOS = Platform.OS === 'ios';

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        width: '100%',
    },
    content: {
        marginHorizontal: getHorizontalPx(40),
        paddingBottom: getVerticalPx(45),
        marginTop: getVerticalPx(10),
    },
    title: {
        fontFamily: 'DIN2014Narrow-Light',
        fontSize: getFontSize(30),
        lineHeight: getFontSize(38),
        color: '#313131',
    },
    scroll: {
        marginTop: getHorizontalPx(isIOS ? 60 : 120),
        marginBottom: getHorizontalPx(isIOS ? 60 : 40),
    },
    outerArea: {flex: 1},
    oauthButton: {
        width: '45%',
    },
    orUse: {
        width: '100%',
        alignItems: 'center',
    },
    orUseText: {
        fontFamily: 'DIN2014Narrow-Light',
    },
    register: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        marginTop: getHorizontal(40),
    },
    registerText: {
        fontFamily: 'DIN2014Narrow-Light',
        fontSize: getFontSize(20),
    },
    registerLink: {
        fontFamily: 'DIN2014Narrow-Light',
        color: '#3587ea',
        fontSize: getFontSize(20),
    },
    forgotPasswordText: {
        fontFamily: 'DIN2014Narrow-Light',
        color: '#3587ea',
        fontSize: getFontSize(20),
    },
    oauthButtons: {
        marginTop: getHorizontalPx(25),
        width: '100%',
        height: mainButtonsHeight(50),
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    fbIcon: {
        height: getFontSize(28),
        width: getFontSize(28),
    },
});

export default styles;
