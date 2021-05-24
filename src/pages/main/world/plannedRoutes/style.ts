import {StyleSheet} from 'react-native';
import {getVerticalPx} from '../../../../helpers/layoutFoo';

const fontLight = 'DIN2014Narrow-Light';
const darkText = '#313131';

const styles = StyleSheet.create({
    header: {
        fontFamily: fontLight,
        fontSize: getVerticalPx(30),
        color: darkText,
    },
    tileWrapper: {
        marginHorizontal: 40,
        marginTop: getVerticalPx(30),
    },
    lastTile: {
        marginBottom: getVerticalPx(150),
    },
    horizontalSpace: {
        marginHorizontal: 40,
    },
});

export default styles;
