import React from 'react';
import {StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {select, color, object, text} from '@storybook/addon-knobs';

import LayoutCenter from '@sb/utils/LayoutCenter';
import {MykrossIconFont} from '@theme/enums/iconFonts';
import colors from '@theme/colors';

import {RadioButton} from '@components/buttons';

storiesOf('components/buttons/RadioButton', module)
    .addDecorator(getStory => (
        <LayoutCenter style={styles.container}>{getStory()}</LayoutCenter>
    ))
    .add('Default', () => (
        <RadioButton
            onPress={action('radio-button-pressed')}
            icon={MykrossIconFont.MYKROSS_ICON_RADIAL_OFF}
            text="Radio button"
        />
    ))
    .add('Customized', () => (
        <RadioButton
            onPress={action('radio-button-pressed')}
            icon={select(
                'Icon symbol',
                MykrossIconFont,
                MykrossIconFont.MYKROSS_ICON_RADIAL_OFF,
            )}
            text={text('Radio button text', 'Radio button')}
            textColor={color('Icon color', colors.red)}
            style={object('Icon style', styles.button)}
        />
    ));

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ededed',
    },
    button: {
        backgroundColor: colors.greyish,
    },
});
