import {StyleSheet} from 'react-native';
import {getVerticalPx} from '../../../helpers/layoutFoo';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    wrap: {
        flex: 1,
        marginHorizontal: 40,
        marginBottom: getVerticalPx(65),
        justifyContent: 'space-between',
    },
    headerWrapper: {
        // marginBottom: getVerticalPx(30),
    },
    header: {
        fontFamily: 'DIN2014Narrow-Regular',
        textAlign: 'center',
        fontSize: 40,
        paddingVertical: 5,
        color: '#d8232a',
    },
    imgage: {
        marginTop: -getVerticalPx(20),
        height: getVerticalPx(416),
        marginHorizontal: -40,
    },
    contentWrapper: {
        // marginTop: getVerticalPx(20),
        // marginBottom: getVerticalPx(5),
    },
    content: {
        fontFamily: 'DIN2014Narrow-Light',
        fontSize: 23,
        color: '#414141',
    },
    buttonsWrapper: {
        marginTop: getVerticalPx(50),
    },
    onPressBtn: {
        height: 50,
    },
    bottomBtn: {
        marginTop: getVerticalPx(30),
    },
    iconContainer: {
        alignItems: 'flex-end',
    },
    icon: {
        marginBottom: getVerticalPx(30),
    },
});

export default styles;
