import React from 'react';

import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {I18nextProvider} from 'react-i18next';

import LayoutCenter from '@sb/utils/LayoutCenter';

import i18next from '@translations/i18next';
import {NoBikesContainer} from '@containers/Bike';

storiesOf('containers/Bike/NoBikesContainer', module)
    .addDecorator(getStory => (
        <I18nextProvider i18n={i18next}>
            <LayoutCenter>{getStory()}</LayoutCenter>
        </I18nextProvider>
    ))
    .add('Default', () => (
        <NoBikesContainer
            onPressPrimary={action('primary-button-pressed')}
            onPressSecondary={action('secondary-button-pressed')}
            onPressTile={action('tile-button-pressed')}
        />
    ));
