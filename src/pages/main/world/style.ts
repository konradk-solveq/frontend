import {StyleSheet} from 'react-native';
import {getHorizontalPx, getVerticalPx} from '@helpers/layoutFoo';

const worldStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: getVerticalPx(30),
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
        marginRight: getHorizontalPx(20),
    },
    wrap: {
        width: getHorizontalPx(334),
        left: getHorizontalPx(40),
    },
    btns: {
        height: getHorizontalPx(41),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: getVerticalPx(38),
    },
    btn: {
        marginRight: getHorizontalPx(5),
    },
    title: {
        color: '#d8232a',
        textAlign: 'center',
        marginTop: getVerticalPx(37),
    },
    text: {
        marginTop: getVerticalPx(20),
    },
    viewContainer: {
        flex: 1,
        marginTop: getVerticalPx(30),
    },
});

export default worldStyles;
