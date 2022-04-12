import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {text, select} from '@storybook/addon-knobs';

import LayoutCenter from '@sb/utils/LayoutCenter';
import OnboardingTile from '@components/tiles/OnboardingTile';
import {ImageURISource} from 'react-native';
const imagesEnum = {
    bikes: require('@pages/onboarding/tutorial/images/bikes.png'),
    recordRoutes: require('@pages/onboarding/tutorial/images/recordRoutes.png'),
    publicRoutes: require('@pages/onboarding/tutorial/images/publicRoutes.png'),
    services: require('@pages/onboarding/tutorial/images/services.png'),
};
storiesOf('components/tiles/OnboardingTile', module)
    .addDecorator(getStory => <LayoutCenter>{getStory()}</LayoutCenter>)
    .add('Default', () => (
        <OnboardingTile
            title={'Record routes'}
            description={
                'Quickly and easily start recording your cycling routes'
            }
            imgSource={imagesEnum.recordRoutes}
        />
    ))
    .add('Customized', () => (
        <OnboardingTile
            title={text('Title', 'Record routes')}
            description={text(
                'Description',
                'Quickly and easily start recording your cycling routes',
            )}
            imgSource={select<ImageURISource>(
                'Image',
                imagesEnum,
                imagesEnum.recordRoutes,
            )}
        />
    ));
