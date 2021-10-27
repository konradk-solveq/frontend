import {StyleSheet} from 'react-native';
import {getFontSize, getHorizontalPx, getVerticalPx} from '../../../../../helpers/layoutFoo';

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
        top: getVerticalPx(-5),
        left: 0,
        right: 0,
        paddingTop: getVerticalPx(20),
        paddingBottom: getVerticalPx(20),
        alignItems: 'center',
        zIndex: 10,
    },
    flatButton: {
        height: 4,
        width: getHorizontalPx(153),
        borderRadius: getHorizontalPx(3.5),
        backgroundColor: '#555555',
        zIndex: 10,
    },
    listContainer: {
        marginTop: getVerticalPx(40),
        paddingHorizontal: getHorizontalPx(40),
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
        fontSize: getFontSize(18),
        letterSpacing: 0.5,
        color: '#555555',
        width: '100%',
        textAlign: 'left',
    },
    imageContainer: {
        marginTop: getVerticalPx(15),
        borderRadius: getHorizontalPx(25),
        height: getVerticalPx(334),
        width: getVerticalPx(334),
    },
    imagePlaceholder: {
        borderRadius: getHorizontalPx(25),
        width: '100%',
        height: '100%',
        backgroundColor: '#f7f7f7',
    },
});

export default styles;
