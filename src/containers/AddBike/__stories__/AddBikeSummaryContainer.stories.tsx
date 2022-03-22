import React from 'react';
import {Image} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {text} from '@storybook/addon-knobs';
import {I18nextProvider} from 'react-i18next';

import LayoutCenter from '@sb/utils/LayoutCenter';

import i18next from '@translations/i18next';

import DefaultImage from '@assets/images/bike_placeholder.png';
import {AddBikeSummaryContainer} from '@containers/AddBike';

const BIKE_NAME = 'Hexagon 7.0';
const FRAME_NUMBER = '1234567890';
const IMAGE_URL = Image.resolveAssetSource(DefaultImage).uri;

storiesOf('containers/AddBike/AddBikeSummaryContainer', module)
    .addDecorator(getStory => (
        <I18nextProvider i18n={i18next}>
            <LayoutCenter>{getStory()}</LayoutCenter>
        </I18nextProvider>
    ))
    .add('Default', () => (
        <AddBikeSummaryContainer
            bikeName={BIKE_NAME}
            frameNumber={FRAME_NUMBER}
            imageUrl={IMAGE_URL}
            onAddBike={action('on-add-bike-action')}
        />
    ))
    .add('Customized', () => (
        <AddBikeSummaryContainer
            bikeName={text('Bike name', BIKE_NAME)}
            frameNumber={text('Bike frame number', FRAME_NUMBER)}
            imageUrl={text('Bike image url', IMAGE_URL)}
            onAddBike={action('on-add-bike-action')}
        />
    ));
