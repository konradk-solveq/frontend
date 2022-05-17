import React from 'react';
import 'react-native';
import asyncEvent from '@jestUtils/asyncEvent';
import renderComponent from '@jestUtils/render';
import {fireEvent} from '@testing-library/react-native';
import {LinkButton} from '@src/components/buttons';
import colors from '@src/theme/colors';

const LINK_BUTTON_TEST_TEXT = 'phone';
const LINK_BUTTON_TEST_DISABLED_COLOR = colors.dark;

describe('<LinkButton /> - components/buttons', () => {
    const onPressFn = jest.fn();

    it('Should be able to press Link button', async () => {
        const {getByTestId} = await asyncEvent(
            renderComponent(
                <LinkButton text={LINK_BUTTON_TEST_TEXT} onPress={jest.fn()} />,
            ),
        );

        fireEvent.press(getByTestId('link-button-test-id'));
    });

    it('Should not be able to press Link button with disabled prop', async () => {
        const {getByTestId} = await asyncEvent(
            renderComponent(
                <LinkButton
                    text={LINK_BUTTON_TEST_TEXT}
                    onPress={onPressFn}
                    disabled={true}
                />,
            ),
        );

        fireEvent.press(getByTestId('link-button-test-id'));
        expect(onPressFn).not.toBeCalled();
    });

    it('Should render disabled color if passed prop', async () => {
        const {getByTestId} = await asyncEvent(
            renderComponent(
                <LinkButton
                    text={LINK_BUTTON_TEST_TEXT}
                    onPress={onPressFn}
                    disabled={true}
                    disabledColor={LINK_BUTTON_TEST_DISABLED_COLOR}
                />,
            ),
        );

        const pressableElement = getByTestId('text-link-test-id');
        expect(pressableElement.props.style[0].color).toBe(
            LINK_BUTTON_TEST_DISABLED_COLOR,
        );
    });
});
