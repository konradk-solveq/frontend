import React, {useEffect, useMemo} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import Animated, {
    FadeIn,
    Layout,
    FadeOut,
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';

import {Notification} from '@components/notifications/index';
import {NotificationI} from '@components/notifications/Notification';
import {getFVerticalPx} from '@theme/utils/appLayoutDimensions';

export interface NotificationListItemI extends NotificationI {
    key: string;
}

interface IProps {
    notifications: NotificationListItemI[];
    maxHeight?: number;
    paddingTop?: number;
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

const NotificationList = ({notifications, maxHeight, paddingTop}: IProps) => {
    /**
     * Disable this additional area when there is no notifications
     */
    const bottomStyle = useMemo(
        () => (notifications?.length > 0 ? styles.content : undefined),
        [notifications],
    );
    const paddingTopValue = useSharedValue(0);
    const paddingTopAnimation = useAnimatedStyle(() => ({
        paddingTop: withTiming(paddingTopValue.value, {
            duration: 200,
        }),
    }));

    useEffect(() => {
        paddingTopValue.value = paddingTop ?? 0;
    }, [paddingTop, paddingTopValue]);

    return (
        <Animated.View
            style={[
                styles.container,
                paddingTopAnimation,
                {maxHeight: maxHeight},
            ]}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={bottomStyle}>
                {notifications.map(renderItem)}
            </ScrollView>
        </Animated.View>
    );
};

export default NotificationList;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
    content: {
        /**
            We need some extra space below the last element,
            because it disappears during the removal of any component above it
         */
        paddingBottom: getFVerticalPx(96),
    },
});
