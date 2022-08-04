import {NotificationType, LegalDocumentType} from '@models/regulations.model';

export const notifications: NotificationType[] = [
    {
        type: 'promo',
        content: {
            id: 1,
            language: 'en',
            data: {
                title: 'Testing',
                text:
                    'Just\ntesting\nHere is {{policy}} and {{regulations}}, send an email to {{email}}',
            },
            actions: [
                {
                    type: 'internal_uri',
                    value: 'policy',
                    text: 'Privacy policy',
                    match: '{{policy}}',
                },
                {
                    type: 'external_uri',
                    value: 'https://kross.eu',
                    text: 'Regulations',
                    match: '{{regulations}}',
                },
                {
                    type: 'email',
                    value: 'mailto:test@example.com',
                    text: 'test@example.com',
                    match: '{{email}}',
                },
            ],
        },
    },
    {
        type: 'promo',
        content: {
            id: 1,
            language: 'en',
            data: {
                title: 'TEST TEST TEST TEST TEST',
                text: 'TEST TEST TEST TEST TEST',
            },
            actions: [],
        },
    },
];

type LegalDocumentsT = {
    regulations: LegalDocumentType;
    policy: LegalDocumentType;
};

export const legalDocuments: LegalDocumentsT = {
    policy: {
        current: {
            id: 1,
            content: {
                version: '1',
                header: 'TEST',
                title: 'Testing',
                paragraph: [
                    {
                        text: '{{policy}}',
                        font: 'normal',
                        marginTop: 12,
                    },
                ],
            },
            actions: [
                {
                    type: 'external_uri',
                    value: 'https://kross.eu',
                    text: 'Policy',
                    match: '{{policy}}',
                },
            ],
        },
        next: {
            id: 2,
            content: {
                version: '1',
                header: 'TEST NEXT',
                title: 'next next',
                paragraph: [
                    {
                        text: 'NEXT {{policy}}',
                        font: 'normal',
                        marginTop: 12,
                    },
                ],
            },
            actions: [
                {
                    type: 'external_uri',
                    value: 'https://kross.eu',
                    text: 'Policy',
                    match: '{{policy}}',
                },
            ],
        },
    },
    regulations: {
        current: {
            id: 1,
            content: {
                version: '1',
                header: 'TEST',
                title: 'Testing',
                paragraph: [
                    {
                        text: '{{regulation}}',
                        font: 'normal',
                        marginTop: 12,
                    },
                ],
            },
            actions: [
                {
                    type: 'external_uri',
                    value: 'https://kross.eu',
                    text: 'Regulation',
                    match: '{{regulation}}',
                },
            ],
        },
        next: {
            id: 2,
            content: {
                version: '1',
                header: 'TEST NEXT',
                title: 'next next',
                paragraph: [
                    {
                        text: 'NEXT {{regulation}}',
                        font: 'normal',
                        marginTop: 12,
                    },
                ],
            },
            actions: [
                {
                    type: 'external_uri',
                    value: 'https://kross.eu',
                    text: 'Regulation',
                    match: '{{regulation}}',
                },
            ],
        },
    },
};
