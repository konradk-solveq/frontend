import 'react-native';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import {initAppSize} from '@helpers/layoutFoo';

import {Alert} from '@components/alerts';

const ALERT_TEST_ID = 'alert-id';
const ALERT_POSITIVE_TEST_ID = `${ALERT_TEST_ID}-positive-button`;
const ALERT_NEGATIVE_TEST_ID = `${ALERT_TEST_ID}-negative-button`;
const ALERT_CONTENT_TEST_ID = `${ALERT_TEST_ID}-content`;

const CONTENT_TEXT = 'Do you want to execute this action?';
const POSITIVE_TEXT = 'Ok';
const NEGATIVE_TEXT = 'Cancel';

describe('<Alert /> - components/alerts', () => {
    const onPressFn = jest.fn();
    const onCancelFn = jest.fn();

    beforeAll(() => {
        initAppSize();
    });

    it('Should not be visible when "show" set to "false"', async () => {
        const {getByTestId} = render(
            <Alert show={false} onPress={onPressFn} onCancel={onCancelFn} />,
        );

        const modalComponent = getByTestId(ALERT_TEST_ID);
        expect(modalComponent.props.visible).toBeFalsy();
    });

    it('When positive button is pressed should fire callback function', async () => {
        const {getByTestId} = render(
            <Alert show onPress={onPressFn} onCancel={onCancelFn} />,
        );

        fireEvent.press(getByTestId(ALERT_POSITIVE_TEST_ID));
        expect(onPressFn).toBeCalled();
    });

    it('When negative button is pressed should fire callback function', async () => {
        const {getByTestId} = render(
            <Alert show onPress={onPressFn} onCancel={onCancelFn} />,
        );

        fireEvent.press(getByTestId(ALERT_NEGATIVE_TEST_ID));
        expect(onCancelFn).toBeCalled();
    });

    it('Should render set "text"', async () => {
        const {getByTestId} = render(
            <Alert
                show
                text={CONTENT_TEXT}
                onPress={onPressFn}
                onCancel={onCancelFn}
            />,
        );

        const contentComponent = getByTestId(ALERT_CONTENT_TEST_ID);
        expect(contentComponent.props.children).toEqual(CONTENT_TEXT);
    });

    it('Should render set "pressText"', async () => {
        const {getByTestId} = render(
            <Alert
                show
                pressText={POSITIVE_TEXT}
                onPress={onPressFn}
                onCancel={onCancelFn}
            />,
        );

        const positiveComponent = getByTestId(`${ALERT_POSITIVE_TEST_ID}-text`);
        expect(positiveComponent.props.children).toEqual(POSITIVE_TEXT);
    });

    it('Should render set "cancelText"', async () => {
        const {getByTestId} = render(
            <Alert
                show
                cancelText={NEGATIVE_TEXT}
                onPress={onPressFn}
                onCancel={onCancelFn}
            />,
        );

        const negativeComponent = getByTestId(`${ALERT_NEGATIVE_TEST_ID}-text`);
        expect(negativeComponent.props.children).toEqual(NEGATIVE_TEXT);
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });
});
