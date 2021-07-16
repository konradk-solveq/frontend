import {StyleSheet} from 'react-native';
import {getVerticalPx} from '../../../../../helpers/layoutFoo';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
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
});

export default styles;