import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Notification} from '@components/notifications/index';
import {NotificationI} from '@components/notifications/Notification';
import Animated, {FadeIn, Layout, FadeOut} from 'react-native-reanimated';
import {getFVerticalPx} from '@helpers/appLayoutDimensions';

export interface NotificationListItemI extends NotificationI {
    key: string;
}

interface IProps {
    notifications: NotificationListItemI[];
    maxHeight?: number;
}

const renderItem = (item: NotificationListItemI) => (
    <Animated.View
        entering={FadeIn.delay(300)}
        layout={Layout.damping(1).delay(150)}
        exiting={FadeOut}
        key={item.key}>
        <Notification {...item} />
    </Animated.View>
);

const NotificationList = ({notifications, maxHeight}: IProps) => {
    return (
        <View style={[styles.container, {maxHeight: maxHeight}]}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}>
                {notifications.map(renderItem)}
            </ScrollView>
        </View>
    );
};

export default NotificationList;

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    content: {
        /**
            We need some extra space below the last element,
            because it disappears during the removal of any component above it
         */
        paddingBottom: getFVerticalPx(96),
    },
});
