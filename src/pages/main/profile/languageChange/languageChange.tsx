import React, {useEffect, useState} from 'react';
import {StyleSheet, View, SafeAreaView, ScrollView} from 'react-native';
import {fetchUiTranslation, setLanguage} from '@storage/actions';
import {useAppDispatch, useAppSelector} from '@hooks/redux';

import {
    useMergedTranslation,
    changeLanguage,
} from '@utils/translations/useMergedTranslation';
import GenericScreen from '@pages/template/GenericScreen';
import LanguageButton from './languageButton';
import useLanguageReloader from '@src/hooks/useLanguageReloader';
import Loader from '@sharedComponents/loader/loader';
import {commonStyle} from '@helpers/commonStyle';
import {
    languagesListSelector,
    translationsSelector,
} from '@storage/selectors/uiTranslation';
import {languagesListT, translationsT} from '@src/models/uiTranslation.models';
import {PrimaryButton} from '@src/components/buttons';
import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@src/theme/utils/appLayoutDimensions';
import {useAppNavigation} from '@src/navigation/hooks/useAppNavigation';

const ReloadItem = () => {
    useLanguageReloader();
    return null;
};

const LanguageChange: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigation = useAppNavigation();
    const {t} = useMergedTranslation('LanguageChange');

    const language: string = useAppSelector(state => state.user.language);
    const [inputLanguage, setInputLanguage] = useState<string>('');
    const languageList: languagesListT = useAppSelector(languagesListSelector);
    const translations: translationsT = useAppSelector(translationsSelector);
    const [fetchingTranslation, setFetchingTranslation] = useState<boolean>(
        false,
    );
    const [goBack, setGoBack] = useState<boolean>(false);
    const [reload, setReload] = useState<boolean>(false);

    useEffect(() => {
        setInputLanguage(language);
    }, [language]);

    const handleSetInputLanguage = (value: string) => {
        setInputLanguage(value);
    };

    const startFetchingTranslation = (d: any) =>
        new Promise(resolve => {
            d(fetchUiTranslation(true));
            resolve(true);
        });

    const handleSaveLanguage = () => {
        if (typeof translations[inputLanguage] === 'undefined') {
            setFetchingTranslation(true);
            startFetchingTranslation(dispatch).then(() => {
                setReload(true);
                setTimeout(() => {
                    setFetchingTranslation(false);
                }, 300);
            });
        }

        dispatch(setLanguage(inputLanguage));
        changeLanguage(inputLanguage, languageList);
        setGoBack(true);
    };

    useEffect(() => {
        if (!fetchingTranslation && goBack) {
            navigation.goBack();
        }
    }, [fetchingTranslation, goBack, navigation]);

    const styles = StyleSheet.create({
        scroll: {
            height: '100%',
            flex: 1,
        },
        area: {
            top: getFVerticalPx(100),
            flex: 1,
            width: '100%',
        },
        saveButton: {
            position: 'absolute',
            width: getFHorizontalPx(294),
            bottom: getFVerticalPx(50),
            alignSelf: 'center',
        },
        spinnerStyle: {
            width: getFHorizontalPx(200),
            height: getFHorizontalPx(200),
        },
    });

    if (fetchingTranslation) {
        return (
            <SafeAreaView style={commonStyle.container}>
                <Loader spinnerStyle={styles.spinnerStyle} />
            </SafeAreaView>
        );
    }

    return (
        <GenericScreen screenTitle={t('header')}>
            {reload && <ReloadItem />}
            <ScrollView style={styles.area}>
                <View>
                    {languageList.map((e, i) => {
                        return (
                            <LanguageButton
                                key={'lang_' + i}
                                active={inputLanguage === e.code}
                                onPress={() => handleSetInputLanguage(e.code)}
                                title={e.name}
                                svg={e.icon}
                                separator={languageList.length - 1 !== i}>
                                <View />
                            </LanguageButton>
                        );
                    })}
                </View>
            </ScrollView>
            <PrimaryButton
                style={styles.saveButton}
                text={t('btn')}
                onPress={handleSaveLanguage}
                withoutShadow
                testID={'language-change-submit-button'}
            />
        </GenericScreen>
    );
};

export default LanguageChange;
