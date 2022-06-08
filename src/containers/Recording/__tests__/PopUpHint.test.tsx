import 'react-native';
import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';

import {PopUpHint} from '@containers/Recording/components';

const TEST_ID = 'popup-hint';
const POPUP_TEST_ID = `${TEST_ID}-popup`;

describe('<PopUpHint /> - containers/Recording/components/PopUpHint', () => {
    const mockedFn = jest.fn();

    it('Should press on popup when is visible', () => {
        const {getByTestId} = render(
            <PopUpHint onPress={mockedFn} show={true} />,
        );

        const iconElement = getByTestId(`${POPUP_TEST_ID}-press`);

        fireEvent.press(iconElement);
        expect(mockedFn).toBeCalled();
    });

    it('Should not press on popup when is not visible', () => {
        const {getByTestId} = render(<PopUpHint onPress={mockedFn} />);

        const iconElement = getByTestId(`${POPUP_TEST_ID}-press`);

        fireEvent.press(iconElement);
        expect(mockedFn).not.toBeCalled();
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });
});
