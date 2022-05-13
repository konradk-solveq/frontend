import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {object, text} from '@storybook/addon-knobs';

import LayoutCenter from '@sb/utils/LayoutCenter';
import i18next from '@translations/i18next';
import {I18nextProvider} from 'react-i18next';
import InfiniteScrollError from '@components/error/InfiniteScrollError';
import colors from '@theme/colors';

storiesOf('components/error/InfiniteScrollError', module)
    .addDecorator(getStory => (
        <I18nextProvider i18n={i18next}>
            <LayoutCenter>{getStory()}</LayoutCenter>
        </I18nextProvider>
    ))
    .add('Default', () => <InfiniteScrollError />)
    .add('Customized', () => (
        <InfiniteScrollError
            style={object('Style', {})}
            color={text('Color', colors.red)}
        />
    ));
