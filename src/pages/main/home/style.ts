import {Dimensions, StyleSheet} from 'react-native';
import {getVerticalPx} from '../../../helpers/layoutFoo';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container1: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
    },
    header: {
        position: 'absolute',
        width: width,
        height: getVerticalPx(20),
        top: getVerticalPx(65),
        zIndex: 1,
        alignItems: 'center',
    },
    tileWrapper: {
        top: getVerticalPx(138),
        paddingBottom: getVerticalPx(260),
    },
    tileSpace: {
        marginBottom: 25,
    },
});

export default styles;
