import { StyleSheet } from 'react-native';
import {
    getHorizontalPx,
} from '../../../../../../helpers/layoutFoo';

export const firstTileStyles = StyleSheet.create({
    bikeIconFontWrap: {
        height: 16,
        top: -1,
    },
    bikeIconFont: {
        marginLeft: 0,
        marginRight: getHorizontalPx(5),
        fontFamily: 'mykross',
        fontSize: getHorizontalPx(16),
    },
    clockIconFontWrap: {
        top: 0,
    },
    clockIconFont: {
        marginLeft: 0,
        marginRight: getHorizontalPx(5),
        fontFamily: 'mykross',
        fontSize: getHorizontalPx(15),
    },
});

export default firstTileStyles;
