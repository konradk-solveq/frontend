import {StyleSheet} from 'react-native';

import {getAppLayoutConfig as get} from '@theme/appLayoutConfig';
import {getVerticalPx} from '@helpers/layoutFoo';
import {isIOS} from '@utils/platform';

export const navBarHeight = getVerticalPx(100);

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
        top: navBarHeight,
    },
});