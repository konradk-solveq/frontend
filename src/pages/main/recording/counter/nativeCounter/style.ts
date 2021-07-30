import {StyleSheet} from 'react-native';
import {
    getHeightOfPx,
    getHorizontalPx,
    getVerticalPx,
} from '../../../../../helpers/layoutFoo';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        // bottom:  0,
        left: 0,
        right: 0,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    wrap: {
        height: getVerticalPx(334),
        width: '100%',
        left: getVerticalPx(40),
    },
    row: {
        flexDirection: 'row',
        height: '50%',
        alignItems: 'center',
        marginTop: 0,
    },
    cell: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
    },
    labelWrap: {
        position: 'absolute',
        top: 21,
        fontFamily: 'DIN2014Narrow-Light',
        fontSize: 18,
        letterSpacing: 0.5,
        color: '#555555',
    },
    label: {
        fontFamily: 'DIN2014Narrow-Light',
        fontSize: 18,
        letterSpacing: 0.5,
        color: '#555555',
    },
    rightLabel: {
        marginLeft: 30,
    },
    arrowBtnWrap: {
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 15,
        // opacity: .5,
    },
    bottomPlug: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: getHorizontalPx(414),
        backgroundColor: '#fff',
        zIndex: 1,
    },
    findMeWrap: {
        position: 'absolute',
        right: getHorizontalPx(40),
        width: getHorizontalPx(41),
        height: getHorizontalPx(41),
        zIndex: 2,
    },
});

export default styles;
