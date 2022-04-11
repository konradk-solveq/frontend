import React from 'react';
import {StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {text, object} from '@storybook/addon-knobs';

import LayoutCenter from '@sb/utils/LayoutCenter';

import {ModalHeader} from '@components/modals';

storiesOf('components/modals/ModalHeader', module)
    .addDecorator(getStory => (
        <LayoutCenter style={styles.container}>{getStory()}</LayoutCenter>
    ))
    .add('Default', () => (
        <ModalHeader
            header="Modal Header"
            onPress={action('on-press-action')}
        />
    ))
    .add('Customized', () => (
        <ModalHeader
            header={text('Modal header', '')}
            onPress={action('on-press-action')}
            style={object('Header style', {})}
        />
    ));

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ededed',
    },
});
