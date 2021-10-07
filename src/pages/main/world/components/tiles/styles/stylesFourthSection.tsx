import {Platform, StyleSheet} from 'react-native';
import {
    getHorizontalPx,
    getVerticalPx,
} from '../../../../../../helpers/layoutFoo';

const isIOS = Platform.OS === 'ios';

const stylesFourthSection = StyleSheet.create({
    firstColumn: {
        flexDirection: 'row',
        width: '70%',
        justifyContent: 'space-between',
    },
    secondColumn: {
        width: '30%',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    secondColumnItem: {
        marginRight: getHorizontalPx(30),
    },
    secondColumnIcon: {
        marginTop: getVerticalPx(isIOS ? 3 : 8),
        marginRight: getHorizontalPx(7),
        width: getHorizontalPx(16),
        height: getHorizontalPx(16),
    },
    secondColumnIconLower: {
        marginTop: getVerticalPx(isIOS ? 0 : 3),
    },
});

export default stylesFourthSection;
