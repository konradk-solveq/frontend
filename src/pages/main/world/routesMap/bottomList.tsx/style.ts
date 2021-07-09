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
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    flatButtonContainer: {
        position: 'absolute',
        top: 1,
        paddingVertical: 20,
        zIndex: 1,
    },
    flatButton: {
        height: 4,
        width: getHorizontalPx(153),
        borderRadius: 3.5,
        backgroundColor: '#555555',
    },
    listContainer: {
        marginTop: getVerticalPx(60),
    },
    listContentContainer: {
        marginHorizontal: 40,
    },
});

export default styles;
