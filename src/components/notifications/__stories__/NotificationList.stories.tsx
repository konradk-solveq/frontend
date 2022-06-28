import {storiesOf} from '@storybook/react-native';
import LayoutCenter from '@sb/utils/LayoutCenter';
import React from 'react';
import {StyleSheet} from 'react-native';
import colors from '@theme/colors';
import NotificationList from '@components/notifications/NotificationList';
import {notifications} from '@components/notifications/__mocks__/notifications';
import {Notification} from '@components/notifications';

storiesOf('components/notifications/NotificationList', module)
    .addDecorator(getStory => (
        <LayoutCenter style={styles.background}>{getStory()}</LayoutCenter>
    ))
    .add('Default', () => (
        <NotificationList>
            {notifications.map(notification => (
                <Notification {...notification} />
            ))}
        </NotificationList>
    ));

const styles = StyleSheet.create({
    background: {
        backgroundColor: colors.lightGrey,
    },
});
