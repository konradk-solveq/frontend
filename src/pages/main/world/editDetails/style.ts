import {StyleSheet} from 'react-native';

import {getFHorizontalPx, getFVerticalPx} from '@helpers/appLayoutDimensions';

const styles = StyleSheet.create({
    header: {
        textAlign: 'center',
        marginBottom: getFVerticalPx(36),
    },
    content: {
        marginHorizontal: getFHorizontalPx(16),
    },
});

export default styles;
