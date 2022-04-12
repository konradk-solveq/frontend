import React from 'react';
import {storiesOf} from '@storybook/react-native';

import LayoutCenter from '@sb/utils/LayoutCenter';
import CollapsibleStickyHeader from '@components/headers/CollapsibleStickyHeader';
import {number, boolean, object} from '@storybook/addon-knobs';
import {getFVerticalPx} from '@helpers/appLayoutDimensions';
import colors from '@theme/colors';
import {Header1} from '@components/texts/texts';

storiesOf('components/headers/CollapsibleStickyHeader', module)
    .addDecorator(getStory => <LayoutCenter>{getStory()}</LayoutCenter>)
    .add('Default', () => (
        <CollapsibleStickyHeader height={getFVerticalPx(48)} shouldHide={false}>
            <Header1>TEST</Header1>
        </CollapsibleStickyHeader>
    ))
    .add('Customizable', () => (
        <CollapsibleStickyHeader
            height={number('Height', getFVerticalPx(48))}
            shouldHide={boolean('Should hide', false)}
            style={object('Style', {
                backgroundColor: colors.whiteGrey,
                justifyContent: 'center',
                alignItems: 'center',
            })}>
            <Header1>TEST</Header1>
        </CollapsibleStickyHeader>
    ));
