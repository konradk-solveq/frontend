import {getFontSize} from '@src/helpers/layoutFoo';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    value: {
        fontFamily: 'DIN2014Narrow-Regular',
        fontSize: getFontSize(57),
        color: '#313131',
    },
    valueSuffix: {
        fontFamily: 'DIN2014Narrow-Regular',
        fontSize: getFontSize(18),
        letterSpacing: 0.5,
        color: '#555555',
    },
});

export default styles;
