import React from 'react';
import {storiesOf} from '@storybook/react-native';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import ErrorModal from '../ErrorModal';
import {action} from '@storybook/addon-actions';
import {text, boolean} from '@storybook/addon-knobs';

storiesOf('components/modals/ErrorModal', module)
    .addDecorator(getStory => <SafeAreaProvider>{getStory()}</SafeAreaProvider>)
    .add('Default', () => (
        <ErrorModal
            showModal={boolean('Show modal', true)}
            handleClose={action('error-modal-close')}
            errorTitle={text('Error title', 'This is error title')}
            errorMessage={text('Error message', 'This is error message')}
        />
    ))
    .add('Full Screen', () => (
        <ErrorModal
            showModal={boolean('Show modal', true)}
            isFullScreen
            handleClose={action('error-modal-close')}
            handleRetryAction={action('error-modal-retry')}
            errorTitle={text('Error title', 'This is full screen error title')}
            errorMessage={text(
                'Error message',
                'This is full screen error message',
            )}
            primaryActionButtonText={text(
                'Primary button text',
                'Custom Primary Button Text',
            )}
        />
    ));
