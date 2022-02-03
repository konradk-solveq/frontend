import {DEEPLINKING_HOST} from '@env';

import {clearDeepLink, DeepLink} from '../handleDeepLinkUrl';

const CORRECT_SHARED_URL = `${DEEPLINKING_HOST}/cyclingMap/share-id`;
const CORRECT_SHARED_URL_WITH_PREFIX = `${DEEPLINKING_HOST}/prefix/cyclingMap/share-id`;
const CORRECT_SHARED_URL_WITH_QUERY_PARAM = `${DEEPLINKING_HOST}/cyclingMap/share-id?look=up`;

const INCORRECT_SHARED_URL_WRONG_DOMAIN =
    'https://other.share.domain.com/cyclingMap/share-id';
const INCORRECT_SHARED_URL_WRONG_SEGMENTS_STRUCTURE = `${DEEPLINKING_HOST}/cyclingMap/share-id/additional-info`;

describe('[handleDeepLinkUrl -- navigation/utils', () => {
    it('Should have been initialized', () => {
        const deepLinkInstance = DeepLink;

        expect(deepLinkInstance).not.toBeUndefined();
        expect(deepLinkInstance.instance).not.toBeUndefined();
    });

    it('Should have undefined sharing data initially', () => {
        const deepLinkInstance = DeepLink;

        expect(deepLinkInstance.shareId).toBeUndefined();
        expect(deepLinkInstance.shareType).toBeUndefined();
    });

    it.each([
        CORRECT_SHARED_URL,
        CORRECT_SHARED_URL_WITH_PREFIX,
        CORRECT_SHARED_URL_WITH_QUERY_PARAM,
    ])('Should get shareID from shared url - %s', (url: string) => {
        const deepLinkInstance = DeepLink;

        deepLinkInstance.setShareIdFromUrl = url;

        expect(deepLinkInstance.shareId).toEqual('share-id');
    });

    it.each([
        INCORRECT_SHARED_URL_WRONG_DOMAIN,
        INCORRECT_SHARED_URL_WRONG_SEGMENTS_STRUCTURE,
    ])(
        'Should return incorrect shareID when shared url is incorrect - %s',
        (url: string) => {
            const deepLinkInstance = DeepLink;

            deepLinkInstance.setShareIdFromUrl = url;

            expect(deepLinkInstance.shareId).not.toEqual('share-id');
        },
    );

    it.each([
        INCORRECT_SHARED_URL_WRONG_DOMAIN,
        INCORRECT_SHARED_URL_WRONG_SEGMENTS_STRUCTURE,
    ])(
        'Should return incorrect shareType when shared url is incorrect - %s',
        (url: string) => {
            const deepLinkInstance = DeepLink;

            deepLinkInstance.setShareTypeFromUrl = url;

            expect(deepLinkInstance.shareType).not.toEqual('cyclingMap');
        },
    );

    afterEach(() => {
        /**
         * Clear instance between tests
         * as this keeps global state.
         */
        clearDeepLink();
    });
});
