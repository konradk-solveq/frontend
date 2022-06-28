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

storiesOf('containers/Recording/components/metrics/FullMetrics', module)
    .addDecorator(getStory => (
        <SafeAreaProvider>
            <I18nextProvider i18n={i18next}>
                <LayoutCenter style={styles.container}>
                    {getStory()}
                </LayoutCenter>
            </I18nextProvider>
        </SafeAreaProvider>
    ))
    .add('Default', () => (
        <FullMetrics
            onOpenPress={action('on-press-action')}
            started={boolean('Set as started', true)}
            //@ts-ignore
            startTime={text(
                'Start dateTime',
                //@ts-ignore
                new Date('2022-06-07T09:00:00.000Z'),
            )}
            topSpace={number('Top space', 0)}
        />
    ))
    .add('With tracker data', () => {
        return (
            <CounterDataContext.Provider
                value={{
                    trackerData: object('Tracker data', trackerData),
                    pauseTime: number('Pause time', 0),
                }}>
                <FullMetrics
                    onOpenPress={action('on-press-action')}
                    started={boolean('Set as started', true)}
                    //@ts-ignore
                    startTime={text(
                        'Start dateTime',
                        //@ts-ignore
                        new Date('2022-06-07T09:00:00.000Z'),
                    )}
                    topSpace={number('Top space', 0)}
                />
            </CounterDataContext.Provider>
        );
    });

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 0,
    },
});
