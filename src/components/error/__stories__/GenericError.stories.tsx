import React from 'react';
import {storiesOf} from '@storybook/react-native';
import LayoutCenter from '@sb/utils/LayoutCenter';
import i18next from '@translations/i18next';
import {I18nextProvider} from 'react-i18next';
import GenericError from '@components/error/GenericError';
import {action} from '@storybook/addon-actions';
import {
    errorMessage,
    errorTitle,
    buttonText,
} from '@components/error/__mocks__/genericErrorData';
import {text} from '@storybook/addon-knobs';

storiesOf('components/error/GenericError', module)
    .addDecorator(getStory => (
        <I18nextProvider i18n={i18next}>
            <LayoutCenter>{getStory()}</LayoutCenter>
        </I18nextProvider>
    ))
    .add('Default', () => (
        <GenericError
            onButtonPress={action('on-button-press')}
            errorMessage={errorMessage}
            errorTitle={errorTitle}
            buttonText={buttonText}
        />
    ))
    .add('Customized', () => (
        <GenericError
            onButtonPress={action('on-button-press')}
            errorMessage={text('Error message', errorMessage)}
            errorTitle={text('Error title', errorTitle)}
            buttonText={text('Button text', buttonText)}
        />
    ));
