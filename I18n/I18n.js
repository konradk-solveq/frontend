import I18n from 'react-native-i18n';

const I18n_init = () => {
    I18n.fallbacks = true;
    I18n.locale = 'pl';

    I18n.translations = {
        pl: require('./pl.json')
    }
}

const I18n_change = (languageCode) => {
    // let languageCode = I18n.locale.substr(0, 2);

    switch (languageCode) {
        case 'en':
            I18n.translations.en = require('./en.json');
            break;
        case 'pl':
            I18n.translations.pl = require('./pl.json');
            break;
    }
}

export { I18n_init, I18n_change }