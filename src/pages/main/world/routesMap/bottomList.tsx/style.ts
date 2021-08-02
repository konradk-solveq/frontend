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
        zIndex: 10,
    },
    innerContainer: {
        width: '100%',
    },
    flatButtonContainer: {
        position: 'absolute',
        top: -5,
        left: 0,
        right: 0,
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: 'center',
        zIndex: 10,
    },
    flatButton: {
        height: 4,
        width: getHorizontalPx(153),
        borderRadius: 3.5,
        backgroundColor: '#555555',
        zIndex: 10,
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
    imageHeader: {
        fontFamily: 'DIN2014Narrow-Light',
        fontSize: 18,
        letterSpacing: 0.5,
        color: '#555555',
        width: '100%',
        textAlign: 'left',
    },
    imageContainer: {
        marginTop: 15,
        borderRadius: 25,
        height: getVerticalPx(334),
        width: getVerticalPx(334),
    },
    imagePlaceholder: {
        borderRadius: 25,
        width: '100%',
        height: '100%',
        backgroundColor: '#f7f7f7',
    },
});

export default styles;
