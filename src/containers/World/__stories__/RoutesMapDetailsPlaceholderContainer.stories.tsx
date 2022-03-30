import React from 'react';
import {StyleSheet, View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {I18nextProvider} from 'react-i18next';

import LayoutCenter from '@sb/utils/LayoutCenter';

import i18next from '@translations/i18next';

import {RoutesMapDetailsPlaceholderContainer} from '@containers/World';

storiesOf('containers/World/RoutesMapDetailsPlaceholderContainer', module)
    .addDecorator(getStory => (
        <I18nextProvider i18n={i18next}>
            <LayoutCenter style={styles.container}>{getStory()}</LayoutCenter>
        </I18nextProvider>
    ))
    .add('Default', () => (
        <View>
            <RoutesMapDetailsPlaceholderContainer />
        </View>
    ));

const styles = StyleSheet.create({
    container: {
        paddingTop: '60%',
    },
});
