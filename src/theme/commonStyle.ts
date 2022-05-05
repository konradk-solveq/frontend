import {Dimensions, StyleSheet} from 'react-native';

import {getAppLayoutConfig as get} from '@theme/appLayoutConfig';
import {isIOS} from '@utils/platform';
import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';

const {width, height} = Dimensions.get('screen');

export const navBarHeight = getFVerticalPx(88);
export const appContainerHorizontalMargin = getFHorizontalPx(16);
export const appBottomMargin = getFVerticalPx(40);
export const screenWidth = width;
export const screenHeight = height;
export const SMALL_SCREEN_HEIGHT = 670;

export const commonStyle = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
    },
    scroll: {
        position: 'absolute',
        width: '100%',
        height: getFVerticalPx(796) + (isIOS ? 0 : get.statusBarH()),
        top: navBarHeight,
    },
});
