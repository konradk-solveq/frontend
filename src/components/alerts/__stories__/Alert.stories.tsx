import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {text, boolean} from '@storybook/addon-knobs';

import LayoutCenter from '@sb/utils/LayoutCenter';

import {Alert} from '@components/alerts';

const CONTENT_TEXT = 'Do you want to execute this action?';
const POSITIVE_TEXT = 'Ok';
const NEGATIVE_TEXT = 'Cancel';

storiesOf('components/alerts/alert', module)
    .addDecorator(getStory => <LayoutCenter>{getStory()}</LayoutCenter>)
    .add('Default', () => (
        <Alert
            show
            onPress={action('on-press-action')}
            onCancel={action('on-cancel-action')}
        />
    ))
    .add('With content', () => (
        <Alert
            show
            text={CONTENT_TEXT}
            onPress={action('on-press-action')}
            onCancel={action('on-cancel-action')}
        />
    ))
    .add('Customized', () => (
        <Alert
            show={boolean('Show alert', true)}
            text={text('Content', CONTENT_TEXT)}
            pressText={text('Positive action text', POSITIVE_TEXT)}
            cancelText={text('Negative action text', NEGATIVE_TEXT)}
            onPress={action('on-press-action')}
            onCancel={action('on-cancel-action')}
        />
    ));
