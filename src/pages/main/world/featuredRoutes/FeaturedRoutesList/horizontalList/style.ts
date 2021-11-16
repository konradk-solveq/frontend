import {StyleSheet} from 'react-native';
import {getHorizontalPx, getVerticalPx} from '@helpers/layoutFoo';

const styles = StyleSheet.create({
    tileWrapper: {
        marginTop: getVerticalPx(30),
        marginBottom: getVerticalPx(18),
        marginHorizontal: getHorizontalPx(40),
        width: getHorizontalPx(334),
    },
});

export const horizontalStyles = StyleSheet.create({
    middleTile: {
        marginRight: -getHorizontalPx(20),
    },
});

export default styles;
