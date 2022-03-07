import 'react-native';
import React from 'react';

import {initAppSize} from '@helpers/layoutFoo';
import Slider from '@components/slider/Slider';
import {render} from '@testing-library/react-native';

const TEST_MIN = 0;
const TEST_MAX = 100;
const TEST_STEP = 1;
const TEST_ID = 'slider-test-id';
const THUMB_TEST_ID = 'slider-test-id-thumb';
const RAIL_TEST_ID = 'slider-test-id-rail';
const SELECTED_RAIL_TEST_ID = 'slider-test-id-selected-rail';
const TEST_COLOR = '#73571D';

describe('<Slider /> - components/slider', () => {
    const onValueChangeFn = jest.fn();
    beforeAll(() => {
        initAppSize();
    });

    it('Should change thumbColor when passed', async () => {
        const {queryAllByTestId} = render(
            <Slider
                min={TEST_MIN}
                max={TEST_MAX}
                step={TEST_STEP}
                onValueChange={onValueChangeFn}
                thumbColor={TEST_COLOR}
                testID={TEST_ID}
            />,
        );
        const thumbs = queryAllByTestId(THUMB_TEST_ID);
        expect(thumbs.length).toBe(2);

        /**
         *  style={[styles.shadow, thumbStyle, {backgroundColor: tColor}]}
         */
        expect(thumbs[0].props.style[2].backgroundColor).toEqual(TEST_COLOR);
    });

    it('Should disable when passed disabled prop', async () => {
        const {getByTestId} = render(
            <Slider
                min={TEST_MIN}
                max={TEST_MAX}
                step={TEST_STEP}
                onValueChange={onValueChangeFn}
                disabledThumbColor={TEST_COLOR}
                disabled={true}
                testID={TEST_ID}
            />,
        );
        const thumb = getByTestId(THUMB_TEST_ID);

        /**
         *  style={[styles.shadow, thumbStyle, {backgroundColor: tColor}]}
         */
        expect(thumb.props.style[2].backgroundColor).toEqual(TEST_COLOR);
    });

    it('Should change railColor when passed', async () => {
        const {getByTestId} = render(
            <Slider
                min={TEST_MIN}
                max={TEST_MAX}
                step={TEST_STEP}
                onValueChange={onValueChangeFn}
                railColor={TEST_COLOR}
                testID={TEST_ID}
            />,
        );
        const rail = getByTestId(RAIL_TEST_ID);

        /**
         *  style={[railStyle, {backgroundColor: railColor}]}
         */
        expect(rail.props.style[1].backgroundColor).toEqual(TEST_COLOR);
    });

    it('Should change selectedRailColor when passed', async () => {
        const {getByTestId} = render(
            <Slider
                min={TEST_MIN}
                max={TEST_MAX}
                step={TEST_STEP}
                onValueChange={onValueChangeFn}
                selectedRailColor={TEST_COLOR}
                testID={TEST_ID}
            />,
        );
        const selectedRail = getByTestId(SELECTED_RAIL_TEST_ID);

        /**
         *  style={[selectedRailStyle, {backgroundColor: selectedRailColor}]}
         */
        expect(selectedRail.props.style[1].backgroundColor).toEqual(TEST_COLOR);
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });
});
