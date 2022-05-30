import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {NotificationI} from '@components/notifications/Notification';
import Animated, {FadeIn, Layout, FadeOut} from 'react-native-reanimated';
import {getFVerticalPx} from '@helpers/appLayoutDimensions';

export interface NotificationListItemI extends NotificationI {
    key: string;
}

interface IProps {
    children: JSX.Element[];
    maxHeight?: number;
}

const renderItem = (item: JSX.Element) => (
    <Animated.View
        entering={FadeIn.delay(300)}
        layout={Layout.damping(1).delay(150)}
        exiting={FadeOut}
        key={item.key}>
        {item}
    </Animated.View>
);

const NotificationList = ({children, maxHeight}: IProps) => {
    return (
        <View style={[styles.container, {maxHeight: maxHeight}]}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}>
                {children.map(renderItem)}
            </ScrollView>
        </View>
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
