import {StyleSheet} from 'react-native';
import {getHorizontalPx, getVerticalPx} from '@helpers/layoutFoo';

const styles = StyleSheet.create({
    addressContainer: {
        position: 'absolute',
        width: getHorizontalPx(414),
        height: getHorizontalPx(414),
        left: 0,
        top: getVerticalPx(896) - getHorizontalPx(414 * 0.65),
    },
    address: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
    },
    addressName: {
        fontFamily: 'DIN2014Narrow-Regular',
        textAlign: 'left',
        fontSize: 23,
        color: '#313131',
    },
    addressPalce: {
        marginTop: 2,
        fontFamily: 'DIN2014Narrow-Light',
        textAlign: 'left',
        fontSize: 15,
        lineHeight: 19,
        color: '#555555',
    },
    addressContact: {
        marginTop: 12,
        display: 'flex',
        flexDirection: 'row',
    },
    addressEmailPhone: {
        width: '100%',
        fontFamily: 'DIN2014Narrow-Regular',
        textAlign: 'left',
        fontSize: 15,
        color: '#555555',
    },
    openHoursContainer: {
        width: '100%',
        marginTop: getVerticalPx(26),
    },
    openHours: {
        fontFamily: 'DIN2014Narrow-Regular',
        textAlign: 'left',
        fontSize: 15,
        letterSpacing: 0.42,
        color: '#555555',
    },
});

export default styles;
