import i18next from 'i18next';
import ChainedBackend from 'i18next-chained-backend';
import HttpBackend from 'i18next-http-backend';
import resourcesToBackend from 'i18next-resources-to-backend';
import {initReactI18next} from 'react-i18next';

const local = {
    en: {
        local: require('./en.json'),
    },
    pl: {
        local: require('./pl.json'),
    },
};

const backend = {
    en: {
        backend: {
            Login: {header: 'TEST en'},
        },
    },
    pl: {
        backend: {
            Login: {header: 'TEST pl'},
        },
    },
};

i18next
    .use(initReactI18next)
    .use(ChainedBackend)
    .init({
        fallbackLng: 'pl',
        compatibilityJSON: 'v3',
        namespaces: ['backend', 'local'],
        defaultNS: 'backend',
        fallbackNS: 'local',
        // ... your i18next config
        backend: {
            backends: [
                HttpBackend,
                resourcesToBackend(local),
                resourcesToBackend(backend),
            ],
            backendOptions: [
                {
                    loadPath: '/locales/{{lng}}/{{ns}}.json',
                },
            ],
        },
    });

export default i18next;
