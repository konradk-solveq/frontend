import {AppConfigI} from '@models/config.model';
import {InternetConnectionInfoType} from '@interfaces/internetConnection';
import {BasicCoordsType} from '@type/coords';
import {
    FaqType,
    RegulationType,
    TermsAndConditionsType,
} from '@models/regulations.model';

export interface AppState {
    isOffline: boolean;
    internetConnectionInfo: InternetConnectionInfoType;
    sync: boolean;
    error: string;
    statusCode: number;
    config: AppConfigI;
    terms: TermsAndConditionsType[];
    currentTerms: TermsAndConditionsType;
    faq: {faq: FaqType[]} | {};
    showedRegulations: number | null;
    showedNewAppVersion: string;
    regulation: RegulationType | {};
    policy: RegulationType | {};
    showedLocationInfo: boolean;
    location: BasicCoordsType | undefined;
    routeDebugMode: boolean;
    initMapsDataSynched: boolean;
}

const date_later = new Date(Date.now() + 100000);
const date_earlier = new Date(Date.now() - 100000);

export const storeMockups: AppState[] = [
    {
        isOffline: false,
        internetConnectionInfo: {
            goodConnectionQuality: true,
        },
        sync: false,
        error: '',
        statusCode: 200,
        config: {
            name: '',
            lang: '',
            langs: {name: '', displayName: ''},
            difficulties: [],
            surfaces: [],
            tags: [],
            reactions: [],
        },
        terms: [
            {
                version: undefined,
                showDate: undefined,
                publishDate: date_later,
                title: 'title',
                text: 'text',
            },
        ],
        currentTerms: {
            version: undefined,
            showDate: undefined,
            publishDate: undefined,
            text: '',
            title: '',
        },
        faq: {},
        showedRegulations: null,
        showedNewAppVersion: '1.0.0',
        regulation: {},
        policy: {},
        showedLocationInfo: false,
        location: undefined,
        routeDebugMode: false,
        initMapsDataSynched: false,
    },
    {
        isOffline: false,
        internetConnectionInfo: {
            goodConnectionQuality: true,
        },
        sync: false,
        error: '',
        statusCode: 200,
        config: {
            name: '',
            lang: '',
            langs: {name: '', displayName: ''},
            difficulties: [],
            surfaces: [],
            tags: [],
            reactions: [],
        },
        terms: [
            {
                version: undefined,
                showDate: undefined,
                publishDate: date_earlier,
                title: 'title',
                text: 'text',
            },
        ],        currentTerms: {
            version: undefined,
            showDate: undefined,
            publishDate: undefined,
            text: '',
            title: '',
        },
        faq: {},
        showedRegulations: null,
        showedNewAppVersion: '1.0.0',
        regulation: {},
        policy: {},
        showedLocationInfo: false,
        location: undefined,
        routeDebugMode: false,
        initMapsDataSynched: false,
    },
];

export const initialStatesRegulations = [
    { // 1
        regulation1: {
            version: '1.0.0',
            header: 'header_1',
            title: 'title_1',
            paragraph: [
                {
                    text: 'string',
                },
                {
                    text: 'string',
                },
                {
                    text: 'string',
                },
            ],
        },
        regulation2: {
            version: '2.0.0',
            header: 'header_2',
            title: 'title_2',
            paragraph: [
                {
                    text: 'string',
                },
                {
                    text: 'string',
                },
                {
                    text: 'string',
                },
            ],
        },
    },
    { // 2
        regulation2: {
            version: '2.0.0',
            header: 'header_2',
            title: 'title_2',
            paragraph: [
                {
                    text: 'string',
                },
                {
                    text: 'string',
                },
                {
                    text: 'string',
                },
            ],
        },
        regulation1: {
            version: '1.0.0',
            header: 'header_1',
            title: 'title_1',
            paragraph: [
                {
                    text: 'string',
                },
                {
                    text: 'string',
                },
                {
                    text: 'string',
                },
            ],
        },
    },
    { // 3
        regulation1: {
            version: '1.0.0',
            header: 'header_1',
            title: 'title_1',
            paragraph: [
                {
                    text: 'string',
                },
                {
                    text: 'string',
                },
                {
                    text: 'string',
                },
            ],
        },
        regulation2: null,
    },
    {
        regulation2: null,
        regulation1: {
            version: '1.0.0',
            header: 'header_1',
            title: 'title_1',
            paragraph: [
                {
                    text: 'string',
                },
                {
                    text: 'string',
                },
                {
                    text: 'string',
                },
            ],
        },
    },
    { // 4
        regulation1: null,
        regulation2: null,
    },
];

export const initialStatesPolicies = [
    { // 1
        policy1: {
            version: '1.0.0',
            header: 'header_1',
            title: 'title_1',
            paragraph: [
                {
                    text: 'string',
                },
                {
                    text: 'string',
                },
                {
                    text: 'string',
                },
            ],
        },
        policy2: {
            version: '2.0.0',
            header: 'header_2',
            title: 'title_2',
            paragraph: [
                {
                    text: 'string',
                },
                {
                    text: 'string',
                },
                {
                    text: 'string',
                },
            ],
        },
    },
    { // 2
        policy2: {
            version: '2.0.0',
            header: 'header_2',
            title: 'title_2',
            paragraph: [
                {
                    text: 'string',
                },
                {
                    text: 'string',
                },
                {
                    text: 'string',
                },
            ],
        },
        policy1: {
            version: '1.0.0',
            header: 'header_1',
            title: 'title_1',
            paragraph: [
                {
                    text: 'string',
                },
                {
                    text: 'string',
                },
                {
                    text: 'string',
                },
            ],
        },
    },
    { // 3
        policy1: {
            version: '1.0.0',
            header: 'header_1',
            title: 'title_1',
            paragraph: [
                {
                    text: 'string',
                },
                {
                    text: 'string',
                },
                {
                    text: 'string',
                },
            ],
        },
        policy2: null,
    },
    {
        policy2: null,
        policy1: {
            version: '1.0.0',
            header: 'header_1',
            title: 'title_1',
            paragraph: [
                {
                    text: 'string',
                },
                {
                    text: 'string',
                },
                {
                    text: 'string',
                },
            ],
        },
    },
    { // 4
        policy1: null,
        policy2: null,
    },
];