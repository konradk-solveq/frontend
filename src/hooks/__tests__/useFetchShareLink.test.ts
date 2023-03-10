import {act} from 'react-test-renderer';
import {renderHook} from '@testing-library/react-hooks';

import asyncEvent from '@jestUtils/asyncEvent';
import {postApiCallMock} from '@utils/testUtils/apiCalls';

import useFetchShareLink from '../useFetchShareLink';

const mockedResponseSuccess = {
    data: {
        url: 'https://public.pre.mykross.kross.pl/share/id-12345',
        content: {
            image:
                'https://example.com/cycling-map/pTlxfkJxIu1Lu2EqrRoqZEVYdHKfLZEo/map_share_1024.png',
        },
    },
    status: 200,
};

const apiResponseErrorMessage = 'Test error message.';
const mockedResponseFailure = {
    data: {error: apiResponseErrorMessage, statusCode: 404},
    status: 404,
};

describe('[useFetchShareLink]', () => {
    it('Should try to fetch data to be shared and set "sharedContent" on success', async () => {
        postApiCallMock(mockedResponseSuccess, 'post');
        /**
         * Mock that picture already exists on S3
         */
        postApiCallMock({data: 'EXISTS', status: 200}, 'get');

        const {result, waitForNextUpdate} = renderHook(() =>
            useFetchShareLink('conent-id-54321'),
        );

        await asyncEvent(async () => {
            await waitForNextUpdate();
        });

        expect(result.current.sharedContent).toEqual({
            url: 'https://public.pre.mykross.kross.pl/share/id-12345',
            content: {
                image:
                    'https://example.com/cycling-map/pTlxfkJxIu1Lu2EqrRoqZEVYdHKfLZEo/map_share_1024.png',
            },
        });
    }, 1000);

    it('Should try to fetch data to be shared and set "shareError" on failure', async () => {
        postApiCallMock(mockedResponseFailure, 'post');

        const {result, waitForNextUpdate} = renderHook(() =>
            useFetchShareLink('conent-id-54321'),
        );

        await asyncEvent(async () => {
            await waitForNextUpdate();
        });

        expect(result.current.sharedContent).toBe(undefined);
        expect(result.current.shareError).toEqual(apiResponseErrorMessage);
    }, 1000);

    it('Should try to fetch data to be shared and set "sharedContent" on success when picture not exists on S3', async () => {
        postApiCallMock(mockedResponseSuccess, 'post');
        /**
         * Mock that picture not exists on S3
         */
        postApiCallMock({data: 'NOT-EXISTS', status: 404}, 'get');

        const {result, waitForNextUpdate} = renderHook(() =>
            useFetchShareLink('conent-id-54321'),
        );

        await act(async () => {
            jest.runAllTimers();
        });

        await asyncEvent(async () => {
            await waitForNextUpdate();
        });

        expect(result.current.sharedContent).toEqual({
            url: 'https://public.pre.mykross.kross.pl/share/id-12345',
            content: {
                image:
                    'https://example.com/cycling-map/pTlxfkJxIu1Lu2EqrRoqZEVYdHKfLZEo/map_share_1024.png',
            },
        });
    }, 1000);

    it.each([
        ['success', mockedResponseSuccess],
        ['failure', mockedResponseFailure],
    ])(
        'It should try to get the data to be shared and set "isFetching" to "false" when done, whatever the outcome - "%s"',
        async (_: string, mockedApiResponse: any) => {
            postApiCallMock(mockedApiResponse, 'post');
            const {result, waitForNextUpdate} = renderHook(() =>
                useFetchShareLink('conent-id-54321'),
            );

            await asyncEvent(async () => {
                await waitForNextUpdate();
            });

            expect(result.current.isFetching).toBeFalsy();
        },
        1000,
    );
});
