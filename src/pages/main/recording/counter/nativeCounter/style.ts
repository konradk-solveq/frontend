import {StyleSheet} from 'react-native';
import {getVerticalPx} from '../../../../../helpers/layoutFoo';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        // top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        // height: '100%',
        // opacity: 0.5,
    },
    displayContainer: {
        backgroundColor: 'lightblue',
        height: getVerticalPx(334),
        width: '100%',
        paddingHorizontal: 40,
    },
    displayRow: {
        flexDirection: 'row',
        height: '50%',
        // backgroundColor: 'red',
        alignItems: 'center',
    },
    displayCell: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
    },
    displayRightCell: {
        marginLeft: 20,
    },
    displayLeftTopCell: {
        borderRightColor: 'rgba(49, 49, 49, 0.1)',
        borderRightWidth: 1,
        borderBottomColor: 'rgba(49, 49, 49, 0.1)',
        borderBottomWidth: 1,
    },
    displayRightBottomCell: {
        borderLeftColor: 'rgba(49, 49, 49, 0.1)',
        borderLeftWidth: 1,
        borderTopColor: 'rgba(49, 49, 49, 0.1)',
        borderTopWidth: 1,
    },
    displayLabel: {
        position: 'absolute',
        top: 21,
        fontFamily: 'DIN2014Narrow-Light',
        fontSize: 18,
        letterSpacing: 0.5,
        color: '#555555',
    },
    displayRightBottomLabel: {
        marginLeft: 20,
    },
    displayValue: {
        fontFamily: 'DIN2014Narrow-Regular',
        fontSize: 57,
        color: '#313131',
    },
    displayValueSuffix: {
        fontFamily: 'DIN2014Narrow-Regular',
        fontSize: 18,
        letterSpacing: 0.5,
        color: '#555555',
    },
    arrowBtnContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 15,
    },
});

export default styles;
