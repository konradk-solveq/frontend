import 'react-native';
import React from 'react';
import {act, fireEvent} from '@testing-library/react-native';

import renderComponent from '@jestUtils/render';
import asyncEvent from '@jestUtils/asyncEvent';
import FillUpButton from '../FillUpButton';

const FILL_UP_BUTTON_TEST_ID = 'fill-up-btn-test-id';
const FILL_UP_BUTTON_TEST_ID_TOUCHABLE = `${FILL_UP_BUTTON_TEST_ID}-touchable`;
const FILL_UP_BUTTON_TEST_ID_ANIMATION_BG = `${FILL_UP_BUTTON_TEST_ID}-animated-bg`;
const FILL_UP_BUTTON_TEST_TEXT = 'Press and hold';

jest.useFakeTimers();
describe('<FillUpButton /> - components/buttons', () => {
    const onPressFn = jest.fn();

    it('Should be able to press in and out', async () => {
        const component = await asyncEvent(
            renderComponent(
                <FillUpButton
                    onFilledAction={onPressFn}
                    text={FILL_UP_BUTTON_TEST_TEXT}
                />,
            ),
        );

        fireEvent(
            component.getByTestId(FILL_UP_BUTTON_TEST_ID_TOUCHABLE),
            'pressIn',
        );
        fireEvent(
            component.getByTestId(FILL_UP_BUTTON_TEST_ID_TOUCHABLE),
            'pressOut',
        );
    });

    it('Should not change the initial width of background fill if not pressed', async () => {
        const component = await asyncEvent(
            renderComponent(
                <FillUpButton
                    onFilledAction={onPressFn}
                    text={FILL_UP_BUTTON_TEST_TEXT}
                />,
            ),
        );

        const animatedBg = component.getByTestId(
            FILL_UP_BUTTON_TEST_ID_ANIMATION_BG,
        );

        expect(animatedBg.props.style.width).toEqual('0%');
    });

    it('Should change width of animated background after 1 second', async () => {
        const component = await asyncEvent(
            renderComponent(
                <FillUpButton onFilledAction={onPressFn} text={'test'} />,
            ),
        );

        fireEvent(
            component.getByTestId(FILL_UP_BUTTON_TEST_ID_TOUCHABLE),
            'pressIn',
        );

        act(() => jest.advanceTimersByTime(1000));
        const animatedBg = component.getByTestId(
            FILL_UP_BUTTON_TEST_ID_ANIMATION_BG,
        );

        expect(animatedBg.props.style.width).not.toEqual('0%');
    });

    it('Should trigger callback function after default animation duration time (3000ms)', async () => {
        const component = await asyncEvent(
            renderComponent(
                <FillUpButton onFilledAction={onPressFn} text={'test'} />,
            ),
        );

        fireEvent(
            component.getByTestId(FILL_UP_BUTTON_TEST_ID_TOUCHABLE),
            'pressIn',
        );
        act(() => jest.advanceTimersByTime(3000));

        expect(onPressFn).toBeCalled();
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });
});
