import {StyleSheet} from 'react-native';
import {getHorizontalPx, getVerticalPx} from '../../../../../helpers/layoutFoo';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    pressableArea: {
        backgroundColor: 'transparent',
        height: '100%',
        width: '100%',
    },
    backGround: {
        position: 'absolute',
        height: getVerticalPx(332) * 2,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
    },
    wrap: {
        height: getVerticalPx(332),
        width: getHorizontalPx(334),
        marginHorizontal: 40,
        position: 'absolute',
        bottom: 0,
        zIndex: 2,
    },
    text: {
        fontFamily: 'DIN2014Narrow-Light',
        fontSize: 23,
        color: '#313131',
        letterSpacing: 0,
        textAlign: 'left',
        marginBottom: getVerticalPx(30),
    },
});

export default styles;
