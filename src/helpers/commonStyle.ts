import {StyleSheet, Platform} from 'react-native';
import {getAppLayoutConfig as get} from '@theme/appLayoutConfig';
import {getVerticalPx} from '@helpers/layoutFoo';

const isIOS = Platform.OS === 'ios';

export const commonStyle = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
    },
    scroll: {
        position: 'absolute',
        width: '100%',
        height: getVerticalPx(796) + (isIOS ? 0 : get.statusBarH()),
        top: getVerticalPx(100) - (isIOS ? 0 : get.statusBarH()),
    },
});
