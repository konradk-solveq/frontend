import React from 'react';
import {fireEvent} from '@testing-library/react-native';
import {act} from 'react-test-renderer';
import asyncEvent from '@jestUtils/asyncEvent';
import renderComponent from '@jestUtils/render';

import {bikeTypes} from '@services/mock/genericBIke';
import {AddOtherBikeScreen} from '@pages/main/addBike';

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
        useRoute: () => ({
            name: 'AddOtherBike',
            params: {frameNumber: ''},
        }),
    };
});

const BIKE_NAME = 'Cosmic bike';
const BIKE_MANUFACTUERR = 'Universe';

const bikeData = {
    description: {
        id: null,
        name: BIKE_NAME,
        color: '',
        colorCodes: ['#FF0000', '#0000FF'],
        size: '',
        sku: '',
        serial_number: new Date(1633504705000).toLocaleString(),
        producer: BIKE_MANUFACTUERR,
    },
    images: undefined,
    warranty: undefined,
    compaintRepairs: undefined,
    bikeTypes: bikeTypes,
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
        genericBike: bikeData,
    },
};

const ADD_OTHER_BIKE_CONTAINER_TEST_ID = 'add-other-bike-container-id';
const ADD_OTHER_BIKE_CONTAINER_ON_SUBMIT_TEST_ID = `${ADD_OTHER_BIKE_CONTAINER_TEST_ID}-submit-button`;
const ADD_OTHER_BIKE_CONTAINER_BIKE_NAME_INPUT_TEST_ID = `${ADD_OTHER_BIKE_CONTAINER_TEST_ID}-bikeName-text-input`;
const ADD_OTHER_BIKE_CONTAINER_MANUFACTURER_INPUT_TEST_ID = `${ADD_OTHER_BIKE_CONTAINER_TEST_ID}-manufacturer-text-input`;
const ADD_OTHER_BIKE_RADIO_LIST_ITEM_CONTAINER_TEST_ID = `${ADD_OTHER_BIKE_CONTAINER_TEST_ID}-radio-list-item`;
const ADD_OTHER_BIKE_CONTAINER_SUMMARY_TEST_ID = 'add-bike-summary-modal';
const ADD_OTHER_BIKE_CONTAINER_SUMMARY_CONTENT_TEST_ID = `${ADD_OTHER_BIKE_CONTAINER_SUMMARY_TEST_ID}-other-summary`;

describe('<AddOtherBikeScreen /> - pages/addBike', () => {
    describe('Rendering', () => {
        beforeEach(() => {
            jest.spyOn(global.Date, 'now').mockReturnValue(1633504705000);
        });

        it('Should navigate after press on submitButton when validation success', async () => {
            const {getByTestId} = await asyncEvent(
                renderComponent(<AddOtherBikeScreen />, undefined, initStore),
            );

            /**
             * Choose option
             */
            const radioOption = getByTestId(
                `${ADD_OTHER_BIKE_RADIO_LIST_ITEM_CONTAINER_TEST_ID}-radio-button-${bikeTypes[0].enumValue}-press`,
            );
            fireEvent.press(radioOption);
            /**
             * Enter correct value
             */
            const bikeNameInput = getByTestId(
                `${ADD_OTHER_BIKE_CONTAINER_BIKE_NAME_INPUT_TEST_ID}-input-value`,
            );
            fireEvent.changeText(bikeNameInput, BIKE_NAME);
            /**
             * Enter correct value
             */
            const bikeManufacturerInput = getByTestId(
                `${ADD_OTHER_BIKE_CONTAINER_MANUFACTURER_INPUT_TEST_ID}-input-value`,
            );
            fireEvent.changeText(bikeManufacturerInput, BIKE_MANUFACTUERR);

            const submitButton = getByTestId(
                ADD_OTHER_BIKE_CONTAINER_ON_SUBMIT_TEST_ID,
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
                `${ADD_OTHER_BIKE_CONTAINER_SUMMARY_CONTENT_TEST_ID}-header`,
            );
            expect(summaryModal.props.children).toEqual(BIKE_NAME);

            /**
             * End process and navigate to start screen
             */
            const navigateButton = getByTestId(
                `${ADD_OTHER_BIKE_CONTAINER_SUMMARY_CONTENT_TEST_ID}-button`,
            );
            fireEvent.press(navigateButton);
            expect(mockedPop).toBeCalledTimes(1);
        });

        it('Should not navigate after press on submitButton when validation fail', async () => {
            const {getByTestId} = await asyncEvent(
                renderComponent(<AddOtherBikeScreen />, undefined, initStore),
            );

            /**
             * Enter only one value (other are also required)
             */
            const bikeNameInput = getByTestId(
                `${ADD_OTHER_BIKE_CONTAINER_BIKE_NAME_INPUT_TEST_ID}-input-value`,
            );
            fireEvent.changeText(bikeNameInput, BIKE_NAME);

            const submitButton = getByTestId(
                ADD_OTHER_BIKE_CONTAINER_ON_SUBMIT_TEST_ID,
            );
            /**
             * Submit form
             */
            await act(async () => fireEvent.press(submitButton));

            /**
             * Modal with summary should not be shown
             * with bike data
             */
            const summaryModal = getByTestId(
                `${ADD_OTHER_BIKE_CONTAINER_SUMMARY_CONTENT_TEST_ID}-header`,
            );
            expect(summaryModal.props.children).not.toEqual(BIKE_NAME);

            /**
             * Can't mavigate to another screen
             */
            const navigateButton = getByTestId(
                `${ADD_OTHER_BIKE_CONTAINER_SUMMARY_CONTENT_TEST_ID}-button`,
            );
            fireEvent.press(navigateButton);
            expect(mockedPop).not.toBeCalled();
        });

        afterEach(() => {
            jest.clearAllMocks();
        });
    });
});
