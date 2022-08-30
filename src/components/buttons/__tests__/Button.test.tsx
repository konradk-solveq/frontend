import 'react-native';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import {initAppSize} from '@helpers/layoutFoo';
import {getFFontSize} from '@theme/utils/appLayoutDimensions';
import {Button} from '@components/buttons';
import {MykrossIconFont} from '@theme/enums/iconFonts';

const BUTTON_TEST_TEXT = 'Test button';
const BUTTON_TEST_ICON = MykrossIconFont.MYKROSS_ICON_USER;
const BUTTON_TEST_ID = 'button-test-id';
const BUTTON_TEXT_COLOR = '#ededed';
const BUTTON_COLOR = '#C63733';
const BUTTON_DISABLED_COLOR = '#EFD8D8';

describe('<Button /> - components/buttons', () => {
    const onPressFn = jest.fn();
    beforeAll(() => {
        initAppSize();
    });

    it('When button is pressed should fire callback function', () => {
        const {getByTestId} = render(
            <Button text={BUTTON_TEST_TEXT} onPress={onPressFn} />,
        );

        fireEvent.press(getByTestId(BUTTON_TEST_ID));
    });

    it('Should change text color when passed', () => {
        const {getByTestId} = render(
            <Button
                text={BUTTON_TEST_TEXT}
                onPress={onPressFn}
                textColor={BUTTON_TEXT_COLOR}
            />,
        );

        const textElement = getByTestId(`${BUTTON_TEST_ID}-text`);
        expect(textElement.props.style[1].color).toEqual(BUTTON_TEXT_COLOR);
    });

    it('Should change button color when passed', () => {
        const {getByTestId} = render(
            <Button
                text={BUTTON_TEST_TEXT}
                onPress={onPressFn}
                color={BUTTON_COLOR}
            />,
        );

        const buttonElement = getByTestId(`${BUTTON_TEST_ID}`);
        expect(buttonElement.props.style[3].backgroundColor).toEqual(
            BUTTON_COLOR,
        );
    });

    it('Should render icon when passed new value', () => {
        const {getByTestId} = render(
            <Button
                text={BUTTON_TEST_TEXT}
                onPress={onPressFn}
                icon={BUTTON_TEST_ICON}
            />,
        );

        const iconElement = getByTestId(`${BUTTON_TEST_ID}-icon`);
        expect(iconElement).not.toBeNull();
    });

    it('Should render icon with size "34" when passed new value', () => {
        const fontSize = 34;
        const expectedFontSize = getFFontSize(fontSize);
        const {getByTestId} = render(
            <Button
                text={BUTTON_TEST_TEXT}
                onPress={onPressFn}
                icon={BUTTON_TEST_ICON}
                iconSize={fontSize}
            />,
        );

        const iconElement = getByTestId(`${BUTTON_TEST_ID}-icon`);
        expect(iconElement.props.style[1].fontSize).toEqual(expectedFontSize);
    });

    it('Should render loader when passed "withLoader"', () => {
        const {getByTestId} = render(
            <Button text={BUTTON_TEST_TEXT} onPress={onPressFn} withLoader />,
        );

        const loaderElement = getByTestId(`${BUTTON_TEST_ID}-loader`);
        expect(loaderElement).not.toBeNull();
    });

    it('Should button be disabled when passed "disabled"', () => {
        const {getByTestId} = render(
            <Button text={BUTTON_TEST_TEXT} onPress={onPressFn} disabled />,
        );

        fireEvent.press(getByTestId(BUTTON_TEST_ID));

        expect(onPressFn).not.toBeCalled();
    });

    it('Should render button with "disabledColor" when is disabled', () => {
        const {getByTestId} = render(
            <Button
                text={BUTTON_TEST_TEXT}
                onPress={onPressFn}
                disabled
                disabledColor={BUTTON_DISABLED_COLOR}
            />,
        );

        const buttonElement = getByTestId(`${BUTTON_TEST_ID}`);
        expect(buttonElement.props.style[3].backgroundColor).toEqual(
            BUTTON_DISABLED_COLOR,
        );
    });

    it('Should button be disabled when passed "disableTouch"', () => {
        const {getByTestId} = render(
            <Button text={BUTTON_TEST_TEXT} onPress={onPressFn} disableTouch />,
        );

        fireEvent.press(getByTestId(BUTTON_TEST_ID));

        expect(onPressFn).not.toBeCalled();
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });
});
