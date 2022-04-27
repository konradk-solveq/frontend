import 'react-native';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import FiltersHeader from '@pages/main/world/components/filters/FiltersHeader';
import {initAppSize} from '@helpers/layoutFoo';
import asyncEvent from '@jestUtils/asyncEvent';

import i18next from '@translations/i18next';
import {DropdownItemT} from '@components/types/dropdown';

export const mockedDropdownList: DropdownItemT[] = [
    {
        id: '1',
        sortBy: 'distance',
        order: 'asc',
        text: i18next.t('BikeMap.sortBy.nearest'),
        isDefault: true,
        defaultItemSuffix: i18next.t('BikeMap.sortBy.default'),
    },
    {
        id: '2',
        sortBy: 'created',
        order: 'desc',
        text: i18next.t('BikeMap.sortBy.newest'),
    },
    {
        id: '3',
        sortBy: 'created',
        order: 'asc',
        text: i18next.t('BikeMap.sortBy.oldest'),
    },
];

const TEST_SORT_BTN_NAME = 'Test sort button name';
const TEST_SORT_BTN_ID = 'header-sort-btn';
const TEST_FILTER_BTN_ID = 'header-filter-btn';
const TEST_DROPDOWN_ID = 'dropdown-test-id';
const TEST_ITEM_INDEX = '2';
const TEST_DROPDOWN_ITEM_ID = `dropdown-test-id-dropdown-item-${TEST_ITEM_INDEX}`;

describe('<FiltersHeader /> - pages/main/world/components/filters', () => {
    const setShowDropdown = jest.fn();
    const onFiltersModalOpenHandler = jest.fn();
    const toggleDropdown = jest.fn();
    const onSortByHandler = jest.fn();
    beforeAll(() => {
        initAppSize();
    });
    it('should show passed sort button name', async () => {
        const {getByText} = render(
            <FiltersHeader
                shouldHide={false}
                sortButtonName={TEST_SORT_BTN_NAME}
                setShowDropdown={setShowDropdown}
                onFiltersModalOpenHandler={onFiltersModalOpenHandler}
                showDropdown={false}
                toggleDropdown={toggleDropdown}
                onSortByHandler={onSortByHandler}
                dropdownList={mockedDropdownList}
            />,
        );
        const sortButtonTitle = getByText(TEST_SORT_BTN_NAME);
        expect(sortButtonTitle).not.toBe(null);
    });
    it('should call setShowDropdown function on dropdown press', async () => {
        const {getByTestId} = render(
            <FiltersHeader
                shouldHide={false}
                sortButtonName={TEST_SORT_BTN_NAME}
                setShowDropdown={setShowDropdown}
                onFiltersModalOpenHandler={onFiltersModalOpenHandler}
                showDropdown={false}
                toggleDropdown={toggleDropdown}
                onSortByHandler={onSortByHandler}
                dropdownList={mockedDropdownList}
            />,
        );
        const dropdownButton = getByTestId(TEST_SORT_BTN_ID);
        await asyncEvent(fireEvent.press(dropdownButton));
        expect(setShowDropdown).toBeCalledWith(true);
    });
    it('should call onFiltersModalOpenHandler function on filter button press', async () => {
        const {getByTestId} = render(
            <FiltersHeader
                shouldHide={false}
                sortButtonName={TEST_SORT_BTN_NAME}
                setShowDropdown={setShowDropdown}
                onFiltersModalOpenHandler={onFiltersModalOpenHandler}
                showDropdown={false}
                toggleDropdown={toggleDropdown}
                onSortByHandler={onSortByHandler}
                dropdownList={mockedDropdownList}
            />,
        );
        const filterButton = getByTestId(TEST_FILTER_BTN_ID);
        await asyncEvent(fireEvent.press(filterButton));
        expect(onFiltersModalOpenHandler).toBeCalledTimes(1);
    });
    it('should call toggleDropdown function on dropdown button press', async () => {
        const {getByTestId} = render(
            <FiltersHeader
                shouldHide={false}
                sortButtonName={TEST_SORT_BTN_NAME}
                setShowDropdown={setShowDropdown}
                onFiltersModalOpenHandler={onFiltersModalOpenHandler}
                showDropdown={false}
                toggleDropdown={toggleDropdown}
                onSortByHandler={onSortByHandler}
                dropdownList={mockedDropdownList}
            />,
        );
        const dropdown = getByTestId(TEST_DROPDOWN_ID);
        await asyncEvent(fireEvent.press(dropdown));
        expect(toggleDropdown).toBeCalledTimes(1);
    });
    it('should call onSortByHandler function on dropdown item press', async () => {
        const {getByTestId} = render(
            <FiltersHeader
                shouldHide={false}
                sortButtonName={TEST_SORT_BTN_NAME}
                setShowDropdown={setShowDropdown}
                onFiltersModalOpenHandler={onFiltersModalOpenHandler}
                showDropdown={false}
                toggleDropdown={toggleDropdown}
                onSortByHandler={onSortByHandler}
                dropdownList={mockedDropdownList}
            />,
        );
        const dropdownItem = getByTestId(TEST_DROPDOWN_ITEM_ID);
        await asyncEvent(fireEvent.press(dropdownItem));
        expect(onSortByHandler).toBeCalledWith(TEST_ITEM_INDEX);
    });
    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });
});
