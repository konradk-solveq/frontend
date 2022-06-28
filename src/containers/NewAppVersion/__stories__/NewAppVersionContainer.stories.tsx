import React from 'react';

import {storiesOf} from '@storybook/react-native';
import {I18nextProvider} from 'react-i18next';

import LayoutCenter from '@sb/utils/LayoutCenter';

import i18next from '@translations/i18next';
import NewAppVersionContainer from '@containers/NewAppVersion/NewAppVersionContainer';
import {action} from '@storybook/addon-actions';

storiesOf('containers/NewAppVersion/NewAppVersionContainer', module)
    .addDecorator(getStory => (
        <I18nextProvider i18n={i18next}>
            <LayoutCenter>{getStory()}</LayoutCenter>
        </I18nextProvider>
    ))
    .add('Default', () => (
        <NewAppVersionContainer
            handlePress={action('handle-link-to-shop-action')}
        />
    ));
