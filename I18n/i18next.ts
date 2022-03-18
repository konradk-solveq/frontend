import i18next from 'i18next';
import ChainedBackend from 'i18next-chained-backend';
import HttpBackend from 'i18next-http-backend';
import resourcesToBackend from 'i18next-resources-to-backend';
import {initReactI18next} from 'react-i18next';
import {LOAD_STORYBOOK} from '@env';

const local = {
    en: {
        local: require('./en.json'),
    },
    pl: {
        local: require('./pl.json'),
    },
    cs: {local: {}},
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
    cs: {backend: {}},
};

i18next
    .use(initReactI18next)
    .use(ChainedBackend)
    .init(
        {
            lng: 'pl',
            fallbackLng: 'pl',
            defaultNS: 'backend',
            compatibilityJSON: 'v3',
            ns: ['local'],
            fallbackNS: 'local',
            backend: {
                backends: [
                    resourcesToBackend(backend),
                    resourcesToBackend(local),
                    HttpBackend,
                ],
                backendOptions: [
                    {
                        loadPath: '/locales/{{lng}}/{{ns}}.json',
                        allowMultiLoading: true,
                    },
                ],
            },
            debug: LOAD_STORYBOOK === 'true',
        },
        err => {
            if (err) {
                console.error('i18next init error', err);
            }
        },
    );

i18next.loadNamespaces(['backend', 'local'], err => {
    if (err) {
        console.error('i18next namespaces load error', err);
    }
});

export default i18next;
