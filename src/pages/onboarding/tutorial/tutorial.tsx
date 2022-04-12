import React, {useEffect, useCallback, useMemo, useState} from 'react';
import {
    fetchAppRegulations,
    fetchUiTranslation,
    setLanguage,
} from '@storage/actions';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {OnboardingStackRoute} from '@navigation/route';
import OnboardingContainer from '@containers/Onboarding/OnboardingContainer';
import {useNavigation} from '@react-navigation/native';
import GenericScreen from '@pages/template/GenericScreen';
import {
    useMergedTranslation,
    changeLanguage,
} from '@utils/translations/useMergedTranslation';
import {languagesListT, translationsT} from '@models/uiTranslation.models';
import {
    languagesListSelector,
    translationsSelector,
} from '@storage/selectors/uiTranslation';
import {SafeAreaView, StyleSheet} from 'react-native';
import Loader from '@sharedComponents/loader/loader';
import {getHorizontalPx} from '@helpers/layoutFoo';
import useLanguageReloader from '@hooks/useLanguageReloader';
import ChangeLanguageModal from '@components/modals/ChangeLanguageModal';

const ReloadItem = () => {
    useLanguageReloader();
    return null;
};

const Tutorial: React.FC = () => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const onBeginPress = useCallback(() => {
        navigation.navigate(OnboardingStackRoute.PERMITS_SCREEN);
    }, [navigation]);
    const [showModal, setShowModal] = useState(false);
    const [fetchingTranslation, setFetchingTranslation] = useState<boolean>(
        false,
    );
    const {t} = useMergedTranslation('Onboarding');
    /**
     * Fetch data when user device has not been registered yet.
     */
    useEffect(() => {
        dispatch(fetchAppRegulations());
    }, [dispatch]);
    const language: string = useAppSelector(state => state.user.language);
    const languageList: languagesListT = useAppSelector(languagesListSelector);
    const userLanguage = useMemo(
        () => languageList.find(lng => lng.code === language),
        [language, languageList],
    );

    const translations: translationsT = useAppSelector(translationsSelector);

    const [reload, setReload] = useState<boolean>(false);

    const startFetchingTranslation = (d: any) =>
        new Promise(resolve => {
            d(fetchUiTranslation(true));
            resolve(true);
        });

    const handleSaveLanguage = (inputLanguage: string) => {
        if (typeof translations[inputLanguage] === 'undefined') {
            setFetchingTranslation(true);
            startFetchingTranslation(dispatch).then(() => {
                setReload(true);
                setTimeout(() => {
                    setFetchingTranslation(false);
                }, 300);
            });
        }
        setShowModal(false);
        dispatch(setLanguage(inputLanguage));
        changeLanguage(inputLanguage, languageList);
    };
    const tiles = useMemo(
        () => [
            {
                title: t('title_1'),
                description: t('text_1'),
                imgSource: require('./images/recordRoutes.png'),
            },
            {
                title: t('title_2'),
                description: t('text_2'),
                imgSource: require('./images/publicRoutes.png'),
            },
            {
                title: t('title_3'),
                description: t('text_3'),
                imgSource: require('./images/bikes.png'),
            },
            {
                title: t('title_4'),
                description: t('text_4'),
                imgSource: require('./images/services.png'),
            },
        ],
        [t],
    );

    if (fetchingTranslation) {
        return (
            <SafeAreaView style={styles.container}>
                <Loader spinnerStyle={styles.spinnerStyle} />
            </SafeAreaView>
        );
    }

    return (
        <GenericScreen noHeader>
            {reload && <ReloadItem />}
            <OnboardingContainer
                onBeginPress={onBeginPress}
                tiles={tiles}
                language={userLanguage}
                onLanguageChange={() => {
                    setShowModal(true);
                }}
                showLanguageButton={languageList.length > 1}
            />
            <ChangeLanguageModal
                visible={showModal}
                languages={languageList}
                selectedLanguageCode={userLanguage?.code}
                onLanguageSelect={handleSaveLanguage}
                onCloseBottomModal={() => setShowModal(false)}
            />
        </GenericScreen>
    );
};

export default Tutorial;

const styles = StyleSheet.create({
    spinnerStyle: {
        width: getHorizontalPx(200),
        height: getHorizontalPx(200),
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
