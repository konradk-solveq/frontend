import {StyleSheet} from 'react-native';
import {getHorizontalPx, getVerticalPx} from '../../../helpers/layoutFoo';

const worldStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: getVerticalPx(30),
    },
    headerWrapper: {
        position: 'absolute',
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 40,
        top: getVerticalPx(65),
        zIndex: 1,
    },
    header: {
        fontFamily: 'DIN2014Narrow-Light',
        textAlign: 'center',
        fontSize: getHorizontalPx(18),
        color: '#313131',
        width: '100%',
    },
    headerButtons: {
        flexDirection: 'row',
    },
    mapBtn: {
        marginLeft: getVerticalPx(22),
    },
    headerButton: {
        margin: 0,
    },
    headerButtonLeft: {
        marginRight: 20,
    },
    wrap: {
        width: getHorizontalPx(334),
        left: getHorizontalPx(40),
    },
    btns: {
        height: 41,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 110,
    },
    btn: {
        marginRight: getHorizontalPx(5),
    },
    title: {
        fontFamily: 'DIN2014Narrow-Regular',
        fontSize: 40,
        lineHeight: 52,
        color: '#d8232a',
        textAlign: 'center',
        marginTop: getVerticalPx(37),
    },
    text: {
        fontFamily: 'DIN2014Narrow-Light',
        fontSize: 23,
        lineHeight: 30,
        letterSpacing: 0.5,
        color: '#313131',
        textAlign: 'left',
        marginTop: getVerticalPx(20),
    },
    viewContainer: {
        flex: 1,
        marginTop: getVerticalPx(30),
    },
});

export default worldStyles;
