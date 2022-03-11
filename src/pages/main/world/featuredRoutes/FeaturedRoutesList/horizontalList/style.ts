import {StyleSheet} from 'react-native';
import {getFHorizontalPx} from '@src/helpers/appLayoutDimensions';

const styles = StyleSheet.create({
    tileWrapper: {
        marginTop: getFHorizontalPx(30),
        marginBottom: getFHorizontalPx(18),
        width: getFHorizontalPx(16 + 342 + 16),
    },
});

export const horizontalStyles = StyleSheet.create({
    middleTile: {
        marginRight: -getFHorizontalPx(20),
    },
});

export default styles;
