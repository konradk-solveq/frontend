import {useEffect, useRef} from 'react';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {appSyncData, fetchUiTranslation, setLanguage} from '@storage/actions';
import i18next from '@translations/i18next';

import {changeLanguage} from '@utils/translations/useMergedTranslation';
import {setLanguageHeader} from '@api/api';
import {
    codesListSelector,
    languagesListSelector,
    translationsControlSumsSelector,
    translationsSelector,
} from '@storage/selectors/uiTranslation';
import {fetchAppConfig} from '@storage/actions/app';
import {languagesListT, translationsT} from '@models/uiTranslation.models';
import {ControlSumsType, LangsType} from '@models/config.model';

const useLanguageReloader = () => {
    const dispatch = useAppDispatch();
    const previousLanguage = useRef('');
    const language: string = useAppSelector(state => state.user.language);
    const translations: translationsT = useAppSelector(translationsSelector);
    const languageList: languagesListT = useAppSelector(languagesListSelector);
    const langsList: LangsType[] = useAppSelector(codesListSelector);
    const controlSumsList: ControlSumsType[] = useAppSelector(
        translationsControlSumsSelector,
    );

    useEffect(() => {
        previousLanguage.current = language;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (controlSumsList.length === 0) {
            dispatch(fetchAppConfig(true));
            return;
        }
        if (language != null && translations != null) {
            const newLanguage = changeLanguage(language, languageList);
            dispatch(setLanguage(newLanguage));
            setLanguageHeader(newLanguage);

            const controlSym = controlSumsList.find(e => e.code === newLanguage)
                ?.controlSum;

            if (
                typeof translations[language] === 'undefined' ||
                translations[language].controlSum !== controlSym
            ) {
                dispatch(fetchUiTranslation(true));
            }

            for (const lang of languageList) {
                const code = lang.code;

                /** adding backend translations to i18n */
                if (
                    !i18next.hasResourceBundle(code, 'backend') ||
                    code === newLanguage
                ) {
                    const translation = translations[code]?.translation;

                    i18next.addResourceBundle(
                        code,
                        'backend',
                        translation ? translation : {},
                    );
                }

                /** adding local translations to i18n */
                if (code === 'pl' || code === 'en') {
                    continue;
                }

                if (!i18next.hasResourceBundle(code, 'local')) {
                    i18next.addResourceBundle(code, 'local', {});
                }
            }
        }
    }, [
        controlSumsList,
        dispatch,
        langsList,
        language,
        languageList,
        translations,
    ]);

    /**
     * Synchronize translations from the API
     */
    useEffect(() => {
        if (previousLanguage.current !== language) {
            previousLanguage.current = language;

            dispatch(appSyncData(true, true));
        }
    }, [language, dispatch]);
};

export default useLanguageReloader;
