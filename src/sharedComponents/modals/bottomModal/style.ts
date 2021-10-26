import {StyleSheet} from 'react-native';
import {
    getFontSize,
    getHorizontalPx,
    getVerticalPx,
} from '../../../helpers/layoutFoo';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },
    pressableArea: {
        backgroundColor: 'transparent',
        height: '100%',
        width: '100%',
    },
    backGround: {
        position: 'absolute',
        height: getVerticalPx(273) * 2,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
    },
    wrap: {
        width: '100%',
        height: getVerticalPx(273),
        justifyContent: 'space-between',
        zIndex: 2,
    },
    text: {
        fontFamily: 'DIN2014Narrow-Regular',
        fontSize: getFontSize(23),
        textAlign: 'center',
        color: '#313131',
    },
    btnsWrapper: {
        marginHorizontal: getHorizontalPx(40),
        justifyContent: 'space-around',
        flexDirection: 'row',
        paddingBottom: getVerticalPx(65),
    },
    btn: {
        width: getHorizontalPx(157),
        height: getHorizontalPx(50),
    },
    leftBtn: {
        marginRight: getHorizontalPx(20),
    },
});

export default styles;
