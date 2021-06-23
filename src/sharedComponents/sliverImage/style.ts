import {Dimensions, Platform, StyleSheet} from 'react-native';
import {getVerticalPx} from '../../helpers/layoutFoo';

const {width} = Dimensions.get('window');
const isIOS = Platform.OS === 'ios';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContainer: {
        backgroundColor: 'white',
        paddingTop: getVerticalPx(50),
        zIndex: 10,
    },
    boxShadow: {
        shadowOffset: {height: 0, width: 2},
        elevation: 1,
        height: '100%',
        width: '100%',
        paddingTop: 130,
    },
    animatedContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        overflow: 'hidden',
    },
    animatedOverlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: '#ffffff',
        zIndex: 3,
    },
    animatedScrollview: {
        flex: 1,
        zIndex: 1,
    },
    imageContainer: {
        alignSelf: 'center',
        marginTop: getVerticalPx(148),
        width: '100%',
        overflow: 'hidden',
        height: getVerticalPx(300),
        alignItems: 'center',
    },
    circleShape: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        width: width,
        transform: [{scaleX: 1.7}],
        height: getVerticalPx(300),
        position: 'absolute',
        bottom: 0,
        overflow: 'hidden',
        alignItems: 'center',
    },
    shadowBox: {
        height: getVerticalPx(40),
        width: '100%',
        position: 'absolute',
        bottom: isIOS ? -40 : 0,
        left: 0,
        right: 0,
        zIndex: 30,
        shadowColor: 'red',
        shadowOffset: {height: -50, width: 0},
        shadowRadius: 20,
        elevation: 115,
        shadowOpacity: isIOS ? 1 : 0.8,
        backgroundColor: `rgba(255,0,0,${isIOS ? 0.1 : 0})`,
    },
    image: {
        height: getVerticalPx(195),
        width: width,
        transform: [{scaleX: 0.6}],
    },
    arrowBtnContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 15,
    },
    headerElement: {
        position: 'absolute',
        top: getVerticalPx(100),
        left: 0,
        right: 0,
    },
});

export default styles;
