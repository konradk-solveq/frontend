import React from 'react';
import {StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {object, text, select} from '@storybook/addon-knobs';

import LayoutCenter from '@sb/utils/LayoutCenter';
import {MykrossIconFont} from '@theme/enums/iconFonts';

import {PrimaryButton, SecondaryButton} from '@components/buttons';
import {ButtonsGroup} from '..';

storiesOf('containers/World/components/ButtonsGroup', module)
    .addDecorator(getStory => (
        <LayoutCenter style={styles.container}>{getStory()}</LayoutCenter>
    ))
    .add('Default', () => (
        <ButtonsGroup>
            <PrimaryButton
                text={text('Button text', 'Button')}
                onPress={action('icon-btn-pressed')}
                icon={select(
                    'Icon symbol',
                    MykrossIconFont,
                    MykrossIconFont.MYKROSS_ICON_USER,
                )}
                style={object('Button style', styles.button)}
            />
            <SecondaryButton
                text={text('Button text', 'Button')}
                onPress={action('icon-btn-pressed')}
                icon={select(
                    'Icon symbol',
                    MykrossIconFont,
                    MykrossIconFont.MYKROSS_ICON_USER,
                )}
                style={object('Button style', styles.button)}
            />
        </ButtonsGroup>
    ));

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ededed',
    },
    button: {
        width: '45%',
    },
});
