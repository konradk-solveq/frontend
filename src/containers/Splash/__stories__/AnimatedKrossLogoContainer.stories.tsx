import {storiesOf} from '@storybook/react-native';
import LayoutCenter from '@sb/utils/LayoutCenter';
import React from 'react';
import {AnimatedKrossLogoContainer} from '@containers/Splash';

storiesOf('containers/Splash/AnimatedKrossLogoContainer', module)
    .addDecorator(getStory => <LayoutCenter>{getStory()}</LayoutCenter>)
    .add('Default', () => <AnimatedKrossLogoContainer />);
