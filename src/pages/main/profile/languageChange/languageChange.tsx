import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {setLanguage} from '@storage/actions';
import {useAppDispatch, useAppSelector} from '@hooks/redux';

import {
    getHorizontalPx,
    getVerticalPx,
    getVertical,
    mainButtonsHeight,
} from '@helpers/layoutFoo';

import {
    useMergedTranslation,
    changeLanguage,
} from '@utils/translations/useMergedTranslation';
import GenericScreen from '@pages/template/GenericScreen';
import BigRedBtn from '@sharedComponents/buttons/bigRedBtn';
import LanguageButton from './languageButton';
import {data} from './data';

interface Props {
    navigation: any;
}

const LanguageChange: React.FC<Props> = ({navigation}: Props) => {
    const dispatch = useAppDispatch();
    const {t} = useMergedTranslation('LanguageChange');

    const language: string = useAppSelector(state => state.user.language);
    const [inputLanguage, setInputLanguage] = useState('');

    useEffect(() => {
        setInputLanguage(language);
    }, [language]);

    const handleSetInputLanguage = (value: string) => {
        setInputLanguage(value);
    };

    const handleSaveLanguage = () => {
        dispatch(setLanguage(inputLanguage));
        changeLanguage(inputLanguage);
        navigation.goBack();
    };

    const styles = StyleSheet.create({
        scroll: {
            top: getVerticalPx(100),
        },
        outerArea: {
            flex: 1,
        },
        area: {
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            minHeight: getVertical(414),
        },
        btn: {
            position: 'absolute',
            width: getHorizontalPx(334),
            height: mainButtonsHeight(50),
            bottom: getVerticalPx(65 + 100),
        },
    });

    return (
        <GenericScreen screenTitle={t('header')}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.outerArea}
                style={styles.scroll}>
                <View style={styles.area}>
                    <View>
                        {data.map((e, i) => {
                            return (
                                <LanguageButton
                                    key={'lang_' + i}
                                    active={inputLanguage === e.short}
                                    onPress={() =>
                                        handleSetInputLanguage(e.short)
                                    }
                                    title={e.name}
                                    svg={e.svg}
                                    separator={true}>
                                    <View />
                                </LanguageButton>
                            );
                        })}
                        <LanguageButton
                            active={inputLanguage === ''}
                            onPress={() => handleSetInputLanguage('')}
                            title={t('byLocation')}
                            separator={false}>
                            <View />
                        </LanguageButton>
                    </View>
                    <BigRedBtn
                        style={styles.btn}
                        title={t('btn')}
                        onpress={() => handleSaveLanguage()}
                    />
                </View>
            </ScrollView>
        </GenericScreen>
    );
};

export default LanguageChange;
