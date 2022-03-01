import {useTranslation} from 'react-i18next';
import i18next from '@translations/i18next';
import {Platform, NativeModules} from 'react-native';
import {MAJOR_LANGUAGE} from '@helpers/global';
import {languagesListT} from '@src/models/uiTranslation.models';

export const useMergedTranslation = (prefix: string) => {
    return useTranslation(['backend', 'local'], {keyPrefix: prefix});
};

export const changeLanguage = (
    language: string = '',
    langsList: languagesListT,
) => {
    for (const l of langsList) {
        console.log('langsList:', l.code);
    }
    console.log('%c language:', 'background: #ffcc00; color: #003300', language)

    if (language === '') {
        try {
            const deviceLanguage =
                Platform.OS === 'ios'
                    ? NativeModules.SettingsManager.settings.AppleLocale ||
                      NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
                    : NativeModules.I18nManager.localeIdentifier;

            const code = deviceLanguage.split('_')[0];
            if (langsList.some(e => e.code === code)) {
                language = code;
            } else {
                /** default language */
                language = MAJOR_LANGUAGE;
            }
        } catch {
            language = MAJOR_LANGUAGE;
        }
    } else {
        if (!langsList.some(e => e.code === language)) {
            language = MAJOR_LANGUAGE;
        }
    }
    console.log('%c language res:', 'background: #ffcc00; color: #003300', language)

    i18next.changeLanguage(language, err => {
        if (err) {
            return console.error('Changing language went wrong !!!', err);
        }
    });

    return language;
};
