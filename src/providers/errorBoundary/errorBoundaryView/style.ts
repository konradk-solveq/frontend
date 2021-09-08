import {StyleSheet} from 'react-native';
import {getHorizontalPx, getVerticalPx} from '@helpers/layoutFoo';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    content: {
        height: '100%',
        justifyContent: 'space-between',
    },
    title: {
        fontFamily: 'DIN2014Narrow-Regular',
        color: '#313131',
        fontSize: 32,
        paddingBottom: 16,
        marginHorizontal: 40,
    },
    body: {
        fontFamily: 'DIN2014Narrow-Light',
        color: '#313131',
        fontSize: 24,
        fontWeight: '800',
        marginHorizontal: 40,
    },
    buttonsContainer: {
        marginHorizontal: 40,
    },
    button: {
        height: 60,
    },
    restartButton: {
        marginTop: getVerticalPx(20),
        marginBottom: getVerticalPx(60),
    },
    image: {
        marginTop: getVerticalPx(80),
        width: getHorizontalPx(414 + 95 + 95),
        left: getHorizontalPx(-95),
        height: getHorizontalPx(296),
    },
});

export default styles;
