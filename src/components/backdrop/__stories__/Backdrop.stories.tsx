import React from 'react';
import {StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {boolean, object} from '@storybook/addon-knobs';

import LayoutCenter from '@sb/utils/LayoutCenter';
import colors from '@theme/colors';

import {Backdrop} from '@components/backdrop';

storiesOf('components/backdrop/Backdrop', module)
    .addDecorator(getStory => <LayoutCenter>{getStory()}</LayoutCenter>)
    .add('Default', () => (
        <Backdrop isVisible onPress={action('backdrop-pressed')} />
    ))
    .add('Customized', () => (
        <Backdrop
            isVisible={boolean('Show backdrop', true)}
            onPress={action('backdrop-pressed')}
            style={object('Style', styles.backdrop)}
        />
    ));

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: colors.red,
    },
});
