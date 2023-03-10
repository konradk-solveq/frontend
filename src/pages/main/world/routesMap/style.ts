import {Dimensions, StyleSheet} from 'react-native';
import {getHorizontalPx, getVerticalPx} from '../../../../helpers/layoutFoo';
import {commonStyle as comStyle} from '@helpers/commonStyle';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        ...comStyle.container,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    innerContainer: {
        flex: 1,
    },
    wrap: {
        ...StyleSheet.absoluteFillObject,
        width: width,
        height: height,
    },
    fullView: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: height * 1.04,
        zIndex: 0,
    },
    gradient: {
        position: 'absolute',
        width: width,
        height: width - getVerticalPx(250),
        transform: [{scaleX: 3}],
        top: 0,
        left: 0,
    },
    btns: {
        position: 'absolute',
        left: getHorizontalPx(40),
        top: getVerticalPx(138),
        height: getHorizontalPx(41),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    btn: {
        marginRight: getHorizontalPx(5),
    },
    actionButtonsContainer: {
        flexDirection: 'row',
    },
    actionButton: {
        margin: 0,
    },
    findWrap: {
        position: 'absolute',
        right: getHorizontalPx(40),
        width: getHorizontalPx(41),
        height: getHorizontalPx(41),
    },
});

export default styles;
