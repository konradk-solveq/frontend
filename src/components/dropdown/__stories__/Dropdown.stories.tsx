import React from 'react';
import {StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {select, object, text, boolean} from '@storybook/addon-knobs';

import LayoutCenter from '@sb/utils/LayoutCenter';
import {MykrossIconFont} from '@theme/enums/iconFonts';

import {DropdownItemT} from '@components/types/dropdown';
import {Dropdown} from '@components/dropdown';

const list: DropdownItemT[] = [
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

storiesOf('components/dropdown/Dropdown', module)
    .addDecorator(getStory => (
        <LayoutCenter style={styles.container}>{getStory()}</LayoutCenter>
    ))
    .add('Default', () => (
        <Dropdown
            list={object('Dropdown items list', list)}
            buttonText={text('Button text', 'Sort by')}
            buttonStyle={styles.button}
            buttonContainerStyle={styles.buttonContainer}
        />
    ))
    .add('Customized', () => (
        <Dropdown
            list={object('Dropdown items list', list)}
            buttonText={text('Button text', 'Sort by')}
            buttonIcon={select(
                'Button icon',
                MykrossIconFont,
                MykrossIconFont.MYKROSS_ICON_CHEVRON_DOWN,
            )}
            onPressItem={action('dropdown-item-pressed')}
            buttonStyle={object('Button style', styles.button)}
            buttonContainerStyle={object(
                'Button container style',
                styles.buttonContainer,
            )}
            boxStyle={object('Dropdown items box style', {})}
            withResetButton={boolean('Render reset button', true)}
            resetButtonText={text('Reset button text', 'Reset')}
            style={object('Dropdown style', {})}
        />
    ));

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ededed',
    },
    button: {
        backgroundColor: '#ededed',
    },
    buttonContainer: {
        justifyContent: 'flex-start',
    },
});
