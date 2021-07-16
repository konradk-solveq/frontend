import {Dimensions, Platform, StyleSheet} from 'react-native';
import {getHorizontalPx, getVerticalPx} from '../../../../helpers/layoutFoo';

const {width, height} = Dimensions.get('window');
const isIOS = Platform.OS === 'ios';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
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
        height: '100%',
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
        top: getVerticalPx(isIOS ? 148 : 108),
        height: 41,
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
});

export default styles;
