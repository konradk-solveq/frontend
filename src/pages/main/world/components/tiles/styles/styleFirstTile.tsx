import { StyleSheet } from 'react-native';
import {
    getHorizontalPx,
    getVerticalPx,
} from '../../../../../../helpers/layoutFoo';

export const firstTileStyles = StyleSheet.create({
    bikeIconFontWrap: {
        height: 16,
        top: -1,
    },
    bikeIconFont: {
        marginLeft: 0,
        marginRight: 5,
        fontFamily: 'mykross',
        fontSize: 16,
    },
    clockIconFontWrap: {
        top: 0,
    },
    clockIconFont: {
        marginLeft: 0,
        marginRight: 5,
        fontFamily: 'mykross',
        fontSize: 15,
    },
});

export default firstTileStyles;
