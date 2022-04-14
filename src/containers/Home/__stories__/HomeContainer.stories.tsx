import {storiesOf} from '@storybook/react-native';
import {I18nextProvider} from 'react-i18next';
import i18next from '@translations/i18next';
import LayoutCenter from '@sb/utils/LayoutCenter';
import React from 'react';
import {HomeContainer} from '@containers/Home';
import {text} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';

storiesOf('containers/Home/HomeContainer', module)
    .addDecorator(getStory => (
        <I18nextProvider i18n={i18next}>
            <LayoutCenter>{getStory()}</LayoutCenter>
        </I18nextProvider>
    ))
    .add('Default', () => (
        <HomeContainer
            onAddBikePressPrimary={action('on-add-bike-primary')}
            onAddBikePressSecondary={action('on-add-bike-secondary')}
            onStoreTilePress={action('on-store-tile-press')}
        />
    ))
    .add('Custiomized', () => (
        <HomeContainer
            userName={text('User name', 'user')}
            onAddBikePressPrimary={action('on-add-bike-primary')}
            onAddBikePressSecondary={action('on-add-bike-secondary')}
            onStoreTilePress={action('on-store-tile-press')}
        />
    ));
