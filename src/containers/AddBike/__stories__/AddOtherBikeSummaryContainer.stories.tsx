import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {text} from '@storybook/addon-knobs';
import {I18nextProvider} from 'react-i18next';

import LayoutCenter from '@sb/utils/LayoutCenter';

import i18next from '@translations/i18next';

import {AddOtherBikeSummaryContainer} from '@containers/AddBike';

const BIKE_NAME = 'Hexagon 7.0';
const MANUFACTURER = 'Neverland';

storiesOf('containers/AddBike/AddOtherBikeSummaryContainer', module)
    .addDecorator(getStory => (
        <I18nextProvider i18n={i18next}>
            <LayoutCenter>{getStory()}</LayoutCenter>
        </I18nextProvider>
    ))
    .add('Default', () => (
        <AddOtherBikeSummaryContainer
            bikeName={BIKE_NAME}
            producer={MANUFACTURER}
            onAddBike={action('on-add-bike-action')}
        />
    ))
    .add('Customized', () => (
        <AddOtherBikeSummaryContainer
            bikeName={BIKE_NAME}
            producer={text('Bike producer', MANUFACTURER)}
            onAddBike={action('on-add-bike-action')}
        />
    ));
