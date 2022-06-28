import {storiesOf} from '@storybook/react-native';
import LayoutCenter from '@sb/utils/LayoutCenter';
import React from 'react';
import Toast from '@components/notifications/Toast';
import {MykrossIconFont} from '@theme/enums/iconFonts';
import {StyleSheet} from 'react-native';
import colors from '@theme/colors';
import {text} from '@storybook/addon-knobs';
import Approved from '@src/components/icons/Approved';

storiesOf('components/notifications/Toast', module)
    .addDecorator(getStory => (
        <LayoutCenter style={styles.background}>{getStory()}</LayoutCenter>
    ))
    .add('Default', () => (
        <Toast
            toast={{
                key: 'toast-default',
                title: text('Title', 'Toast title'),
                icon: <Approved />,
            }}
            key={'story-toast-key'}
        />
    ))
    .add('Customized', () => (
        <Toast
            toast={{
                key: 'toast-customized',
                title: text('Title', 'Customized title'),
                subtitle: text('Subtitle', 'Customized subtitle'),
                subtitleStyle: {color: colors.deepBlack},
                titleStyle: {color: colors.red},
                icon: MykrossIconFont.MYKROSS_ICON_EXPLOR,
            }}
            key={'story-toast-key'}
        />
    ));
const styles = StyleSheet.create({
    background: {
        backgroundColor: colors.lightGrey,
    },
});
