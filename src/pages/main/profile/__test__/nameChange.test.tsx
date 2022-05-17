import React from 'react';
import {fireEvent} from '@testing-library/react-native';
import asyncEvent from '@jestUtils/asyncEvent';
import renderComponent from '@jestUtils/render';
import NameChange from '../nameChange/nameChange';
import {act} from 'react-test-renderer';

const mockedGoBack = jest.fn();
jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
        canGoBack: jest.fn().mockReturnValue(true),
        goBack: mockedGoBack,
    }),
}));

const NAME_CHANGE_TEST_INPUT = 'name-change-input-value';
const NAME_CHANGE_TEST_SAVE_BUTTON = 'name-change-submit-button';
const NAME_CHANGE_TEST_INPUT_HINT = 'name-change-input-hint-text';
const NAME_CHANGE_TEST_INVALID_USER_NAME = 'XY';
const NAME_CHANGE_TEST_VALID_USER_NAME = 'BOB';
const NAME_CHANGE_TEST_EMPTY_USER_NAME = '';

describe('<NameChange />', () => {
    describe('Rendering', () => {
        it('Should set input hint text if entered less than 3 characters', async () => {
            const {getByTestId} = await asyncEvent(
                renderComponent(<NameChange />),
            );

            const nameInput = getByTestId(`${NAME_CHANGE_TEST_INPUT}`);
            const saveButton = getByTestId(NAME_CHANGE_TEST_SAVE_BUTTON);

            fireEvent.changeText(nameInput, NAME_CHANGE_TEST_INVALID_USER_NAME);
            await act(async () => fireEvent.press(saveButton));

            const inputHint = getByTestId(NAME_CHANGE_TEST_INPUT_HINT);

            expect(inputHint).not.toBeNull();
        });

        it('Should not navigate to previous screen if input value is invalid', async () => {
            const {getByTestId} = await asyncEvent(
                renderComponent(<NameChange />),
            );

            const nameInput = getByTestId(`${NAME_CHANGE_TEST_INPUT}`);
            const saveButton = getByTestId(NAME_CHANGE_TEST_SAVE_BUTTON);

            fireEvent.changeText(nameInput, NAME_CHANGE_TEST_INVALID_USER_NAME);
            await act(async () => fireEvent.press(saveButton));

            expect(mockedGoBack).not.toBeCalled();
        });

        it('Should navigate to previous screen if input is empty', async () => {
            const {getByTestId} = await asyncEvent(
                renderComponent(<NameChange />),
            );

            const nameInput = getByTestId(`${NAME_CHANGE_TEST_INPUT}`);
            const saveButton = getByTestId(NAME_CHANGE_TEST_SAVE_BUTTON);

            fireEvent.changeText(nameInput, NAME_CHANGE_TEST_EMPTY_USER_NAME);
            fireEvent.press(saveButton);

            expect(mockedGoBack).toBeCalledTimes(1);
        });

        it('Should navigate to previous screen if input value is valid', async () => {
            const {getByTestId} = await asyncEvent(
                renderComponent(<NameChange />),
            );

            const nameInput = getByTestId(`${NAME_CHANGE_TEST_INPUT}`);
            const saveButton = getByTestId(NAME_CHANGE_TEST_SAVE_BUTTON);

            fireEvent.changeText(nameInput, NAME_CHANGE_TEST_VALID_USER_NAME);
            fireEvent.press(saveButton);

            expect(mockedGoBack).toBeCalledTimes(1);
        });

        afterEach(() => {
            jest.clearAllMocks();
        });
    });
});
