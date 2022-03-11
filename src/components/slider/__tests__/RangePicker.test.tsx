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

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });
});
