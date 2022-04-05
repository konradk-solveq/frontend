import 'react-native';
import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {act} from 'react-test-renderer';

import {bikesConfigToClass} from '@utils/transformData';
import {bikesConfig} from '@services/mock/genericBIke';
import {validateData} from '@utils/validation/validation';
import {genericBikerules} from '@utils/validation/validationRules';

import {AddOtherBikeContainer} from '@containers/AddBike';

const ADD_OTHER_BIKE_CONTAINER_TEST_ID = 'add-other-bike-container-id';
const ADD_OTHER_BIKE_CONTAINER_ON_SUBMIT_TEST_ID = `${ADD_OTHER_BIKE_CONTAINER_TEST_ID}-submit-button`;
const ADD_OTHER_BIKE_CONTAINER_BIKE_NAME_TEXT_INPUT_TEST_ID = `${ADD_OTHER_BIKE_CONTAINER_TEST_ID}-bikeName-text-input`;
const ADD_OTHER_BIKE_CONTAINER_MANUFACTURER_TEXT_INPUT_TEST_ID = `${ADD_OTHER_BIKE_CONTAINER_TEST_ID}-manufacturer-text-input`;

const BIKE_NAME = 'Super bike';
const BIKE_MANUFATURER = 'Universe';

const bikeTypesList = bikesConfigToClass(bikesConfig)?.bikeTypesOptions || [];

const validateFormData = (fieldName: string, value?: string) => {
    const rule = genericBikerules?.[fieldName];
    const isValid = validateData(rule, value);
    return {isValid, errorMessage: 'Error message'};
};

describe('<AddOtherBikeContainer /> - containers/AddBike/containers/AddOtherBikeContainer', () => {
    const onPressSubmit = jest.fn();
    const onValidate = jest.fn().mockImplementation(validateFormData);

    it('Should pass validation when values are correct pressed onSubmit button', async () => {
        const {getByTestId} = render(
            <AddOtherBikeContainer
                onSubmit={onPressSubmit}
                onValidate={onValidate}
                bikeTypesList={bikeTypesList}
            />,
        );

        /**
         * Enter correct value
         */
        const bikeNameInput = getByTestId(
            `${ADD_OTHER_BIKE_CONTAINER_BIKE_NAME_TEXT_INPUT_TEST_ID}-input-value`,
        );
        fireEvent.changeText(bikeNameInput, BIKE_NAME);

        /**
         * Enter correct value
         */
        const manufacturerInput = getByTestId(
            `${ADD_OTHER_BIKE_CONTAINER_MANUFACTURER_TEXT_INPUT_TEST_ID}-input-value`,
        );
        fireEvent.changeText(manufacturerInput, BIKE_MANUFATURER);

        /**
         * Submit form
         */
        const submitButton = getByTestId(
            ADD_OTHER_BIKE_CONTAINER_ON_SUBMIT_TEST_ID,
        );
        await act(async () => fireEvent.press(submitButton));

        expect(onValidate).toBeCalled();

        /**
         * Check if validation frame exists
         */
        expect(bikeNameInput.props.style[1]?.borderColor).toBeFalsy();
        /**
         * Check if validation frame exists
         */
        expect(manufacturerInput.props.style[1]?.borderColor).toBeFalsy();
    });

    it('Should not pass validation when "bikeName" value is missing and pressed onSubmit button', async () => {
        const {getByTestId} = render(
            <AddOtherBikeContainer
                onSubmit={onPressSubmit}
                onValidate={onValidate}
                bikeTypesList={bikeTypesList}
            />,
        );

        /**
         * Enter correct value
         */
        const bikeNameInput = getByTestId(
            `${ADD_OTHER_BIKE_CONTAINER_BIKE_NAME_TEXT_INPUT_TEST_ID}-input-value`,
        );

        /**
         * Enter correct value
         */
        const manufacturerInput = getByTestId(
            `${ADD_OTHER_BIKE_CONTAINER_MANUFACTURER_TEXT_INPUT_TEST_ID}-input-value`,
        );
        fireEvent.changeText(manufacturerInput, BIKE_MANUFATURER);

        /**
         * Submit form
         */
        const submitButton = getByTestId(
            ADD_OTHER_BIKE_CONTAINER_ON_SUBMIT_TEST_ID,
        );
        await act(async () => fireEvent.press(submitButton));

        /**
         * Check if validation frame exists
         */
        expect(bikeNameInput.props.style[1]?.borderColor).toBeTruthy();
        /**
         * Check if validation frame exists
         */
        expect(manufacturerInput.props.style[1]?.borderColor).toBeFalsy();
    });

    it('Should not pass validation when "manufacturer" value is missing and pressed onSubmit button', async () => {
        const {getByTestId} = render(
            <AddOtherBikeContainer
                onSubmit={onPressSubmit}
                onValidate={onValidate}
                bikeTypesList={bikeTypesList}
            />,
        );

        /**
         * Enter correct value
         */
        const bikeNameInput = getByTestId(
            `${ADD_OTHER_BIKE_CONTAINER_BIKE_NAME_TEXT_INPUT_TEST_ID}-input-value`,
        );
        fireEvent.changeText(bikeNameInput, BIKE_NAME);

        /**
         * Enter correct value
         */
        const manufacturerInput = getByTestId(
            `${ADD_OTHER_BIKE_CONTAINER_MANUFACTURER_TEXT_INPUT_TEST_ID}-input-value`,
        );

        /**
         * Submit form
         */
        const submitButton = getByTestId(
            ADD_OTHER_BIKE_CONTAINER_ON_SUBMIT_TEST_ID,
        );
        await act(async () => fireEvent.press(submitButton));

        /**
         * Check if validation frame exists
         */
        expect(bikeNameInput.props.style[1]?.borderColor).toBeFalsy();
        /**
         * Check if validation frame exists
         */
        expect(manufacturerInput.props.style[1]?.borderColor).toBeTruthy();
    });

    it('Should not pass validation when "manufacturer" value is to short (min 3 char) and pressed onSubmit button', async () => {
        const {getByTestId} = render(
            <AddOtherBikeContainer
                onSubmit={onPressSubmit}
                onValidate={onValidate}
                bikeTypesList={bikeTypesList}
            />,
        );

        /**
         * Enter correct value
         */
        const bikeNameInput = getByTestId(
            `${ADD_OTHER_BIKE_CONTAINER_BIKE_NAME_TEXT_INPUT_TEST_ID}-input-value`,
        );
        fireEvent.changeText(bikeNameInput, BIKE_NAME);

        /**
         * Enter correct value
         */
        const manufacturerInput = getByTestId(
            `${ADD_OTHER_BIKE_CONTAINER_MANUFACTURER_TEXT_INPUT_TEST_ID}-input-value`,
        );
        fireEvent.changeText(manufacturerInput, 't');

        /**
         * Submit form
         */
        const submitButton = getByTestId(
            ADD_OTHER_BIKE_CONTAINER_ON_SUBMIT_TEST_ID,
        );
        await act(async () => fireEvent.press(submitButton));

        /**
         * Check if validation frame exists
         */
        expect(bikeNameInput.props.style[1]?.borderColor).toBeFalsy();
        /**
         * Check if validation frame exists
         */
        expect(manufacturerInput.props.style[1]?.borderColor).toBeTruthy();
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });
});
