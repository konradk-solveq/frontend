import React from 'react';
import {StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {boolean, object} from '@storybook/addon-knobs';

import LayoutCenter from '@sb/utils/LayoutCenter';

import {BackdropModal} from '@components/modals';
import {SafeAreaProvider} from 'react-native-safe-area-context';

storiesOf('components/modals/BackdropModal', module)
    .addDecorator(getStory => (
        <LayoutCenter style={styles.container}>
            <SafeAreaProvider>{getStory()}</SafeAreaProvider>
        </LayoutCenter>
    ))
    .add('Default', () => <BackdropModal visible={true} />)
    .add('Customized', () => (
        <BackdropModal
            visible={boolean('Show modal', true)}
            containerStyle={object('Container style', {})}
        />
    ));

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ededed',
    },
});
