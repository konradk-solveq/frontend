import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    gradient: {
        position: 'absolute',
        width: width,
        height: width,
        top: 0,
        left: 0,
        zIndex: 1,
    },
});

export default styles;
