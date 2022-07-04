import 'react-native';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import {initAppSize} from '@helpers/layoutFoo';
import LocationButton from '@pages/main/recording/counter/components/LocationButton';
import colors from '@theme/colors';

const BUTTON_TEST_ID = 'location-button-test-id';
const DISCOVERY_ICON_TEST_ID = `${BUTTON_TEST_ID}-discovery-icon`;
const LOCATION_ICON_TEST_ID = `${BUTTON_TEST_ID}-location-icon`;
const LOCATION_ICON_COLOR = 'transparent';
const FILLED_LOCATION_ICON_COLOR = colors.red;

describe('<LocationButton /> - pages/recording/components/buttons', () => {
    const onPressFn = jest.fn();
    beforeAll(() => {
        initAppSize();
    });

    it('When button is pressed should fire callback function', () => {
        const {getByTestId} = render(<LocationButton onPress={onPressFn} />);

        fireEvent.press(getByTestId(BUTTON_TEST_ID));
    });

    it('When button is pressed should update state from default to follow', () => {
        const {getByTestId, queryByTestId} = render(
            <LocationButton onPress={onPressFn} />,
        );

        const buttonComponent = getByTestId(BUTTON_TEST_ID);

        /**
         * Check init state
         */
        const discoveryIcon = getByTestId(DISCOVERY_ICON_TEST_ID);
        expect(discoveryIcon).not.toBeNull();

        /**
         * Press button
         */
        fireEvent.press(buttonComponent);
        /**
         * Icon should be replaced with location icon
         */
        const dismissedDiscoveryIcon = queryByTestId(DISCOVERY_ICON_TEST_ID);
        expect(dismissedDiscoveryIcon).toBeNull();

        const locationIcon = getByTestId(LOCATION_ICON_TEST_ID);

        /**
         * Check location icon style (should has background color)
         */
        const iconBackgroundColor =
            locationIcon.props.children.props.children.props.fill;
        expect(iconBackgroundColor).toBe(FILLED_LOCATION_ICON_COLOR);
    });

    it('When following is inactive initial icon state should be set as center', () => {
        const {getByTestId} = render(
            <LocationButton onPress={onPressFn} inactive />,
        );

        /**
         * Icon should be location icon
         */
        const locationIcon = getByTestId(LOCATION_ICON_TEST_ID);
        expect(locationIcon).not.toBeNull();

        /**
         * Check location icon style (should has empty background color)
         */
        const iconBackgroundColor =
            locationIcon.props.children.props.children.props.fill;
        expect(iconBackgroundColor).toBe(LOCATION_ICON_COLOR);
    });

    it('When following is inactive after press button state should be set as follow', () => {
        const {getByTestId} = render(
            <LocationButton onPress={onPressFn} inactive />,
        );

        /**
         * Icon should be location icon
         */
        const locationIcon = getByTestId(LOCATION_ICON_TEST_ID);
        expect(locationIcon).not.toBeNull();

        const buttonComponent = getByTestId(BUTTON_TEST_ID);
        /**
         * Press button
         */
        fireEvent.press(buttonComponent);

        /**
         * Check location icon style (should empty background color)
         */
        const iconBackgroundColor =
            locationIcon.props.children.props.children.props.fill;
        expect(iconBackgroundColor).toBe(FILLED_LOCATION_ICON_COLOR);
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });
});
