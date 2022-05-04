import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {text} from '@storybook/addon-knobs';
import {I18nextProvider} from 'react-i18next';

import LayoutCenter from '@sb/utils/LayoutCenter';
import i18next from '@translations/i18next';

import {FrameSticker} from '@containers/AddBike/components';

const TITLE = 'Bike nr';
const FRAME_NUMBER = '123456789';
const FRAME_DESCRIPTION = 'Frame: 123456789';
const ADDITIONAL_INFO = 'Size L';

const {width} = Dimensions.get('screen');

storiesOf('containers/AddBike/components/FrameSticker', module)
    .addDecorator(getStory => (
        <I18nextProvider i18n={i18next}>
            <LayoutCenter>
                <View style={styles.container}>{getStory()}</View>
            </LayoutCenter>
        </I18nextProvider>
    ))
    .add('Default', () => (
        <FrameSticker
            title={TITLE}
            frameNumber={FRAME_NUMBER}
            frameDescription={FRAME_DESCRIPTION}
            additionalInfo={ADDITIONAL_INFO}
        />
    ))
    .add('Customized', () => (
        <FrameSticker
            title={text('Title', TITLE)}
            frameNumber={text('Frame number', FRAME_NUMBER)}
            frameDescription={text('Frame desctiption', FRAME_DESCRIPTION)}
            additionalInfo={text('Additional info', ADDITIONAL_INFO)}
        />
    ));

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        width: width,
        paddingHorizontal: 16,
    },
});
