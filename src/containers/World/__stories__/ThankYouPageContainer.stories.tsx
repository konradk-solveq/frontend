import React from 'react';
import {StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {I18nextProvider} from 'react-i18next';

import LayoutCenter from '@sb/utils/LayoutCenter';
import {getFHorizontalPx} from '@theme/utils/appLayoutDimensions';

import i18next from '@translations/i18next';
import ThankYouPageContainer from '../ThankYouPageContainer';
import {action} from '@storybook/addon-actions';

storiesOf('containers/World/ThankYouPageContainer', module)
    .addDecorator(getStory => (
        <I18nextProvider i18n={i18next}>
            <LayoutCenter style={styles.container}>{getStory()}</LayoutCenter>
        </I18nextProvider>
    ))
    .add('Default', () => (
        <ThankYouPageContainer
            userName={'Andrew'}
            routeParams={{distance: '24.45', time: 872651, pause: 445566}}
            savingsValues={{fuel: '10', resource: '99'}}
            onPublishAction={action('onPublishAction')}
            onSaveAction={action('onSaveAction')}
        />
    ))
    .add('Customized', () => (
        <ThankYouPageContainer
            userName={''}
            routeParams={{ distance: '11.22', time: 32123176, pause: 892761 }}
            savingsValues={{fuel: '10', resource: '99'}}
            onPublishAction={action('onPublishAction')}
            onSaveAction={action('onSaveAction')}
        />
    ));

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 0,
    },
    button: {
        width: getFHorizontalPx(294),
        height: getFHorizontalPx(48),
    },
});
