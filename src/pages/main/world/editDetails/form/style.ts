import {StyleSheet} from 'react-native';

import {
    getFontSize,
    getHorizontalPx,
    getVerticalPx,
    mainButtonsHeight,
} from '../../../../../helpers/layoutFoo';

const styles = StyleSheet.create({
    container: {
        marginTop: getVerticalPx(20),
        marginBottom: getVerticalPx(40),
    },
    textStyle: {
        fontFamily: 'DIN2014Narrow-Regular',
        fontSize: getFontSize(18),
        letterSpacing: 0.5,
        color: '#313131',
    },
    smallText: {
        letterSpacing: 0.42,
        fontSize: getFontSize(15),
    },
    color555555: {
        color: '#555555',
    },
    title: {
        fontSize: getFontSize(40),
        letterSpacing: 0,
    },
    lightFont: {
        fontFamily: 'DIN2014Narrow-Light',
    },
    tileWrapper: {
        marginTop: getVerticalPx(27),
        marginBottom: getVerticalPx(31),
    },
    descriptionContainer: {
        marginTop: getVerticalPx(15),
        marginBottom: getVerticalPx(30),
    },
    descriptionTitle: {
        fontSize: getFontSize(23),
        marginBottom: getVerticalPx(10),
    },
    imagesContainer: {
        marginBottom: getVerticalPx(30),
    },
    imagesTitle: {
        marginBottom: getVerticalPx(15),
    },
    mapContainer: {
        marginBottom: getVerticalPx(30),
    },
    mapImage: {
        borderRadius: getHorizontalPx(25),
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        height: getVerticalPx(285),
    },
    mImg: {
        width: '100%',
        height: '100%',
        backgroundColor: '#f7f7f7',
    },
    mapTitle: {
        marginBottom: getVerticalPx(15),
    },
    tagsContainer: {
        marginBottom: getVerticalPx(32),
    },
    tagsWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tag: {
        marginTop: getVerticalPx(15),
        paddingHorizontal: getHorizontalPx(10),
        backgroundColor: '#f0f0f0',
        marginRight: getHorizontalPx(5),
        borderRadius: getVerticalPx(14.5),
        height: getVerticalPx(29),
        justifyContent: 'center',
    },

    forgotPasswordContainer: {
        marginTop: 0,
    },
    forgotPasswordText: {
        fontFamily: 'DIN2014Narrow-Light',
        fontSize: getFontSize(18),
        letterSpacing: 0.5,
        color: '#3587ea',
        textAlign: 'right',
    },
    buttonsWrapper: {
        // marginTop: getVerticalPx(95),
    },
    onPressBtn: {
        height: mainButtonsHeight(50),
    },
    bottomBtn: {
        marginTop: getVerticalPx(30),
    },
    checkboxContainer: {
        marginBottom: getVerticalPx(40),
    },
    levelContainer: {
        marginBottom: getVerticalPx(40),
    },
    pavementContainer: {
        marginBottom: getVerticalPx(40),
    },
});

export default styles;
