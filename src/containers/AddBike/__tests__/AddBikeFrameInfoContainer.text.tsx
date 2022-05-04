import 'react-native';
import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';

import {AddBikeFrameInfoContainer} from '@containers/AddBike';

const ADD_BIKE_FRAME_INTO_CONTAINER_TEST_ID =
    'add-bike-frame-info-container-id';

describe('<AddBikeFrameInfoContainer /> - containers/Bike/containers/AddBikeFrameInfoContainer', () => {
    const onPressFn = jest.fn();

    it('Should press primary button', () => {
        const {getByTestId} = render(
            <AddBikeFrameInfoContainer onPress={onPressFn} />,
        );

        const primaryButton = getByTestId(
            `${ADD_BIKE_FRAME_INTO_CONTAINER_TEST_ID}-button`,
        );
        fireEvent.press(primaryButton);

        expect(onPressFn).toBeCalledTimes(1);
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });
});
