import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import I18n from 'react-native-i18n';

import {BigRedBtn} from '../../../../sharedComponents/buttons';

import {
    getFontSize,
    getHorizontalPx,
    getVerticalPx,
    mainButtonsHeight,
} from '../../../../helpers/layoutFoo';

interface IProsp {
    onPress: () => void;
}

const EmptyList: React.FC<IProsp> = ({onPress}: IProsp) => {
    const trans: any = I18n.t('MainWorld.PlannedRoutes');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{trans.emptyStateTitle}</Text>

            <Text style={styles.text}>{trans.emptyStateContent}</Text>

            <BigRedBtn
                style={styles.btnRecord}
                title={trans.emptyStateButton}
                onpress={onPress}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 40,
    },
    title: {
        fontFamily: 'DIN2014Narrow-Regular',
        fontSize: getFontSize(40),
        lineHeight: getFontSize(52),
        color: '#d8232a',
        textAlign: 'center',
        marginTop: getVerticalPx(37),
    },
    text: {
        fontFamily: 'DIN2014Narrow-Light',
        fontSize: getFontSize(23),
        lineHeight: getFontSize(30),
        letterSpacing: 0.5,
        color: '#313131',
        textAlign: 'left',
        marginTop: getVerticalPx(20),
    },
    btnRecord: {
        height: mainButtonsHeight(50),
        width: '100%',
        marginTop: getVerticalPx(40),
    },
    btnCheck: {
        height: mainButtonsHeight(50),
        width: '100%',
        marginTop: getVerticalPx(30),
    },
});

export default EmptyList;
