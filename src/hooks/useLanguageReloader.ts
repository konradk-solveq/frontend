import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {fetchUiTranslation, setLanguage} from '@storage/actions';
import i18next from '@translations/i18next';

import {changeLanguage} from '@utils/translations/useMergedTranslation';
import {setLanguageHeader} from '@api/api';
import {
    languagesListSelector,
    translationsSelector,
} from '@storage/selectors/uiTranslation';

const useLanguageReloader = () => {
    const dispatch = useAppDispatch();
    const language: string = useAppSelector(state => state.user.language);
    const translations: any = useAppSelector(translationsSelector);
    const languageList: any = useAppSelector(languagesListSelector);

    useEffect(() => {
        if (language != null && translations != null) {
            const newLanguage = changeLanguage(language);
            dispatch(setLanguage(newLanguage));
            setLanguageHeader(newLanguage);

            if (typeof translations[language] === 'undefined') {
                /** place for compare control sum form device and from backend */
                dispatch(fetchUiTranslation(true));
            }

            for (const lang of languageList) {
                const code = lang.code;

                /** adding backend translations to i18n */
                if (
                    !i18next.hasResourceBundle(code, 'backend') ||
                    code === language
                ) {
                    const translation = translations[code];

                    i18next.addResourceBundle(
                        code,
                        'backend',
                        translation ? translation : {backend: {}},
                    );
                }

                /** adding local translations to i18n */
                if (code === 'pl' || code === 'en') {
                    continue;
                }

                if (!i18next.hasResourceBundle(code, 'local')) {
                    i18next.addResourceBundle(code, 'local', {local: {}});
                }
            }
        }
    }, [dispatch, language, languageList, translations]);
};

export default useLanguageReloader;
