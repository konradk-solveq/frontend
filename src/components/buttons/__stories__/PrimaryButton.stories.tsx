import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {select, text, boolean, object} from '@storybook/addon-knobs';

import LayoutCenter from '@sb/utils/LayoutCenter';
import {PrimaryButton} from '@components/buttons';
import {MykrossIconFont} from '@theme/enums/iconFonts';
import colors from '@theme/colors';

storiesOf('components/buttons/PrimaryButton', module)
    .addDecorator(getStory => <LayoutCenter>{getStory()}</LayoutCenter>)
    .add('Default', () => (
        <PrimaryButton
            text={text('Button text', 'Button')}
            onPress={action('icon-btn-pressed')}
        />
    ))
    .add('With Icon', () => (
        <PrimaryButton
            text={text('Button text', 'Button')}
            onPress={action('icon-btn-pressed')}
            icon={select(
                'Icon symbol',
                MykrossIconFont,
                MykrossIconFont.MYKROSS_ICON_USER,
            )}
        />
    ))
    .add('Customized', () => (
        <PrimaryButton
            text={text('Button text', 'Button')}
            onPress={action('icon-btn-pressed')}
            icon={select(
                'Icon symbol',
                MykrossIconFont,
                MykrossIconFont.MYKROSS_ICON_USER,
            )}
            disabled={boolean('Disable button', false)}
            withLoader={boolean('Display loader', false)}
            style={object('Icon style', {backgroundColor: colors.red})}
        />
    ));
