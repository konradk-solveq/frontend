import { Platform, StyleSheet } from 'react-native';
import {
    getFontSize,
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
        left: getHorizontalPx(10),
        top: getHorizontalPx(8),
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
        height: getHorizontalPx(20),
        width: getHorizontalPx(36),
    },
    moreIconFont: {
        top: getHorizontalPx(8),
        left: getHorizontalPx(4),
        marginLeft: 0,
        marginRight: getHorizontalPx(5),
        fontFamily: 'mykross',
        fontSize: getFontSize(4.15),
        textAlign: 'center',
    },
});

export default stylesFourthSection;
