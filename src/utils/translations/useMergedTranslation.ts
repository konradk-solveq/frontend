import {useTranslation} from 'react-i18next';
import i18next from '@translations/i18next';
import {Platform, NativeModules} from 'react-native';

export const useMergedTranslation = (prefix: string) => {
    return useTranslation(['backend', 'local'], {keyPrefix: prefix});
};

export const changeLanguage = (language: string = '') => {
    if (language === '') {
        const deviceLanguage =
            Platform.OS === 'ios'
                ? NativeModules.SettingsManager.settings.AppleLocale ||
                  NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
                : NativeModules.I18nManager.localeIdentifier;

        if (deviceLanguage === 'pl_PL') {
            language = 'pl';
        } else {
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
