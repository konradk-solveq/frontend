import {storiesOf} from '@storybook/react-native';
import LayoutCenter from '@sb/utils/LayoutCenter';
import React from 'react';
import {StyleSheet} from 'react-native';
import {MultiSelect} from '@components/inputs';
import {SelectOptionType} from '@interfaces/form';
import {action} from '@storybook/addon-actions';
import {boolean, object, text} from '@storybook/addon-knobs';

const options: SelectOptionType[] = [
    {enumValue: '1', i18nValue: 'Option 1'},
    {enumValue: '2', i18nValue: 'Option 2'},
    {enumValue: '3', i18nValue: 'Option 3'},
    {enumValue: '4', i18nValue: 'Option 4'},
    {enumValue: '5', i18nValue: 'Opt. 5'},
    {enumValue: '6', i18nValue: 'Opt. 6'},
    {enumValue: '7', i18nValue: 'Opt. 7'},
    {enumValue: '8', i18nValue: '8'},
];
storiesOf('components/input/MultiSelect', module)
    .addDecorator(getStory => (
        <LayoutCenter style={styles.container}>{getStory()}</LayoutCenter>
    ))
    .add('Default', () => (
        <MultiSelect
            predefined={[options[4].enumValue]}
            options={options}
            optionsTransName={''}
            onSave={action('multiselect-save')}
        />
    ))
    .add('Custom', () => (
        <MultiSelect
            options={object('Options', options)}
            predefined={object('Predefined values', [options[4].enumValue])}
            onSave={action('multiselect-save')}
            isRadioType={boolean('Radio', false)}
            withEmptyRadio={boolean('Empty radio', false)}
            titleStyle={object('Title style', {})}
            buttonStyle={object('Button style', {})}
            optionsTransName={text('I18n translations name', '')}
        />
    ));

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ededed',
    },
});
