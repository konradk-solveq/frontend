import {StyleSheet} from 'react-native';
import {getHorizontalPx} from '../../../../../../helpers/layoutFoo';

const styles = StyleSheet.create({
    container: {
        paddingVertical: 7,
    },
    row: {
        flexDirection: 'row',
    },
    tile: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftTileCell: {
        width: '90%',
        marginRight: -10,
    },
    leftCell: {
        marginRight: getHorizontalPx(30),
    },
    textRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 7,
    },
    title: {
        fontFamily: 'DIN2014Narrow-Regular',
        fontSize: 23,
        color: '#313131',
        lineHeight: 29,
    },
    distance: {
        fontFamily: 'DIN2014Narrow-Regular',
        fontSize: 23,
        color: '#313131',
        lineHeight: 29,
    },
    suffix: {
        fontFamily: 'DIN2014Narrow-Regular',
        fontSize: 18,
        letterSpacing: 0.5,
        color: '#555555',
        marginLeft: 5,
    },
    time: {
        fontFamily: 'DIN2014Narrow-Regular',
        fontSize: 23,
        color: '#313131',
    },
    distanceToRoute: {
        fontFamily: 'DIN2014Narrow-Light',
        fontSize: 15,
        color: '#555555',
        lineHeight: 19,
    },
    button: {
        width: 39,
        height: 35,
        marginTop: 10,
    },
    buttonText: {
        fontFamily: 'DIN2014Narrow-Regular',
        fontSize: 18,
        letterSpacing: 0.5,
        color: '#ffffff',
    },
});

export default styles;
