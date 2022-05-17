import React from 'react';
import {StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {object} from '@storybook/addon-knobs';
import {I18nextProvider} from 'react-i18next';

import LayoutCenter from '@sb/utils/LayoutCenter';

import i18next from '@translations/i18next';

import {AddBikeFrameInfoContainer} from '@containers/AddBike';

storiesOf('containers/AddBike/AddBikeFrameInfo', module)
    .addDecorator(getStory => (
        <I18nextProvider i18n={i18next}>
            <LayoutCenter style={styles.container}>{getStory()}</LayoutCenter>
        </I18nextProvider>
    ))
    .add('Default', () => (
        <AddBikeFrameInfoContainer
            onPress={action('on-goback-action')}
            style={object('Container style', {})}
        />
    ));

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ededed',
    },
});
