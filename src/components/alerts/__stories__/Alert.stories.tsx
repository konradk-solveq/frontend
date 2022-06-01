/**
 * There is an issue on IOS (this is RN issue). We cannot show
 * multiple modals at the same time.
 *
 * Workaround is nesting them or wait until first
 * has been dismissed.
 * So for now it could lead to an issue on IOS devices,
 * that it is not possible to check the alerts one by one.
 *
 * Future possible [solution](https://github.com/software-mansion/react-native-screens/pull/1096)
 * which doesn't work right now.
 */

import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {text, boolean, object} from '@storybook/addon-knobs';

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
    .add('Without cancel button', () => (
        <Alert
            show
            text={CONTENT_TEXT}
            onPress={action('on-press-action')}
            noCancel
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
            noCancel={boolean('No cancel button', false)}
            contentStyle={object('Content style', {})}
        />
    ));
