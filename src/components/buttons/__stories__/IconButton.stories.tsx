import React from 'react';
import {StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {select, color, number, object} from '@storybook/addon-knobs';

import LayoutCenter from '@sb/utils/LayoutCenter';
import {MykrossIconFont} from '@theme/enums/iconFonts';
import colors from '@theme/colors';

import {IconButton} from '@components/buttons';

storiesOf('components/buttons/IconButton', module)
    .addDecorator(getStory => (
        <LayoutCenter style={styles.container}>{getStory()}</LayoutCenter>
    ))
    .add('Default', () => (
        <IconButton
            onPress={action('icon-btn-pressed')}
            icon={select(
                'Icon symbol',
                MykrossIconFont,
                MykrossIconFont.MYKROSS_ICON_USER,
            )}
        />
    ))
    .add('Customized', () => (
        <IconButton
            onPress={action('icon-btn-pressed')}
            icon={select(
                'Icon symbol',
                MykrossIconFont,
                MykrossIconFont.MYKROSS_ICON_USER,
            )}
            iconColor={color('Icon color', colors.red)}
            iconSize={number('Icon size', 24)}
            style={object('Icon style', styles.button)}
        />
    ));

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ededed',
    },
    button: {
        backgroundColor: colors.white,
    },
});
