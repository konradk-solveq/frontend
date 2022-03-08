import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';

import {BigRedBtn} from '@sharedComponents/buttons';

import {
    getFontSize,
    getHorizontalPx,
    getVerticalPx,
    mainButtonsHeight,
} from '@helpers/layoutFoo';

interface IProsp {
    onPress: () => void;
}

const EmptyList: React.FC<IProsp> = ({onPress}: IProsp) => {
    const {t} = useMergedTranslation('MainWorld.PlannedRoutes');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t('emptyStateTitle')}</Text>

            <Text style={styles.text}>{t('emptyStateContent')}</Text>

            <BigRedBtn
                style={styles.btnRecord}
                title={t('emptyStateButton')}
                onpress={onPress}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: getHorizontalPx(40),
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
});

export default EmptyList;
