import React from 'react';

import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {I18nextProvider} from 'react-i18next';

import i18next from '@translations/i18next';
import BikeDetailsContainer from '@containers/Bike/BikeDetailsContainer';
import {bike} from '@containers/Bike/__mocks__/bikeDetailsContainerMocks';
import {object, boolean} from '@storybook/addon-knobs';

storiesOf('containers/Bike/BikeDetailsContainer', module)
    .addDecorator(getStory => (
        <I18nextProvider i18n={i18next}>{getStory()}</I18nextProvider>
    ))
    .add('Default', () => (
        <BikeDetailsContainer
            bike={bike}
            warrantyData={bike.warranty}
            showBikeChangeButton={false}
            onChangeBikeHandler={action('onChangeBikeHandler')}
            onAddKrossBike={action('onAddKrossBike')}
            handleParams={action('handleParams')}
            handleServicesMap={action('handleServicesMap')}
            onRemoveBikeHandler={action('onRemoveBikeHandler')}
            onReviewPress={action('onReviewPress')}
        />
    ))
    .add('Customized', () => (
        <BikeDetailsContainer
            bike={object('Bike', bike)}
            warrantyData={object('Warranty', bike.warranty)}
            showBikeChangeButton={boolean('Show change bike button', false)}
            onChangeBikeHandler={action('onChangeBikeHandler')}
            onAddKrossBike={action('onAddKrossBike')}
            handleParams={action('handleParams')}
            handleServicesMap={action('handleServicesMap')}
            onRemoveBikeHandler={action('onRemoveBikeHandler')}
            onReviewPress={action('onReviewPress')}
        />
    ));
