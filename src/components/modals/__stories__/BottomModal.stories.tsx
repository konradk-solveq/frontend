import React from 'react';
import {StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {number, boolean} from '@storybook/addon-knobs';

import LayoutCenter from '@sb/utils/LayoutCenter';

import {BottomModal} from '@components/modals';

storiesOf('components/modals/BottomModal', module)
    .addDecorator(getStory => (
        <LayoutCenter style={styles.container}>{getStory()}</LayoutCenter>
    ))
    .add('Default', () => <BottomModal show />)
    .add('Customized', () => (
        <BottomModal
            show={boolean('Show modal', true)}
            openModalHeight={number('Modal height after show', 278)}
        />
    ));

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ededed',
    },
});
