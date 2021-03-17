import I18n from 'react-native-i18n';

I18n.fallbacks = true;

let languageCode = I18n.locale.substr(0, 2);

I18n.translations = {
    pl: require('./pl.json')
}

switch (languageCode) {
    case 'en':
        I18n.translations.af = require('./english.json');
        break;
}