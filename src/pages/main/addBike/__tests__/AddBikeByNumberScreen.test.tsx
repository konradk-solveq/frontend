import React from 'react';
import {fireEvent} from '@testing-library/react-native';
import {act} from 'react-test-renderer';
import asyncEvent from '@jestUtils/asyncEvent';
import renderComponent from '@jestUtils/render';

import {postApiCallMock} from '@utils/testUtils/apiCalls';
import {serviceResponse} from '@services/bikesService';

import {AddBikeByNumberScreen} from '@pages/main/addBike';

const mockedNavigate = jest.fn();
const mockedPop = jest.fn();
const mockedCanGoBack = jest.fn();
jest.mock('@react-navigation/core', () => {
    const actualNav = jest.requireActual('@react-navigation/core');
    return {
        ...actualNav,
        useNavigation: () => ({
            canGoBack: mockedCanGoBack,
            navigate: mockedNavigate,
            pop: mockedPop,
        }),
    };
});

const bikeData = {
    description: {
        id: null,
        name: 'RACER 3.0 2019',
        color: 'czerwony / niebieski połysk',
        colorCodes: ['#FF0000', '#0000FF'],
        size: '10" 16"',
        sku: 'KRRA3Z16X10M000147',
        serial_number: '1234567890',
        producer: 'Kross',
        purpose: {
            code: 'city',
            name: 'miejski',
        },
    },
    images: undefined,
    warranty: undefined,
    compaintRepairs: undefined,
};

const initStore = {
    user: {
        onboardingFinished: true,
        userName: '',
        frameNumber: '',
        loading: false,
    },
    bikes: {
        list: [],
    },
};

const mockedResponseSuccess: serviceResponse = {
    data: bikeData,
    status: 200,
    error: '',
};

const ADD_BIKE_BY_NUMBER_CONTAINER_TEST_ID = 'add-bike-by-number-container-id';
const ADD_BIKE_BY_NUMBER_CONTAINER_ON_SUBMIT_TEST_ID = `${ADD_BIKE_BY_NUMBER_CONTAINER_TEST_ID}-submit-button`;
const ADD_BIKE_BY_NUMBER_CONTAINER_LINK_BUTTON_TEST_ID = `${ADD_BIKE_BY_NUMBER_CONTAINER_TEST_ID}-link-button`;
const ADD_BIKE_BY_NUMBER_CONTAINER_TEXT_INPUT_TEST_ID = `${ADD_BIKE_BY_NUMBER_CONTAINER_TEST_ID}-text-input`;
const ADD_BIKE_BY_NUMBER_CONTAINER_SUMMARY_TEST_ID = 'add-bike-summary-modal';
const ADD_BIKE_BY_NUMBER_CONTAINER_SUMMARY_CONTENT_TEST_ID = `${ADD_BIKE_BY_NUMBER_CONTAINER_SUMMARY_TEST_ID}-summary`;

describe('<AddBikeByNumberScreen /> - pages/addBike', () => {
    describe('Rendering', () => {
        it('Should navigate after press on submitButton when validation success', async () => {
            await postApiCallMock<serviceResponse>(
                mockedResponseSuccess,
                'get',
            );

            const {getByTestId} = await asyncEvent(
                renderComponent(
                    <AddBikeByNumberScreen />,
                    undefined,
                    initStore,
                ),
            );

            /**
             * Enter correct value
             */
            const textInput = getByTestId(
                `${ADD_BIKE_BY_NUMBER_CONTAINER_TEXT_INPUT_TEST_ID}-input-value`,
            );
            fireEvent.changeText(textInput, '1234567890');

            const submitButton = getByTestId(
                ADD_BIKE_BY_NUMBER_CONTAINER_ON_SUBMIT_TEST_ID,
            );
            /**
             * Submit form
             */
            await act(async () => fireEvent.press(submitButton));

            /**
             * Modal with summary should be shown
             * with bike data
             */
            const summaryModal = getByTestId(
                `${ADD_BIKE_BY_NUMBER_CONTAINER_SUMMARY_CONTENT_TEST_ID}-header`,
            );
            expect(summaryModal.props.children).toEqual('RACER 3.0 2019');

            /**
             * End process and navigate to start screen
             */
            const navigateButton = getByTestId(
                `${ADD_BIKE_BY_NUMBER_CONTAINER_SUMMARY_CONTENT_TEST_ID}-button`,
            );
            fireEvent.press(navigateButton);
            expect(mockedPop).toBeCalledTimes(1);
        });

        it('Should not navigate after press on submitButton when validation failure', async () => {
            await postApiCallMock<serviceResponse>(
                mockedResponseSuccess,
                'get',
            );

            const {getByTestId} = await asyncEvent(
                renderComponent(
                    <AddBikeByNumberScreen />,
                    undefined,
                    initStore,
                ),
            );

            /**
             * Enter correct value
             */
            const textInput = getByTestId(
                `${ADD_BIKE_BY_NUMBER_CONTAINER_TEXT_INPUT_TEST_ID}-input-value`,
            );
            fireEvent.changeText(textInput, 't');

            const submitButton = getByTestId(
                ADD_BIKE_BY_NUMBER_CONTAINER_ON_SUBMIT_TEST_ID,
            );
            /**
             * Submit form
             */
            await act(async () => fireEvent.press(submitButton));
            expect(mockedNavigate).not.toBeCalledTimes(1);
        });

        it('Should navigate to other screen when pressed on linkButton', async () => {
            await postApiCallMock<serviceResponse>(
                mockedResponseSuccess,
                'get',
            );

            const {getByTestId} = await asyncEvent(
                renderComponent(
                    <AddBikeByNumberScreen />,
                    undefined,
                    initStore,
                ),
            );

            const linkButton = getByTestId(
                ADD_BIKE_BY_NUMBER_CONTAINER_LINK_BUTTON_TEST_ID,
            );
            /**
             * Press on link button
             */
            await act(async () => fireEvent.press(linkButton));
            expect(mockedNavigate).toBeCalledTimes(1);
        });

        afterEach(() => {
            jest.clearAllMocks();
        });
    });
});
