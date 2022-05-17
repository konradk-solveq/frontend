import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {number, object} from '@storybook/addon-knobs';

import LayoutCenter from '@sb/utils/LayoutCenter';
import Approved from '@components/icons/Approved';

storiesOf('components/icons/Approved', module)
    .addDecorator(getStory => <LayoutCenter>{getStory()}</LayoutCenter>)
    .add('Default', () => <Approved />)
    .add('Customized', () => (
        <Approved size={number('Size', 24)} style={object('Style', {})} />
    ));
