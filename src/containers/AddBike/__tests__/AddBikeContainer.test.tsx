import 'react-native';
import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';

import {AddBikeContainer} from '@containers/AddBike';

const ADD_BIKE_CONTAINER_TEST_ID = 'add-bike-container-test-id';

describe('<AddBikeContainer /> - containers/Bike/containers/AddBikeContainer', () => {
    const onPressLinkFn = jest.fn();
    const onPressScanNfcFn = jest.fn();
    const onPressByFrameNrFn = jest.fn();

    it('Should press link button', () => {
        const {getByTestId} = render(
            <AddBikeContainer
                onPressLink={onPressLinkFn}
                onPressScanNfc={onPressScanNfcFn}
                onPressFindByNumber={onPressByFrameNrFn}
            />,
        );

        const primaryButton = getByTestId(
            `${ADD_BIKE_CONTAINER_TEST_ID}-link-button`,
        );
        fireEvent.press(primaryButton);

        expect(onPressLinkFn).toBeCalledTimes(1);
    });

    it('Should press scan nfc button', () => {
        const {getByTestId} = render(
            <AddBikeContainer
                onPressLink={onPressLinkFn}
                onPressScanNfc={onPressScanNfcFn}
                onPressFindByNumber={onPressByFrameNrFn}
            />,
        );

        const primaryButton = getByTestId(
            `${ADD_BIKE_CONTAINER_TEST_ID}-scan-nfc-button`,
        );
        fireEvent.press(primaryButton);

        expect(onPressScanNfcFn).toBeCalledTimes(1);
    });

    it('Should press find by number button', () => {
        const {getByTestId} = render(
            <AddBikeContainer
                onPressLink={onPressLinkFn}
                onPressScanNfc={onPressScanNfcFn}
                onPressFindByNumber={onPressByFrameNrFn}
            />,
        );

        const primaryButton = getByTestId(
            `${ADD_BIKE_CONTAINER_TEST_ID}-find-by-number-button`,
        );
        fireEvent.press(primaryButton);

        expect(onPressByFrameNrFn).toBeCalledTimes(1);
    });

    it('When scanNFC button is disabled should not call action', () => {
        const {getByTestId} = render(
            <AddBikeContainer
                onPressLink={onPressLinkFn}
                onPressScanNfc={onPressScanNfcFn}
                onPressFindByNumber={onPressByFrameNrFn}
                scanButtonIsDisabled
            />,
        );

        const primaryButton = getByTestId(
            `${ADD_BIKE_CONTAINER_TEST_ID}-scan-nfc-button`,
        );
        fireEvent.press(primaryButton);

        expect(onPressScanNfcFn).not.toBeCalled();
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });
});
