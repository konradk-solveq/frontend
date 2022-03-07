import 'react-native';
import React from 'react';

import {initAppSize} from '@helpers/layoutFoo';
import {render} from '@testing-library/react-native';
import RangePicker from '@components/slider/RangePicker';
const TEST_STRING_LABEL = 'TEST3';
const TEST_STRING_OPTIONS = [
    'TEST1',
    'TEST2',
    TEST_STRING_LABEL,
    'TEST4',
    'TEST5',
];
const TEST_NUMBER_LABEL = 5;
const TEST_NUMBER_OPTIONS = [1, 2, 3, 4, TEST_NUMBER_LABEL, 6, 7, 8, 9];

describe('<RangePicker /> - components/slider', () => {
    const onValueChangeFn = jest.fn();
    beforeAll(() => {
        initAppSize();
    });

    it('Should render string label options', async () => {
        const {getByText} = render(
            <RangePicker
                options={TEST_STRING_OPTIONS}
                onValueChange={onValueChangeFn}
            />,
        );
        const label = getByText(TEST_STRING_LABEL);
        expect(label).not.toBe(null);
    });

    it('Should render number label options', async () => {
        const {getByText} = render(
            <RangePicker
                options={TEST_NUMBER_OPTIONS}
                onValueChange={onValueChangeFn}
            />,
        );
        const label = getByText(`${TEST_NUMBER_LABEL}`);
        expect(label).not.toBe(null);
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });
});
