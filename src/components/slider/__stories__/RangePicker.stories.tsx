import {storiesOf} from '@storybook/react-native';
import LayoutCenter from '@sb/utils/LayoutCenter';
import React from 'react';
import {StyleSheet} from 'react-native';
import RangePicker from '@components/slider/RangePicker';
import {array} from '@storybook/addon-knobs';

storiesOf('components/slider/RangePicker', module)
    .addDecorator(getStory => <LayoutCenter>{getStory()}</LayoutCenter>)
    .add('Default', () => (
        <RangePicker
            options={[1, 2, 3, 4, 5]}
            onValueChange={() => {}}
            style={styles.picker}
        />
    ))
    .add('Customized', () => (
        <RangePicker
            options={array('Options', ['1', '2', '3', '4', '5'])}
            onValueChange={() => {}}
            style={styles.picker}
        />
    ));

const styles = StyleSheet.create({
    picker: {width: '100%'},
});
