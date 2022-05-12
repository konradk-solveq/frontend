import React from 'react';
import {StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {text, object} from '@storybook/addon-knobs';
import {I18nextProvider} from 'react-i18next';

import LayoutCenter from '@sb/utils/LayoutCenter';
import {getFHorizontalPx} from '@theme/utils/appLayoutDimensions';

import i18next from '@translations/i18next';
import ThankYouPageContainer from '../ThankYouPageContainer';
import {action} from '@storybook/addon-actions';

const USER_NAME = 'Kross';
const ROUTE_DISTANCE = '10.98';
const ROUTE_TIME = 554433;
const ROUTE_PAUSE_TIME = 8796;
const SAVINGS_FUEL = '22';
const SAVINGS_RESOURCE = '22671';

storiesOf('containers/Recording/ThankYouPageContainer', module)
    .addDecorator(getStory => (
        <I18nextProvider i18n={i18next}>
            <LayoutCenter style={styles.container}>{getStory()}</LayoutCenter>
        </I18nextProvider>
    ))
    .add('Default', () => (
        <ThankYouPageContainer
            userName={text('User Name', USER_NAME)}
            routeParams={object('Route Params', {
                distance: ROUTE_DISTANCE,
                time: ROUTE_TIME,
                pause: ROUTE_PAUSE_TIME,
            })}
            savingsValues={object('Savings values', {
                fuel: SAVINGS_FUEL,
                resource: SAVINGS_RESOURCE,
            })}
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
