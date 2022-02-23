import React from 'react';
import {StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {select, color, object, text, boolean} from '@storybook/addon-knobs';

import LayoutCenter from '@sb/utils/LayoutCenter';
import {IconFont} from '@theme/enums/iconFonts';
import colors from '@theme/colors';

import {DropdownItem} from '@components/dropdown';

storiesOf('components/dropdown/DropdownItem', module)
    .addDecorator(getStory => (
        <LayoutCenter style={styles.container}>{getStory()}</LayoutCenter>
    ))
    .add('Default', () => (
        <DropdownItem
            text={text('Text', 'Dropdown item')}
            onPress={action('dropdown-item-pressed')}
            isSelected={boolean('Mark as selected', false)}
        />
    ))
    .add('Selected', () => (
        <DropdownItem
            text={text('Text', 'Dropdown item')}
            onPress={action('dropdown-item-pressed')}
            isSelected={boolean('Mark as selected', true)}
        />
    ))
    .add('With Icon', () => (
        <DropdownItem
            text={text('Text', 'Dropdown item')}
            onPress={action('dropdown-item-pressed')}
            isSelected={boolean('Mark as selected', true)}
            selectedItemIcon={select(
                'Icon for selected item',
                IconFont,
                IconFont.FONT_ICON_OK,
            )}
        />
    ))
    .add('Customized', () => (
        <DropdownItem
            text={text('Text', 'Dropdown item')}
            onPress={action('dropdown-item-pressed')}
            isSelected={boolean('Mark as selected', false)}
            selectedItemIcon={select(
                'Icon for selected item',
                IconFont,
                IconFont.FONT_ICON_OK,
            )}
            selectedItemColor={color('Item color', colors.red)}
            cotnainerStyle={object('Icon style', styles.dropdown)}
        />
    ));

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ededed',
    },
    dropdown: {
        height: 30,
    },
});
