import {useTranslation} from 'react-i18next';
import i18next from '@translations/i18next';
import {Platform, NativeModules} from 'react-native';
import {LangsType} from '@models/config.model';

export const useMergedTranslation = (prefix: string) => {
    return useTranslation(['backend', 'local'], {keyPrefix: prefix});
};

export const changeLanguage = (
    language: string = '',
    langsList: LangsType[],
) => {
    if (language === '') {
        try {
            const deviceLanguage =
                Platform.OS === 'ios'
                    ? NativeModules.SettingsManager.settings.AppleLocale ||
                      NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
                    : NativeModules.I18nManager.localeIdentifier;

            const code = deviceLanguage.split('_')[0];
            if (langsList.some(e => e.name === code)) {
                language = code;
            } else {
                /** default language */
                language = 'en';
            }
        } catch {
            language = 'en';
        }
    }

    i18next.changeLanguage(language, err => {
        if (err) {
            return console.error('Changing language went wrong !!!', err);
        }
    });

    return language;
};
