import React from 'react';
import {StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {boolean, number, object, text} from '@storybook/addon-knobs';
import {I18nextProvider} from 'react-i18next';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {action} from '@storybook/addon-actions';

import LayoutCenter from '@sb/utils/LayoutCenter';
import i18next from '@translations/i18next';
import {CounterDataContext} from '@pages/main/recording/counter/context/counterContext';

import FullMetrics from '@containers/Recording/components/metrics/FullMetrics';
import PopUpHint from '../PopUpHint';

const trackerData = {
    distance: '3,41',
    speed: '10.0',
    averageSpeed: '6.0',
    odometer: 3406.699951171875,
    coords: {
        lat: 50.691728031513534,
        lon: 17.79613619421019,
    },
    timestamp: 1654582433,
};

storiesOf('containers/Recording/components/PopUpHint', module)
    .addDecorator(getStory => (
        <I18nextProvider i18n={i18next}>
            <LayoutCenter style={styles.container}>{getStory()}</LayoutCenter>
        </I18nextProvider>
    ))
    .add('Default', () => (
        <PopUpHint
            onPress={action('on-press-action')}
            show={boolean('Show hint', true)}
            cotainerStyle={object('Container style', styles.popUpHintContainer)}
            style={object('Hint style', {})}
        />
    ));

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 0,
    },
    popUpHintContainer: {
        height: '100%',
        top: 0,
        justifyContent: 'center',
    },
});
