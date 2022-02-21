import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {color, number, text, object} from '@storybook/addon-knobs';

import LayoutCenter from '@sb/utils/LayoutCenter';
import {MykrossIconFont} from '@theme/enums/iconFonts';
import colors from '@theme/colors';

import {TextIcon} from '@components/icons';

storiesOf('components/icons/TextIcon', module)
    .addDecorator(getStory => <LayoutCenter>{getStory()}</LayoutCenter>)
    .add('Default', () => (
        <TextIcon
            icon={text(
                'Icon symbol [mykross font]',
                MykrossIconFont.MYKROSS_ICON_USER,
            )}
        />
    ))
    .add('Customized', () => (
        <TextIcon
            icon={text(
                'Icon symbol [mykross font]',
                MykrossIconFont.MYKROSS_ICON_USER,
            )}
            iconColor={color('Icon color', colors.red)}
            iconSize={number('Icon size', 24)}
            style={object('Icon style', {backgroundColor: colors.white})}
        />
    ));
