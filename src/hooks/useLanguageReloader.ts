import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {setLanguage} from '@storage/actions';
import i18next from '@translations/i18next';

import {changeLanguage} from '@utils/translations/useMergedTranslation';

const useLanguageReloader = () => {
    const dispatch = useAppDispatch();
    const language: string = useAppSelector(state => state.user.language);
    const translations: any = useAppSelector(
        state => state.uiTranslation.translations,
    );
    const languageList: any = useAppSelector(
        state => state.uiTranslation.languagesList,
    );

    useEffect(() => {
        if (language != null && translations) {
            const newLanguage = changeLanguage(language);
            dispatch(setLanguage(newLanguage));

            const backend: any = {};

            const local: any = {
                en: {
                    local: require('../../I18n/en.json'),
                },
                pl: {
                    local: require('../../I18n/pl.json'),
                },
                cs: {local: {}},
            };

            /**
             * For adding languages form language list gutted from backend
             */
            for (const lang of languageList) {
                if (typeof local[lang.code] === 'undefined') {
                    local[lang.code] = {local: {}};
                }
            }

            /**
             * Create list of translations of fetched form backend
             */
            for (const key in translations.translations) {
                backend[key] = {backend: translations.translations[key]};
            }

            /**
             * Complete missing translations on backend list by object form local list
             */
            for (const key in local) {
                if (typeof backend[key] === 'undefined') {
                    backend[key] = {backend: local[key].local};
                }
            }

            /**
             * Adding translations to local list at i18next
             */
            for (const key in local) {
                if (!i18next.hasResourceBundle(key, 'local')) {
                    i18next.addResourceBundle(key, 'local', local[key].local);
                }
            }

            /**
             * Adding translations to backend list at i18next
             */
            for (const key in backend) {
                if (!i18next.hasResourceBundle(key, 'backend')) {
                    i18next.addResourceBundle(
                        key,
                        'backend',
                        backend[key].backend,
                    );
                }
            }
        }
    }, [language, translations]);
};

export default useLanguageReloader;
