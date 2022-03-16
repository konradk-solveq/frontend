import React from 'react';
import {StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {boolean, object} from '@storybook/addon-knobs';
import {I18nextProvider} from 'react-i18next';

import LayoutCenter from '@sb/utils/LayoutCenter';

import i18next from '@translations/i18next';
import colors from '@theme/colors';

import {AddBikeContainer} from '@containers/AddBike';

storiesOf('containers/AddBike/AddBike', module)
    .addDecorator(getStory => (
        <I18nextProvider i18n={i18next}>
            <LayoutCenter style={styles.container}>{getStory()}</LayoutCenter>
        </I18nextProvider>
    ))
    .add('Default', () => (
        <AddBikeContainer
            onPressLink={action('press-link-pressed')}
            onPressScanNfc={action('add-bike-by-nfc-pressed')}
            onPressFindByNumber={action('add-bike-by-frame-nr-pressed')}
            scanButtonIsDisabled={false}
        />
    ))
    .add('Customized', () => (
        <AddBikeContainer
            onPressLink={action('press-link-pressed')}
            onPressScanNfc={action('add-bike-by-nfc-pressed')}
            onPressFindByNumber={action('add-bike-by-frame-nr-pressed')}
            scanButtonIsDisabled={boolean('Disable scan NFC button', false)}
            style={object('Container style', {})}
        />
    ));

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ededed',
    },
    detailsContainer: {
        borderColor: colors.red,
        borderWidth: 1,
    },
});
