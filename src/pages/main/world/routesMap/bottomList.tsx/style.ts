import {StyleSheet} from 'react-native';
import {getHorizontalPx, getVerticalPx} from '../../../../../helpers/layoutFoo';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        zIndex: 1,
    },
    flatButtonContainer: {
        position: 'absolute',
        top: 1,
        paddingTop: 10,
        paddingBottom: 20,
        zIndex: 1,
    },
    flatButton: {
        height: 4,
        width: getHorizontalPx(153),
        borderRadius: 3.5,
        backgroundColor: '#555555',
    },
    listContainer: {
        marginTop: getVerticalPx(40),
        paddingHorizontal: 40,
        width: '100%',
    },
    imageWrapper: {
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: getVerticalPx(20),
    },
    imageContainer: {
        borderRadius: 25,
        height: 185,
        width: 185,
    },
    imagePlaceholder: {
        borderRadius: 25,
        width: '100%',
        height: '100%',
        backgroundColor: '#f7f7f7',
    },
});

export default styles;
