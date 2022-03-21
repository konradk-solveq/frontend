import React from 'react';
import {KeyboardTypeOptions, StyleSheet, View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {boolean, text, number, object} from '@storybook/addon-knobs';

import LayoutCenter from '@sb/utils/LayoutCenter';

import {TextInput} from '@components/inputs';
import {AutoCapitalizeT} from '@components/types/textInput';

storiesOf('components/input/TextInput', module)
    .addDecorator(getStory => (
        <LayoutCenter style={styles.container}>
            <View style={styles.inputContainer}>{getStory()}</View>
        </LayoutCenter>
    ))
    .add('Default', () => (
        <TextInput
            inputName="Name"
            value="Sample"
            hint="Enter characters"
            onChangeValue={action('on-change-value-action')}
            autoCapitalize="characters"
            isValid
            maxLength={100}
        />
    ))
    .add('Customized', () => (
        <TextInput
            multiline={boolean('Enable multiline', false)}
            numberOfLines={number('Number of lines', 1)}
            inputName={text('Input name', 'Name')}
            value={text('Input value', '')}
            placeholder={text('Input placeholder', 'Placeholder')}
            hint={text('Input hint', 'Enter characters')}
            onChangeValue={action('on-change-value-action')}
            autoCapitalize={object<AutoCapitalizeT>(
                'Auto capitalize',
                'characters',
            )}
            keyboardType={object<KeyboardTypeOptions>(
                'Keyboard type',
                'default',
            )}
            isValid={boolean('Is valid value', true)}
            maxLength={number('Max length', 100)}
        />
    ));

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ededed',
    },
    inputContainer: {
        width: '100%',
    },
});
