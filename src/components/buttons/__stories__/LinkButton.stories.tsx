import React from 'react';
import {StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {color, boolean} from '@storybook/addon-knobs';

import LayoutCenter from '@sb/utils/LayoutCenter';
import colors from '@theme/colors';

import {LinkButton} from '@components/buttons';

storiesOf('components/buttons/LinkBUtton', module)
    .addDecorator(getStory => (
        <LayoutCenter style={styles.container}>{getStory()}</LayoutCenter>
    ))
    .add('Default', () => (
        <LinkButton text="Link button" onPress={action('link-btn-pressed')} />
    ))
    .add('Customized', () => (
        <LinkButton
            text="Link button"
            onPress={action('link-btn-pressed')}
            textColor={color('Text color', colors.red)}
            disabledColor={color('Color of disabled button', colors.red)}
            disabled={boolean('Disable button', false)}
        />
    ));

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ededed',
    },
});
