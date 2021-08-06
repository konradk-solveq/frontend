import {StyleSheet} from 'react-native';
import {
    getHorizontalPx,
    getVerticalPx,
} from '../../../../../../helpers/layoutFoo';

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
        flexDirection: 'row',
    },
    secondColumnIcon: {
        marginTop: getVerticalPx(8),
        marginRight: getHorizontalPx(7),
        width: getHorizontalPx(16),
        height: getHorizontalPx(16),
    },
});

export default stylesFourthSection;
