import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const biggerFont = width > 365;

const styles = StyleSheet.create({
    value: {
        fontFamily: 'DIN2014Narrow-Regular',
        fontSize: biggerFont ? 57 : 51,
        color: '#313131',
    },
    valueSuffix: {
        fontFamily: 'DIN2014Narrow-Regular',
        fontSize: biggerFont ? 18 : 16,
        letterSpacing: 0.5,
        color: '#555555',
    },
});

export default styles;
