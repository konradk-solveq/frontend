import {StyleSheet} from 'react-native';

import {
    getFontSize,
    getHorizontalPx,
    getVerticalPx,
    mainButtonsHeight,
} from '@helpers/layoutFoo';

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    headerContainer: {
        flexDirection: 'row',
    },
    headerBackground: {
        zIndex: 1,
        backgroundColor: '#ffffff',
        position: 'absolute',
        left: 0,
        right: 0,
    },
    header: {
        zIndex: 3,
    },
    actionButtonsContainer: {
        flexDirection: 'row',
    },
    actionButton: {
        margin: 0,
    },
    leftActionButton: {
        marginRight: getHorizontalPx(20),
    },
    content: {
        marginHorizontal: getHorizontalPx(40),
        marginBottom: getVerticalPx(35),
    },
    reportButton: {
        height: mainButtonsHeight(50),
    },
    removeRouteButton: {
        marginTop: getVerticalPx(30),
        height: mainButtonsHeight(50),
    },
    textButtonContainer: {
        width: '100%',
        height: '100%',
    },
    textButton: {
        fontFamily: 'DIN2014Narrow-Light',
        fontSize: getFontSize(18),
        letterSpacing: 0.5,
        lineHeight: getFontSize(24),
        color: '#555555',
    },
    textbuttonAction: {
        color: '#3587ea',
    },
    buttonBottomDistance: {
        marginBottom: getVerticalPx(30),
    },
});

export default styles;
