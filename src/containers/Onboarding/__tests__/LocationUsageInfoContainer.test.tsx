import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import LocationUsageInfoContainer from '@containers/Onboarding/LocationUsageInfoContainer';
import {locationUsage} from '@containers/Onboarding/__mocks__/onboarding';

const BUTTON_TEST_ID = 'location-usage-button-test-id';

describe('<LocationUsageInfoContainer /> - containers', () => {
    const onButtonPress = jest.fn();

    it('Should fire the pressed onServicesTilePress function on tile press', () => {
        const {getByTestId} = render(
            <LocationUsageInfoContainer
                {...locationUsage}
                onButtonPress={onButtonPress}
            />,
        );

        fireEvent.press(getByTestId(BUTTON_TEST_ID));

        expect(onButtonPress).toBeCalledTimes(1);
    });
});
