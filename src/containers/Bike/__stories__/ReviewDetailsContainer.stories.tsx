import React from 'react';

import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {I18nextProvider} from 'react-i18next';

import LayoutCenter from '@sb/utils/LayoutCenter';

import i18next from '@translations/i18next';
import ReviewDetailsContainer from '@containers/Bike/ReviewDetailsContainer';
import {
    date,
    type,
    operations,
    info,
    warning,
} from '@containers/Bike/__mocks__/bikeWarrantyDetails';
import {text, boolean, array} from '@storybook/addon-knobs';

storiesOf('containers/Bike/ReviewDetailsContainer', module)
    .addDecorator(getStory => (
        <I18nextProvider i18n={i18next}>
            <LayoutCenter>{getStory()}</LayoutCenter>
        </I18nextProvider>
    ))
    .add('Default', () => (
        <ReviewDetailsContainer
            onServicesTilePress={action('on-services-tile-pressed')}
            date={date}
            type={type}
            checkmark={true}
            operations={operations}
            info={info}
            warning={warning}
        />
    ))
    .add('Customized', () => (
        <ReviewDetailsContainer
            onServicesTilePress={action('on-services-tile-pressed')}
            date={text('Date', date)}
            type={text('Type', type)}
            checkmark={boolean('Checkmark', true)}
            operations={array('Operations', operations)}
            info={text('Info', info)}
            warning={text('Warning', warning)}
            overviewsTitle={text('Overviews title', '')}
        />
    ));
