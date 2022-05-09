import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {number, object} from '@storybook/addon-knobs';

import LayoutCenter from '@sb/utils/LayoutCenter';
import Warning from '@components/icons/Warning';

storiesOf('components/icons/Warning', module)
    .addDecorator(getStory => <LayoutCenter>{getStory()}</LayoutCenter>)
    .add('Default', () => <Warning />)
    .add('Customized', () => (
        <Warning size={number('Size', 24)} style={object('Style', {})} />
    ));
