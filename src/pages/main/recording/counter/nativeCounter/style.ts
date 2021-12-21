import {StyleSheet} from 'react-native';
import {getHorizontalPx, getVerticalPx} from '@helpers/layoutFoo';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        width: getHorizontalPx(414),
        backgroundColor: '#fff',
        zIndex: 2,
    },
    wrap: {
        position: 'absolute',
        width: getHorizontalPx(334),
        left: getHorizontalPx(40),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 0,
    },
    cell: {
        top: 0,
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        // backgroundColor: 'red'
    },
    labelWrap: {
        position: 'absolute',
        top: getVerticalPx(21),
        color: '#555',
    },
    label: {
        fontFamily: 'DIN2014Narrow-Light',
        letterSpacing: 0.5,
        color: '#555',
    },
    rightLabel: {
        marginLeft: getHorizontalPx(30),
    },
    arrowBtnWrap: {
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 15,
    },
    bottomPlug: {
        position: 'absolute',
        left: 0,
        height: getVerticalPx(896),
        width: getHorizontalPx(414),
        backgroundColor: '#fff',
        zIndex: 1,
    },
    findMeWrap: {
        position: 'absolute',
        right: getHorizontalPx(40),
        width: getHorizontalPx(41),
        height: getHorizontalPx(41 + 41 + 20),
        zIndex: 1,
    },
});

export default styles;
