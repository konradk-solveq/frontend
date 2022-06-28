import React from 'react';

import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {I18nextProvider} from 'react-i18next';

import LayoutCenter from '@sb/utils/LayoutCenter';

import i18next from '@translations/i18next';
import LocationUsageInfoContainer from '@containers/Onboarding/LocationUsageInfoContainer';
import {locationUsage} from '@containers/Onboarding/__mocks__/onboarding';
import {text, object} from '@storybook/addon-knobs';

storiesOf('containers/Onboarding/LocationUsage', module)
    .addDecorator(getStory => (
        <I18nextProvider i18n={i18next}>
            <LayoutCenter>{getStory()}</LayoutCenter>
        </I18nextProvider>
    ))
    .add('Default', () => (
        <LocationUsageInfoContainer
            onButtonPress={action('on-submit')}
            {...locationUsage}
        />
    ))
    .add('Default', () => (
        <LocationUsageInfoContainer
            onButtonPress={action('on-button-press')}
            header={text('Header', locationUsage.header)}
            info={text('Info', locationUsage.info)}
            buttonText={text('Button text', locationUsage.buttonText)}
            image={object('Image', locationUsage.image)}
        />
    ));
