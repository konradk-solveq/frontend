import {Platform, StyleSheet} from 'react-native';

import {getVerticalPx, getHorizontalPx} from '../../../helpers/layoutFoo';

const isIOS = Platform.OS === 'ios';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    scroll: {
        backgroundColor: '#ffffff',
    },
    header: {
        height: getVerticalPx(130),
        backgroundColor: '#ffffff',
        zIndex: isIOS ? 0 : 5,
    },
    title: {
        paddingTop: getVerticalPx(65 - 40),
    },
    params: {
        position: 'absolute',
        top: getVerticalPx(35),
        right: 25,
        width: getHorizontalPx(13 + 20 + 13),
        height: getHorizontalPx(13 + 20 + 13),
        zIndex: 10,
    },
    paramIcon: {
        margin: getHorizontalPx(13),
        width: getHorizontalPx(20),
        height: getHorizontalPx(20),
    },
    bikeName: {
        width: '100%',
        fontFamily: 'DIN2014Narrow-Regular',
        fontSize: 40,
        color: '#313131',
        textAlign: 'center',
    },
    bikeDetails: {
        marginTop: getVerticalPx(5),
        width: '100%',
        fontFamily: 'DIN2014Narrow-Light',
        textAlign: 'center',
        fontSize: 15,
        color: '#555555',
    },
    warranty: {
        marginTop: getVerticalPx(76),
    },
    reviews: {
        marginTop: getVerticalPx(45),
    },
    complaintsRepairs: {
        marginTop: getVerticalPx(30),
    },
    separator: {
        width: '100%',
        height: getVerticalPx(200),
    },
    map: {
        width: '100%',
    },
    btn: {
        width: '100%',
        height: 50,
        marginTop: getVerticalPx(72),
        marginBottom: getVerticalPx(110),
    },
    test: {
        backgroundColor: 'khaki',
    },
    horizontalSpace: {
        marginHorizontal: 40,
    },
});

export default styles;
