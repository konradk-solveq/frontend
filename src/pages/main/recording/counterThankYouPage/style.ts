import {StyleSheet} from 'react-native';
import {getHorizontalPx, getVerticalPx} from '../../../../helpers/layoutFoo';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
    scroll: {
        width: '100%',
        height: '100%',
    },
    title: {
        width: getHorizontalPx(334),
        left: getHorizontalPx(40),
        marginTop: getVerticalPx(90),
        fontFamily: 'DIN2014Narrow-Regular',
        fontSize: 40,
        lineHeight: 52,
        color: '#2cba3f',
        textAlign: 'center',
    },
    subTitle: {
        width: getHorizontalPx(334),
        left: getHorizontalPx(40),
        marginTop: getVerticalPx(7),
        fontFamily: 'DIN2014Narrow-Light',
        fontSize: 18,
        lineHeight: 20,
        letterSpacing: 0.5,
        color: '#555555',
        textAlign: 'center',
    },
    laurelWreath: {
        width: getHorizontalPx(334),
        height: getHorizontalPx(334),
        left: getHorizontalPx(40),
        marginTop: getVerticalPx(20),
    },
    recorded: {
        width: getHorizontalPx(334),
        left: getHorizontalPx(40),
        marginTop: getVerticalPx(20),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    name: {
        fontFamily: 'DIN2014Narrow-Light',
        fontSize: 18,
        lineHeight: 22,
        color: '#555555',
        textAlign: 'left',
    },
    value: {
        fontFamily: 'DIN2014Narrow-Regular',
        fontSize: 57,
        color: '#555555',
        textAlign: 'left',
    },
    unit: {
        fontFamily: 'DIN2014Narrow-Regular',
        fontSize: 18,
        color: '#555555',
        textAlign: 'left',
    },
    breakName: {
        fontFamily: 'DIN2014Narrow-Light',
        fontSize: 18,
        color: '#555555',
        textAlign: 'center',
        marginTop: getVerticalPx(32),
    },
    breakValue: {
        fontFamily: 'DIN2014Narrow-Regular',
        fontSize: 23,
        color: '#555555',
        textAlign: 'left',
    },
    btnContainer: {
        marginBottom: getVerticalPx(65),
        flexDirection: 'row',
        marginHorizontal: 40,
        justifyContent: 'space-between',
    },
    btnSave: {
        width: getHorizontalPx(157),
        height: 50,
        marginTop: getVerticalPx(42),
    },
    btnCancel: {
        width: getHorizontalPx(157),
        height: 50,
        marginRight: getHorizontalPx(20),
        marginTop: getVerticalPx(42),
    },
});

export default styles;