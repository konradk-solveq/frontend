import {storiesOf} from '@storybook/react-native';
import LayoutCenter from '@sb/utils/LayoutCenter';
import React from 'react';
import {number, color, object} from '@storybook/addon-knobs';
import {Pagination} from '@components/pagination';
import colors from '@theme/colors';

storiesOf('components/pagination/Pagination', module)
    .addDecorator(getStory => <LayoutCenter>{getStory()}</LayoutCenter>)
    .add('Default', () => <Pagination maxIndex={5} activeIndex={2} />)
    .add('Custom', () => (
        <Pagination
            dotSize={number('Dot size', 8)}
            spacing={number('Spacing', 8)}
            maxIndex={number('Max index', 5)}
            activeIndex={number('Active index', 2)}
            activeColor={color('Active color', colors.red)}
            inactiveColor={color('Inactive color', colors.greyish)}
            transitionDuration={number('Transition duration', 500)}
            style={object('Style', {})}
        />
    ));
