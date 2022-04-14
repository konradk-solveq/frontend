import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {I18nextProvider} from 'react-i18next';

import LayoutCenter from '@sb/utils/LayoutCenter';
import i18next from '@translations/i18next';
import EmptyStateContainer from '@containers/World/EmptyStateContainer';

import {FinishLine} from '@components/svg';
import {action} from '@storybook/addon-actions';
const EXAPMPLE_TITLE = "It's still empty here";
const EXAPMPLE_INFO = 'Get on your bike and hit the road';
const EXAPMPLE_BTN = 'Record your first tour';

storiesOf('containers/World/EmptyStateContainer', module)
    .addDecorator(getStory => (
        <I18nextProvider i18n={i18next}>
            <LayoutCenter>{getStory()}</LayoutCenter>
        </I18nextProvider>
    ))
    .add('Default', () => (
        <EmptyStateContainer
            image={<FinishLine />}
            title={EXAPMPLE_TITLE}
            description={EXAPMPLE_INFO}
            buttonText={EXAPMPLE_BTN}
            onPress={action('on-btn-press')}
        />
    ));
