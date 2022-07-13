import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {ImageSwiper} from '@components/images';

const TEST_URIS = ['test0', 'test', 'test2'];
const TEST_REMOVE_ID = 'test-remove-button';
const TEST_SWIPER_ID = 'test-scroll-id';

describe('<ImageSwiper /> - components/images', () => {
    const onPressFn = jest.fn();
    const onRemoveFn = jest.fn();
    it('should render all images', () => {
        const {getByTestId} = render(
            <ImageSwiper
                images={TEST_URIS}
                onPress={onPressFn}
                testID={TEST_SWIPER_ID}
            />,
        );

        const scroll = getByTestId(TEST_SWIPER_ID);

        expect(scroll.props.children[1].props.children.length).toBe(3);
    });

    it('should fire on press function', () => {
        const {getByTestId} = render(
            <ImageSwiper images={TEST_URIS} onPress={onPressFn} />,
        );

        fireEvent.press(getByTestId(TEST_URIS[1]));

        expect(onPressFn).toBeCalledWith(TEST_URIS[1]);
    });

    it('should fire on remove function if the button is shown', () => {
        const {getByTestId} = render(
            <ImageSwiper
                images={TEST_URIS}
                onPress={onPressFn}
                onPressRemove={onRemoveFn}
                withRemoveButton
            />,
        );

        fireEvent.press(getByTestId(TEST_REMOVE_ID));

        expect(onRemoveFn).toBeCalledWith(TEST_URIS[1]);
    });

    it("shouldn't render the remove button if withRemoveButton is not passed", async () => {
        const {queryByTestId} = render(
            <ImageSwiper
                images={TEST_URIS}
                onPress={onPressFn}
                onPressRemove={onRemoveFn}
            />,
        );

        const removeBtn = queryByTestId(TEST_REMOVE_ID);

        expect(removeBtn).toBeNull();
    });

    it("shouldn't render the remove button if there's no onRemove function", async () => {
        const {queryByTestId} = render(
            <ImageSwiper
                images={TEST_URIS}
                onPress={onPressFn}
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
