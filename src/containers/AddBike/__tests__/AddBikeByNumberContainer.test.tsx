import 'react-native';
import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {act} from 'react-test-renderer';

import {AddBikeByNumberContainer} from '@containers/AddBike';

const ADD_BIKE_BY_NUMBER_CONTAINER_TEST_ID = 'add-bike-by-number-container-id';
const ADD_BIKE_BY_NUMBER_CONTAINER_ON_SUBMIT_TEST_ID = `${ADD_BIKE_BY_NUMBER_CONTAINER_TEST_ID}-submit-button`;
const ADD_BIKE_BY_NUMBER_CONTAINER_LINK_BUTTON_TEST_ID = `${ADD_BIKE_BY_NUMBER_CONTAINER_TEST_ID}-link-button`;
const ADD_BIKE_BY_NUMBER_CONTAINER_TEXT_INPUT_TEST_ID = `${ADD_BIKE_BY_NUMBER_CONTAINER_TEST_ID}-text-input`;

const CORRECT_VALIDATION_RESPONSE = {isValid: true, errorMessage: ''};
const INCORRECT_VALIDATION_RESPONSE = {
    isValid: false,
    errorMessage: 'Error message',
};

describe('<AddBikeByNumberContainer /> - containers/AddBike/containers/AddBikeByNumberContainer', () => {
    const onPressLinkFn = jest.fn();
    const onPressSubmit = jest.fn();
    const onValidateWithNoError = jest
        .fn()
        .mockReturnValue(CORRECT_VALIDATION_RESPONSE);
    const onValidateWithError = jest
        .fn()
        .mockReturnValue(INCORRECT_VALIDATION_RESPONSE);

    it('Should pass validation when value is correct pressed onSubmit button', async () => {
        const {getByTestId} = render(
            <AddBikeByNumberContainer
                onSubmit={onPressSubmit}
                onPressLink={onPressLinkFn}
                onValidate={onValidateWithNoError}
            />,
        );

        /**
         * Enter correct value
         */
        const textInput = getByTestId(
            `${ADD_BIKE_BY_NUMBER_CONTAINER_TEXT_INPUT_TEST_ID}-input-value`,
        );
        fireEvent.changeText(textInput, 'test');

        /**
         * Submit form
         */
        const submitButton = getByTestId(
            ADD_BIKE_BY_NUMBER_CONTAINER_ON_SUBMIT_TEST_ID,
        );
        await act(async () => fireEvent.press(submitButton));

        expect(onValidateWithNoError).toBeCalled();

        /**
         * Check if validation frame exists
         */
        expect(textInput.props.style[1]?.borderColor).toBeFalsy();
    });

    it('Should not press onSubmit button when button is [disabled/withLoader]', async () => {
        const {getByTestId} = render(
            <AddBikeByNumberContainer
                onSubmit={onPressSubmit}
                onPressLink={onPressLinkFn}
                onValidate={onValidateWithNoError}
                isLoading
            />,
        );

        /**
         * Submit form
         */
        const submitButton = getByTestId(
            ADD_BIKE_BY_NUMBER_CONTAINER_ON_SUBMIT_TEST_ID,
        );
        await act(async () => fireEvent.press(submitButton));

        expect(onValidateWithError).not.toBeCalled();
    });

    it('Should not pass validation when missing value and pressed onSubmit button', async () => {
        const {getByTestId} = render(
            <AddBikeByNumberContainer
                onSubmit={onPressSubmit}
                onPressLink={onPressLinkFn}
                onValidate={onValidateWithError}
            />,
        );

        const textInput = getByTestId(
            `${ADD_BIKE_BY_NUMBER_CONTAINER_TEXT_INPUT_TEST_ID}-input-value`,
        );

        /**
         * Submit form
         */
        const submitButton = getByTestId(
            ADD_BIKE_BY_NUMBER_CONTAINER_ON_SUBMIT_TEST_ID,
        );
        await act(async () => fireEvent.press(submitButton));

        expect(onValidateWithError).toBeCalled();

        /**
         * Check if validation frame exists
         */
        expect(textInput.props.style[1]?.borderColor).toBeTruthy();
    });

    it('Should not pass validation when value is incorrect and pressed onSubmit button', async () => {
        const {getByTestId} = render(
            <AddBikeByNumberContainer
                onSubmit={onPressSubmit}
                onPressLink={onPressLinkFn}
                onValidate={onValidateWithError}
            />,
        );

        /**
         * Enter incorrect value
         */
        const textInput = getByTestId(
            `${ADD_BIKE_BY_NUMBER_CONTAINER_TEXT_INPUT_TEST_ID}-input-value`,
        );
        fireEvent.changeText(textInput, 't');

        /**
         * Submit form
         */
        const submitButton = getByTestId(
            ADD_BIKE_BY_NUMBER_CONTAINER_ON_SUBMIT_TEST_ID,
        );
        await act(async () => fireEvent.press(submitButton));

        expect(onValidateWithError).toBeCalled();

        /**
         * Check if validation frame exists
         */
        expect(textInput.props.style[1]?.borderColor).toBeTruthy();
    });

    it('Should press link button', () => {
        const {getByTestId} = render(
            <AddBikeByNumberContainer
                onSubmit={onPressSubmit}
                onPressLink={onPressLinkFn}
                onValidate={onValidateWithNoError}
            />,
        );

        const linkButton = getByTestId(
            ADD_BIKE_BY_NUMBER_CONTAINER_LINK_BUTTON_TEST_ID,
        );
        fireEvent.press(linkButton);

        expect(onPressLinkFn).toBeCalledTimes(1);
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });
});
