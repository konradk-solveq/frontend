import {StyleSheet} from 'react-native';
import {
    getFontSize,
    getHorizontalPx,
    getVerticalPx,
    mainButtonsHeight,
} from '@helpers/layoutFoo';

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
        fontSize: getFontSize(32),
        paddingBottom: getVerticalPx(16),
        marginHorizontal: getHorizontalPx(40),
    },
    body: {
        fontFamily: 'DIN2014Narrow-Light',
        color: '#313131',
        fontSize: getHorizontalPx(24),
        fontWeight: '800',
        marginHorizontal: getHorizontalPx(40),
    },
    buttonsContainer: {
        marginHorizontal: getHorizontalPx(40),
    },
    button: {
        height: mainButtonsHeight(50),
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
