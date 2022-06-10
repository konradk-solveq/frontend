import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, ScrollView, LayoutChangeEvent} from 'react-native';
import Animated, {
    FadeIn,
    Layout,
    FadeOut,
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';

import {NotificationI} from '@components/notifications/Notification';
import {getFVerticalPx} from '@theme/utils/appLayoutDimensions';

export interface NotificationListItemI extends NotificationI {
    key: string;
}

interface IProps {
    children: JSX.Element[];
    maxHeight?: number;
    paddingTop?: number;
    onLayout?: (event: LayoutChangeEvent) => void;
}
interface IItemProps {
    item: JSX.Element;
}

const ListItem = ({item}: IItemProps) => {
    const [height, setHeight] = useState(0);
    return (
        <Animated.View
            onLayout={e => {
                if (!e?.nativeEvent?.layout) {
                    return;
                }
                setHeight(e.nativeEvent.layout.height);
            }}
            style={height ? styles.listItem : {}}
            entering={FadeIn.delay(300)}
            layout={Layout.damping(1).delay(150)}
            exiting={FadeOut}>
            {item}
        </Animated.View>
    );
};

const renderItem = (item: JSX.Element) => (
    <ListItem item={item} key={item.key} />
);

const NotificationList = ({
    children,
    maxHeight,
    paddingTop,
    onLayout = () => {},
}: IProps) => {
    /**
     * Disable this additional area when there is no notifications
     */
    const bottomStyle = useMemo(
        () => (children?.length > 0 ? styles.content : undefined),
        [children],
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
            pointerEvents="box-none"
            onLayout={onLayout}
            style={[
                styles.container,
                paddingTopAnimation,
                {maxHeight: maxHeight},
            ]}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={bottomStyle}>
                {children.map(renderItem)}
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
    listItem: {
        marginTop: getFVerticalPx(16),
    },
});
