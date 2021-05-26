import {Dimensions, StyleSheet} from 'react-native';
import {getVerticalPx} from '../../helpers/layoutFoo';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    scrollViewContainer: {
        backgroundColor: '#ffffff',
    },
    animatedContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        overflow: 'hidden',
    },
    animatedOverlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        zIndex: 100,
        backgroundColor: '#ffffff',
    },
    animatedScrollview: {
        flex: 1,
    },
    imageContainer: {
        alignSelf: 'center',
        marginTop: 0,
        width: '100%',
        overflow: 'hidden',
        height: getVerticalPx(300),
        alignItems: 'center',
        zIndex: 2,
    },
    circleShape: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        width: width,
        transform: [{scaleX: 1.7}],
        height: getVerticalPx(300),
        position: 'absolute',
        bottom: 0,
        overflow: 'hidden',
        alignItems: 'center',
    },
    image: {
        height: getVerticalPx(300),
        width: width,
        transform: [{scaleX: 0.6}],
    },
    placeholderWrapper: {
        height: getVerticalPx(300),
        backgroundColor: '#f1f1f1',
    },
    placeholderImage: {
        height: getVerticalPx(142),
        width: width,
        transform: [{scaleX: 0.6}],
    },
});

export default styles;
