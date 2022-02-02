import React, {useEffect} from 'react';
import {useAppSelector} from '@hooks/redux';
import i18next from '@translations/i18next';

import {changeLanguage} from '@utils/translations/useMergedTranslation';

const LanguageReloader: React.FC = () => {
    const language: string = useAppSelector(state => state.user.language);
    const translations: any = useAppSelector(
        state => state.uiTranslation.translations,
    );

    useEffect(() => {
        if (language && translations) {
            changeLanguage(language);

            const backend: any = {};

            const local: any = {
                en: {
                    local: require('../../../I18n/en.json'),
                },
                pl: {
                    local: require('../../../I18n/pl.json'),
                },
                cs: {local: {}},
            };

            for (const key in translations.translations) {
                backend[key] = {backend: translations.translations[key]};
            }

            for (const key in local) {
                if (typeof backend[key] === 'undefined') {
                    backend[key] = {backend: local[key].local};
                }
            }

            // for (const key in local) {
            //     console.log(`local.${key}:`, local[key].local);
            // }
            for (const key in backend) {
                // console.log(`backend.${key}:`, backend[key].backend);
                i18next.addResourceBundle(key, 'backend', backend[key].backend);
            }
        }
    }, [language, translations]);

    return null;
};

export default LanguageReloader;
