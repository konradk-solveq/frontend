import I18nJs from 'i18n-js';

I18nJs.locale = 'pl'; 
I18nJs.translations.en = require('../I18n/en.json');
I18nJs.translations.pl = require('../I18n/pl.json');
export const getLanguages = () => Promise.resolve(['en']);
export default I18nJs;
