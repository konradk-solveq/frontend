import {StyleSheet} from 'react-native';

import {getFontSize, getHorizontalPx} from '@helpers/layoutFoo';
import {navBarHeight} from '@theme/commonStyle';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: navBarHeight,
        zIndex: 1,
    },
    wrap: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'DIN2014Narrow-Light',
        textAlign: 'center',
        fontSize: getFontSize(18),
        color: '#313131',
    },
    actionButtonsWraper: {
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
    actionButtons: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginRight: getHorizontalPx(40),
    },
});

export default styles;

// setObjSize(414, 34);
//     const wrap = {
//         position: 'absolute',
//         left: 0,
//         top: getHorizontalPx(61)- (isIOS ? 0 : get.statusBarH()),
//         width: ww,
//         height: getHeightPx(),
//     };

//     setObjSize(226, 23);
//     const title = {
//         position: 'absolute',
//         width: getWidthPx(),
//         left: getCenterLeftPx(),
//         top: getVerticalPx(8) ,
//         fontFamily: 'DIN2014Narrow-Light',
//         textAlign: 'center',
//         fontSize: getFontSize(18),
//         color: '#313131',
//     };

//     const styles = StyleSheet.create({
//         container: {
//             position: 'absolute',
//             left: 0,
//             top: 0,
//             width: '100%',
//             height: getVerticalPx(100) - (isIOS ? 0 : get.statusBarH()),
//         },
//         wrap,
//         title,
//         actionButtons: {
//             marginTop: getHorizontalPx(3),
//             alignItems: 'flex-end',
//             marginRight: getHorizontalPx(40),
//         },
//     });
