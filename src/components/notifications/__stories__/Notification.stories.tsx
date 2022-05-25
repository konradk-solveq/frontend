import {storiesOf} from '@storybook/react-native';
import LayoutCenter from '@sb/utils/LayoutCenter';
import React from 'react';
import Notification from '@components/notifications/Notification';
import {MykrossIconFont} from '@theme/enums/iconFonts';
import {StyleSheet} from 'react-native';
import colors from '@theme/colors';
import {text, select, object, number} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import {getFFontSize} from '@helpers/appLayoutDimensions';

storiesOf('components/notifications/Notification', module)
    .addDecorator(getStory => (
        <LayoutCenter style={styles.background}>{getStory()}</LayoutCenter>
    ))
    .add('Default', () => (
        <Notification
            title={'Example notification'}
            icon={MykrossIconFont.MYKROSS_ICON_OK}
        />
    ))
    .add('Customized', () => (
        <Notification
            title={text('Title', 'Example notification')}
            icon={select(
                'Icon',
                MykrossIconFont,
                MykrossIconFont.MYKROSS_ICON_OK,
            )}
            subtitle={text('Subtitle', '')}
            action={action('on-action-press')}
            actionText={text('ActionText', '')}
            containerStyle={object('Container style', {})}
            iconColor={text('Icon color', colors.red)}
            iconSize={number('Icon size', getFFontSize(24))}
            iconStyle={object('Icon style', {})}
            titleStyle={object('Title style', {})}
            subtitleStyle={object('Subtitle style', {})}
            actionStyle={object('Action style', {})}
        />
    ));

const styles = StyleSheet.create({
    background: {
        backgroundColor: colors.lightGrey,
    },
});
