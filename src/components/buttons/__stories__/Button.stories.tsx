import React from 'react';
import {StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {
    select,
    color,
    number,
    text,
    boolean,
    object,
} from '@storybook/addon-knobs';

import LayoutCenter from '@sb/utils/LayoutCenter';
import {getFHorizontalPx} from '@theme/utils/appLayoutDimensions';
import {MykrossIconFont} from '@theme/enums/iconFonts';
import colors from '@theme/colors';

import {Button} from '@components/buttons';

storiesOf('components/buttons/Button', module)
    .addDecorator(getStory => <LayoutCenter>{getStory()}</LayoutCenter>)
    .add('Default', () => (
        <Button
            text={text('Button text', 'Button')}
            onPress={action('icon-btn-pressed')}
            style={styles.button}
        />
    ))
    .add('With Icon', () => (
        <Button
            text={text('Button text', 'Button')}
            onPress={action('icon-btn-pressed')}
            icon={select(
                'Icon symbol',
                MykrossIconFont,
                MykrossIconFont.MYKROSS_ICON_USER,
            )}
            style={styles.button}
        />
    ))
    .add('Customized', () => (
        <Button
            text={text('Button text', 'Button')}
            color={color('Button color', colors.red)}
            textColor={color('Text color', colors.white)}
            onPress={action('icon-btn-pressed')}
            icon={select(
                'Icon symbol',
                MykrossIconFont,
                MykrossIconFont.MYKROSS_ICON_USER,
            )}
            iconSize={number('Icon size', 24)}
            disabled={boolean('Disable button', false)}
            withLoader={boolean('Display loader', false)}
            withoutShadow={boolean('Disable shadow', false)}
            adjustsTextSizeToFit={boolean('Adjust text size to fit', false)}
            style={object('Icon style', styles.button)}
        />
    ));

const styles = StyleSheet.create({
    button: {
        width: getFHorizontalPx(294),
        height: getFHorizontalPx(48),
    },
});
