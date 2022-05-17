import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';
import {Loader} from '@components/loader';
import {getFHorizontalPx} from '@theme/utils/appLayoutDimensions';
import colors from '@src/theme/colors';

const LOADER_TEST_ID = 'loader-test-id';

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'android',
    select: () => null,
}));
describe('<Loader /> - components/loader', () => {
    it('Should set loader size to calculated value', async () => {
        const LOADER_SIZE = 32;
        const expectedSize = getFHorizontalPx(LOADER_SIZE);
        const {getByTestId} = render(<Loader androidSize={LOADER_SIZE} />);

        const loaderElem = getByTestId(LOADER_TEST_ID);
        expect(loaderElem.props.size).toBe(expectedSize);
    });

    it('Should change loader color if passed prop', async () => {
        const {getByTestId} = render(<Loader color={colors.green} />);

        const loaderElem = getByTestId(LOADER_TEST_ID);
        expect(loaderElem.props.color).toBe(colors.green);
    });

    afterEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
    });
});
