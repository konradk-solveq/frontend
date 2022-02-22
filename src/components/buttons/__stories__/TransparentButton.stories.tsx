import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {select, text, boolean, object} from '@storybook/addon-knobs';

import LayoutCenter from '@sb/utils/LayoutCenter';
import {TransparentButton} from '@components/buttons';
import {MykrossIconFont} from '@theme/enums/iconFonts';
import colors from '@theme/colors';

storiesOf('components/buttons/TransparentButton', module)
    .addDecorator(getStory => <LayoutCenter>{getStory()}</LayoutCenter>)
    .add('Default', () => (
        <TransparentButton
            text={text('Button text', 'Button')}
            onPress={action('transparent-btn-pressed')}
        />
    ))
    .add('With Icon', () => (
        <TransparentButton
            text={text('Button text', 'Button')}
            onPress={action('transparent-btn-pressed')}
            icon={select(
                'Icon symbol',
                MykrossIconFont,
                MykrossIconFont.MYKROSS_ICON_USER,
            )}
        />
    ))
    .add('Customized', () => (
        <TransparentButton
            text={text('Button text', 'Button')}
            onPress={action('transparent-btn-pressed')}
            icon={select(
                'Icon symbol',
                MykrossIconFont,
                MykrossIconFont.MYKROSS_ICON_USER,
            )}
            disabled={boolean('Disable button', false)}
            withLoader={boolean('Display loader', false)}
            style={object('Icon style', {backgroundColor: colors.white})}
        />
    ));
