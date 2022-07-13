import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {ImageItem} from '@components/images';

const TEST_URI = 'test';
const TEST_REMOVE_ID = 'test-remove-button';

describe('<ImageItem /> - components/images', () => {
    const onPressFn = jest.fn();
    const onRemoveFn = jest.fn();
    it('should fire on press function', () => {
        const {getByTestId} = render(
            <ImageItem
                imageUri={TEST_URI}
                testID={TEST_URI}
                onPress={onPressFn}
            />,
        );

        fireEvent.press(getByTestId(TEST_URI));

        expect(onPressFn).toBeCalledWith(TEST_URI);
    });

    it('should fire on remove function if the button is shown', () => {
        const {getByTestId} = render(
            <ImageItem
                imageUri={TEST_URI}
                testID={TEST_URI}
                onRemove={onRemoveFn}
                withRemoveButton
            />,
        );

        fireEvent.press(getByTestId(TEST_REMOVE_ID));

        expect(onRemoveFn).toBeCalledWith(TEST_URI);
    });

    it("shouldn't render the remove button if withRemoveButton is not passed", async () => {
        const {queryByTestId} = render(
            <ImageItem
                imageUri={TEST_URI}
                testID={TEST_URI}
                onRemove={onRemoveFn}
            />,
        );

        const removeBtn = queryByTestId(TEST_REMOVE_ID);

        expect(removeBtn).toBeNull();
    });

    it("shouldn't render the remove button if there's no onRemove function", async () => {
        const {queryByTestId} = render(
            <ImageItem
                imageUri={TEST_URI}
                testID={TEST_URI}
                withRemoveButton
            />,
        );

        const removeBtn = queryByTestId(TEST_REMOVE_ID);

        expect(removeBtn).toBeNull();
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });
});
