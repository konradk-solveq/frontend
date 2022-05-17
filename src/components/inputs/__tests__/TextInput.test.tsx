import {TextInput} from '@components/inputs';
import React from 'react';
import {render} from '@testing-library/react-native';
import colors from '@src/theme/colors';
import {MykrossIconFont} from '@src/theme/enums/iconFonts';

const TEST_TEXT_ID = 'text-input-test-id';
const TEST_TEXT_INPUT_ID = `${TEST_TEXT_ID}-input-value`;
const TEST_TEXT_HINT_ID = `${TEST_TEXT_ID}-input-hint`;
const TEST_TEXT_ICON_ID = `${TEST_TEXT_ID}-input-icon`;
const TEST_TEXT_VALUE = 'Test value';
const TEST_TEXT_PLACEHOLDER = 'Placeholder text';
const TEST_TEXT_HINT = 'Example Hint';
const TEST_TEXT_IS_VALID = true;
const TEST_TEXT_MAX_LENGTH = 20;
const TEXT_INPUT_INVALID_COLOR = colors.red;
const TEXT_INPUT_NO_COLOR = undefined;

describe('<TextInput /> - components/inputs', () => {
    const onChangeMock = jest.fn();

    it('Should set maxLength prop to passed prop', () => {
        const {getByTestId} = render(
            <TextInput
                placeholder={TEST_TEXT_PLACEHOLDER}
                value={TEST_TEXT_VALUE}
                onChangeValue={onChangeMock}
                isValid={TEST_TEXT_IS_VALID}
                maxLength={TEST_TEXT_MAX_LENGTH}
            />,
        );

        const textInput = getByTestId(TEST_TEXT_INPUT_ID);
        expect(textInput.props.maxLength).toBe(TEST_TEXT_MAX_LENGTH);
    });

    it('Should not set border color if input is valid', () => {
        const {getByTestId} = render(
            <TextInput
                placeholder={TEST_TEXT_PLACEHOLDER}
                value={TEST_TEXT_VALUE}
                onChangeValue={onChangeMock}
                isValid={TEST_TEXT_IS_VALID}
                maxLength={TEST_TEXT_MAX_LENGTH}
            />,
        );

        const textInput = getByTestId(TEST_TEXT_INPUT_ID);
        expect(textInput.props.style[1].borderColor).toBe(TEXT_INPUT_NO_COLOR);
    });

    it('Should set border color to red if input is invalid', () => {
        const {getByTestId} = render(
            <TextInput
                placeholder={TEST_TEXT_PLACEHOLDER}
                value={TEST_TEXT_VALUE}
                onChangeValue={onChangeMock}
                isValid={!TEST_TEXT_IS_VALID}
            />,
        );

        const textInput = getByTestId(TEST_TEXT_INPUT_ID);
        expect(textInput.props.style[1].borderColor).toBe(
            TEXT_INPUT_INVALID_COLOR,
        );
    });

    it('Should render a hint if passed a hint prop', () => {
        const {getByTestId} = render(
            <TextInput
                placeholder={TEST_TEXT_PLACEHOLDER}
                value={TEST_TEXT_VALUE}
                onChangeValue={onChangeMock}
                isValid={!TEST_TEXT_IS_VALID}
                hint={TEST_TEXT_HINT}
            />,
        );

        const textInput = getByTestId(TEST_TEXT_HINT_ID);
        expect(textInput.children).not.toEqual('');
    });

    it('Should render icon if passed an icon prop', () => {
        const {getByTestId} = render(
            <TextInput
                placeholder={TEST_TEXT_PLACEHOLDER}
                value={TEST_TEXT_VALUE}
                onChangeValue={onChangeMock}
                isValid={TEST_TEXT_IS_VALID}
                icon={MykrossIconFont.MYKROSS_ICON_HOME}
            />,
        );

        const textInputIcon = getByTestId(TEST_TEXT_ICON_ID);
        expect(textInputIcon).not.toBe(null);
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });
});
