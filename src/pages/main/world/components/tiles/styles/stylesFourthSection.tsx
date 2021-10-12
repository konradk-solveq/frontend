import { Platform, StyleSheet } from 'react-native';
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
        left: 10,
        top: 8,
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
    moreIconFontWrap: {
        height: 20,
        width: 36,
    },
    moreIconFont: {
        top: 8,
        left: 4,
        marginLeft: 0,
        marginRight: 5,
        fontFamily: 'mykross',
        fontSize: 4.15,
        textAlign: 'center',
    },
});

export default stylesFourthSection;
