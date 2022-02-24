import 'react-native';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import {MykrossIconFont} from '@theme/enums/iconFonts';

import {DropdownItem} from '@components/dropdown';

const DROPDOWN_ICON = MykrossIconFont.MYKROSS_ICON_EDIT;

const DROPDOWN_ITEM_TEXT = 'Dropdown item';
const DROPDOWN_ITEM_TEST_ID = 'dropdown-item-test-id';
const SELECTED_DROPDOWN_ITEM_COLOR = '#ededed';

describe('<DropdownItem /> - components/dropdown', () => {
    const onPressFn = jest.fn();

    it('When item is pressed should fire callback function', () => {
        const {getByTestId} = render(
            <DropdownItem text={DROPDOWN_ITEM_TEXT} onPress={onPressFn} />,
        );

        fireEvent.press(getByTestId(`${DROPDOWN_ITEM_TEST_ID}-button`));
    });

    it('Should not change color when passed and item is not selected', () => {
        const {getByTestId} = render(
            <DropdownItem
                text={DROPDOWN_ITEM_TEXT}
                onPress={onPressFn}
                isSelected={false}
                selectedItemColor={SELECTED_DROPDOWN_ITEM_COLOR}
            />,
        );

        const itemTextElement = getByTestId(`${DROPDOWN_ITEM_TEST_ID}-text`);
        expect(itemTextElement.props.style[1].color).not.toEqual(
            SELECTED_DROPDOWN_ITEM_COLOR,
        );
    });

    it('Should change color when passed and item is selected', () => {
        const {getByTestId} = render(
            <DropdownItem
                text={DROPDOWN_ITEM_TEXT}
                onPress={onPressFn}
                isSelected={true}
                selectedItemColor={SELECTED_DROPDOWN_ITEM_COLOR}
            />,
        );

        const itemTextElement = getByTestId(`${DROPDOWN_ITEM_TEST_ID}-text`);
        expect(itemTextElement.props.style[1].color).toEqual(
            SELECTED_DROPDOWN_ITEM_COLOR,
        );
    });

    it('Should not render icon when item is not selected', () => {
        const {queryByTestId} = render(
            <DropdownItem
                text={DROPDOWN_ITEM_TEXT}
                onPress={onPressFn}
                selectedItemIcon={DROPDOWN_ICON}
            />,
        );

        const itemIconElement = queryByTestId(`${DROPDOWN_ITEM_TEST_ID}-icon`);
        expect(itemIconElement).toBeNull();
    });

    it('Should change icon when passed new value', () => {
        const {getByTestId} = render(
            <DropdownItem
                text={DROPDOWN_ITEM_TEXT}
                onPress={onPressFn}
                isSelected={true}
                selectedItemIcon={DROPDOWN_ICON}
            />,
        );

        const itemIconElement = getByTestId(`${DROPDOWN_ITEM_TEST_ID}-icon`);
        expect(itemIconElement.props.children).toEqual(DROPDOWN_ICON);
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });
});
