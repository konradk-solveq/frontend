import React from 'react';

import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {I18nextProvider} from 'react-i18next';

import LayoutCenter from '@sb/utils/LayoutCenter';

import i18next from '@translations/i18next';
import OnboardingContainer from '@containers/Onboarding/OnboardingContainer';
import {
    tiles,
    language,
    icon,
} from '@containers/Onboarding/__mocks__/onboarding';
import {object, text, boolean} from '@storybook/addon-knobs';
import {decodeSvg} from '@sb/utils/decodeSvg';

storiesOf('containers/Onboarding/OnboardingContainer', module)
    .addDecorator(getStory => (
        <I18nextProvider i18n={i18next}>
            <LayoutCenter>{getStory()}</LayoutCenter>
        </I18nextProvider>
    ))
    .add('Default', () => (
        <OnboardingContainer
            onBeginPress={action('on-begin-click')}
            tiles={tiles}
            onLanguageChange={action('on-language-change')}
            language={{...language, icon: decodeSvg(icon)}}
            showLanguageButton={true}
        />
    ))
    .add('Customized', () => (
        <OnboardingContainer
            onBeginPress={action('on-begin-click')}
            tiles={object('Tiles', tiles)}
            onLanguageChange={action('on-language-change')}
            language={{
                ...object('Language', language),
                icon: decodeSvg(text('Icon', icon)),
            }}
            showLanguageButton={boolean('Language button', true)}
        />
    ));
