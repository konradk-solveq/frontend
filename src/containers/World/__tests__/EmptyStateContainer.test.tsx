import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import EmptyStateContainer from '@containers/World/EmptyStateContainer';
import asyncEvent from '@jestUtils/asyncEvent';

const TEST_TITLE = 'Test title';
const TEST_DESCRIPTION = 'Test description';
const TEST_BUTTON = 'Test button';
const TEST_BUTTON_ID = 'empty-state-button';

describe('<EmptyStateContainer /> - containers', () => {
    const onBtnPress = jest.fn();
    it('should render the passed title', () => {
        const {getByText} = render(<EmptyStateContainer title={TEST_TITLE} />);
        const title = getByText(TEST_TITLE);
        expect(title).not.toBe(null);
    });
    it('should render the passed description', () => {
        const {getByText} = render(
            <EmptyStateContainer description={TEST_DESCRIPTION} />,
        );
        const description = getByText(TEST_DESCRIPTION);
        expect(description).not.toBe(null);
    });
    it('should render the passed button', () => {
        const {getByText} = render(
            <EmptyStateContainer
                buttonText={TEST_BUTTON}
                onPress={onBtnPress}
            />,
        );
        const buttonText = getByText(TEST_BUTTON);
        expect(buttonText).not.toBe(null);
    });
    it('should call the onPress function after clicking the button', async () => {
        const {getByTestId} = render(
            <EmptyStateContainer
                buttonText={TEST_BUTTON}
                onPress={onBtnPress}
            />,
        );
        const button = getByTestId(TEST_BUTTON_ID);
        expect(button).not.toBe(null);
        await asyncEvent(fireEvent.press(button));
        expect(onBtnPress).toBeCalledTimes(1);
    });
});
