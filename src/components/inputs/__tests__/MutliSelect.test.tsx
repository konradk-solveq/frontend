import {initAppSize} from '@helpers/layoutFoo';
import {SelectOptionType} from '@interfaces/form';
import {MultiSelect} from '@components/inputs';
import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import colors from '@src/theme/colors';

const TEST_OPTIONS: SelectOptionType[] = [
    {enumValue: '1', i18nValue: 'Opt. 1'},
    {enumValue: '2', i18nValue: 'Opt. 2'},
    {enumValue: '3', i18nValue: 'Opt. 3'},
    {enumValue: '4', i18nValue: 'Opt. 4'},
    {enumValue: '5', i18nValue: 'Opt. 5'},
    {enumValue: '6', i18nValue: 'Opt. 6'},
    {enumValue: '7', i18nValue: 'Opt. 7'},
    {enumValue: '8', i18nValue: 'Opt. 8'},
];

const TEST_BUTTON_1_ID = 'multiselect-button-1';
const TEST_BUTTON_1_TEXT = TEST_OPTIONS[0].i18nValue;
const TEST_BUTTON_2_ID = 'multiselect-button-2';
const TEST_BUTTON_2_TEXT = TEST_OPTIONS[1].i18nValue;
const inactiveTextColor = colors.black;
const activeTextColor = colors.white;

describe('<MultiSelect /> - components/input', () => {
    const onSave = jest.fn();
    beforeAll(() => {
        initAppSize();
    });

    it('Should activate a given button when pressed', async () => {
        const {getByTestId, getByText} = render(
            <MultiSelect
                predefined={[]}
                options={TEST_OPTIONS}
                optionsTransName={''}
                onSave={onSave}
            />,
        );

        const button = getByTestId(TEST_BUTTON_1_ID);
        const text = getByText(TEST_BUTTON_1_TEXT);

        expect(text.props.style[1].color).toBe(inactiveTextColor);
        fireEvent.press(button);
        expect(text.props.style[1].color).toBe(activeTextColor);
    });

    it('Should activate more than one button when pressed', async () => {
        const {getByTestId, getByText} = render(
            <MultiSelect
                predefined={[]}
                options={TEST_OPTIONS}
                optionsTransName={''}
                onSave={onSave}
            />,
        );

        const button1 = getByTestId(TEST_BUTTON_1_ID);
        const text1 = getByText(TEST_BUTTON_1_TEXT);
        const button2 = getByTestId(TEST_BUTTON_2_ID);
        const text2 = getByText(TEST_BUTTON_2_TEXT);
        fireEvent.press(button1);
        fireEvent.press(button2);
        expect(text1.props.style[1].color).toBe(activeTextColor);
        expect(text2.props.style[1].color).toBe(activeTextColor);
    });

    it('Should enable the predefined options by default', async () => {
        const {getByText} = render(
            <MultiSelect
                predefined={[TEST_OPTIONS[0].enumValue]}
                options={TEST_OPTIONS}
                optionsTransName={''}
                onSave={onSave}
            />,
        );

        const text = getByText(TEST_BUTTON_1_TEXT);

        expect(text.props.style[1].color).toBe(activeTextColor);
    });

    it('Should deactivate a given button when pressed', async () => {
        const {getByTestId, getByText} = render(
            <MultiSelect
                predefined={[TEST_OPTIONS[0].enumValue]}
                options={TEST_OPTIONS}
                optionsTransName={''}
                onSave={onSave}
            />,
        );

        const button = getByTestId(TEST_BUTTON_1_ID);
        const text = getByText(TEST_BUTTON_1_TEXT);
        expect(text.props.style[1].color).toBe(activeTextColor);
        fireEvent.press(button);
        expect(text.props.style[1].color).toBe(inactiveTextColor);
    });

    it('Should have only one action active at once when the radio prop is true', async () => {
        const {getByTestId, getByText} = render(
            <MultiSelect
                predefined={[]}
                options={TEST_OPTIONS}
                optionsTransName={''}
                onSave={onSave}
                isRadioType={true}
            />,
        );

        const button1 = getByTestId(TEST_BUTTON_1_ID);
        const text1 = getByText(TEST_BUTTON_1_TEXT);
        const button2 = getByTestId(TEST_BUTTON_2_ID);
        const text2 = getByText(TEST_BUTTON_2_TEXT);
        fireEvent.press(button1);
        expect(text1.props.style[1].color).toBe(activeTextColor);
        expect(text2.props.style[1].color).toBe(inactiveTextColor);
        fireEvent.press(button2);
        expect(text1.props.style[1].color).toBe(inactiveTextColor);
        expect(text2.props.style[1].color).toBe(activeTextColor);
    });

    it('Should be impossible to deactivate the chosen radio button', async () => {
        const {getByTestId, getByText} = render(
            <MultiSelect
                predefined={[TEST_OPTIONS[0].enumValue]}
                options={TEST_OPTIONS}
                optionsTransName={''}
                onSave={onSave}
                isRadioType={true}
            />,
        );

        const button = getByTestId(TEST_BUTTON_1_ID);
        const text = getByText(TEST_BUTTON_1_TEXT);
        expect(text.props.style[1].color).toBe(activeTextColor);
        fireEvent.press(button);
        expect(text.props.style[1].color).toBe(activeTextColor);
    });

    it('Should be impossible to deactivate the chosen radio button if the withEmptyRadio prop is true', async () => {
        const {getByTestId, getByText} = render(
            <MultiSelect
                predefined={[TEST_OPTIONS[0].enumValue]}
                options={TEST_OPTIONS}
                optionsTransName={''}
                onSave={onSave}
                isRadioType={true}
                withEmptyRadio={true}
            />,
        );

        const button = getByTestId(TEST_BUTTON_1_ID);
        const text = getByText(TEST_BUTTON_1_TEXT);
        expect(text.props.style[1].color).toBe(activeTextColor);
        fireEvent.press(button);
        expect(text.props.style[1].color).toBe(inactiveTextColor);
    });
});
