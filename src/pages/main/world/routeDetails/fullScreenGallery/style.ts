import {StyleSheet} from 'react-native';

import {
    getFFontSize,
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';

const styles = StyleSheet.create({
    galleryWrapper: {
        flex: 1,
        backgroundColor: '#313131',
        alignItems: 'center',
        paddingBottom: getFVerticalPx(60),
    },
    closeGalleryBtnContainer: {
        position: 'absolute',
        right: getFHorizontalPx(20),
        zIndex: 10,
    },
    swiperContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    authorText: {
        color: '#ffffff',
        position: 'absolute',
        bottom: getFVerticalPx(100),
        fontSize: getFFontSize(15),
        letterSpacing: 0.42,
        fontFamily: 'DIN2014Narrow-Regular',
        left: getFHorizontalPx(40),
    },
});

export default styles;
