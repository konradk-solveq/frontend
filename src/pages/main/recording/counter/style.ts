import {StyleSheet} from 'react-native';
import {getVerticalPx} from '../../../../helpers/layoutFoo';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        zIndex: 1,
    },
    backGround: {
        position: 'absolute',
        height: getVerticalPx(180) * 2,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
    },
    textContainer: {
        position: 'absolute',
        height: getVerticalPx(120) * 2,
        left: 0,
        right: 0,
        marginHorizontal: 40,
        bottom: 0,
        zIndex: 2,
    },
    text: {
        fontFamily: 'DIN2014Narrow-Light',
        fontSize: 23,
        color: '#313131',
        letterSpacing: 0,
        textAlign: 'left',
        marginTop: 20,
    },
});

export default styles;
