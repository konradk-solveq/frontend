import {storiesOf} from '@storybook/react-native';
import LayoutCenter from '@sb/utils/LayoutCenter';
import React from 'react';
import {number, boolean, color, object} from '@storybook/addon-knobs';
import {PaginationDot} from '@components/pagination';
import colors from '@theme/colors';

storiesOf('components/pagination/PaginationDot', module)
    .addDecorator(getStory => <LayoutCenter>{getStory()}</LayoutCenter>)
    .add('Default', () => <PaginationDot />)
    .add('Custom', () => (
        <PaginationDot
            size={number('Size', 8)}
            active={boolean('Active', false)}
            activeColor={color('Active color', colors.red)}
            inactiveColor={color('Inactive color', colors.greyish)}
            transitionDuration={number('Transition duration', 500)}
            style={object('Style', {})}
        />
    ));
