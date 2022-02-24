import 'react-native';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import {Dropdown} from '@components/dropdown';
import {DropdownItemT} from '@components/types/dropdown';

const DROPDOWN_BUTTON_TEXT = 'Dropdown button';
const DROPDOWN_TEST_ID = 'dropdown-test-id';

const ITEMS_LIST: DropdownItemT[] = [
    {
        id: '1',
        value: 'nearest',
        text: 'By distance',
        isDefault: true,
        defaultItemSuffix: '(default)',
    },
    {id: '2', value: 'newest', text: 'By date - newest'},
    {id: '3', value: 'oldest', text: 'By date - oldest'},
    {id: '4', value: 'popular', text: 'Popularity'},
];

describe('<Dropdown /> - components/dropdown', () => {
    const onPressFn = jest.fn();

    it('When button is pressed should show dropdown items box', () => {
        const {getByTestId} = render(
            <Dropdown
                list={ITEMS_LIST}
                buttonText={DROPDOWN_BUTTON_TEXT}
                openOnStart
            />,
        );

        fireEvent.press(getByTestId(`${DROPDOWN_TEST_ID}-button`));
        const itemsListElement = getByTestId(`${DROPDOWN_TEST_ID}-items-list`);
        expect(itemsListElement).not.toBeNull();
    });

    it('Should render "reset button"', () => {
        const {getByTestId} = render(
            <Dropdown
                list={ITEMS_LIST}
                buttonText={DROPDOWN_BUTTON_TEXT}
                openOnStart
            />,
        );

        const resetButton = getByTestId(`${DROPDOWN_TEST_ID}-reset-button`);
        expect(resetButton).not.toBeNull();

        const firstDropdownItem = getByTestId(
            `${DROPDOWN_TEST_ID}-dropdown-item-1-text`,
        );
        const expectedText = `${ITEMS_LIST[0].text} ${ITEMS_LIST[0].defaultItemSuffix}`;
        expect(firstDropdownItem.children).toContain(expectedText);
    });

    it('Should not render "reset button"', () => {
        const {queryByTestId} = render(
            <Dropdown
                list={ITEMS_LIST}
                buttonText={DROPDOWN_BUTTON_TEXT}
                openOnStart
                withResetButton={false}
            />,
        );

        const resetButton = queryByTestId(`${DROPDOWN_TEST_ID}-reset-button`);
        expect(resetButton).toBeNull();
    });

    it('Should call callback function when dropdown item pressed', () => {
        const {getByTestId} = render(
            <Dropdown
                list={ITEMS_LIST}
                buttonText={DROPDOWN_BUTTON_TEXT}
                openOnStart
                withResetButton={false}
                onPressItem={onPressFn}
            />,
        );

        const resetButton = getByTestId(
            `${DROPDOWN_TEST_ID}-dropdown-item-2-text`,
        );
        fireEvent.press(resetButton);

        expect(onPressFn).toBeCalled();
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });
});
