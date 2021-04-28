import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    addressContainer: {
        position: 'absolute',
        width: width,
        height: width,
        left: 0,
        top: height - width * 0.65,
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
        width: '50%',
        fontFamily: 'DIN2014Narrow-Regular',
        textAlign: 'left',
        fontSize: 15,
        color: '#555555',
    },
});

export default styles;
