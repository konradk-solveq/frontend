import React, {ReactNode, useState} from 'react';

import {
    TouchableOpacity,
    View,
    StyleSheet,
    Animated,
    LayoutChangeEvent,
} from 'react-native';

import {getFVerticalPx} from '@theme/utils/appLayoutDimensions';
import {appContainerHorizontalMargin} from '@theme/commonStyle';
import {HorizontalDivider} from '@src/components/divider';
import colors from '@theme/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        overflow: 'hidden',
        paddingHorizontal: appContainerHorizontalMargin,
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    contentChild: {
        paddingTop: getFVerticalPx(16),
    },
    divider: {
        width: '100%',
        height: 1,
        position: 'absolute',
        top: 0,
    },
    dropDownImage: {
        position: 'absolute',
        top: '50%',
        right: 0,
    },
});

interface IProps {
    contentVisible: boolean;
    header: ReactNode;
    backgroundColor?: string;
    titleBackground?: string;
    contentBackground?: string;
    underlineColor?: string;
    visibleImage: ReactNode;
    invisibleImage: ReactNode;
    children?: ReactNode;
}

const DropDownItem: React.FC<IProps> = ({
    contentVisible = false,
    header,
    backgroundColor = colors.transparent,
    titleBackground = colors.transparent,
    contentBackground = colors.transparent,
    underlineColor = colors.greyish,
    visibleImage = false,
    invisibleImage = false,
    children,
}) => {
    const [isContentVisible, setContentVisible] = useState(contentVisible);
    const [isMounted, setIsMounted] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(0);
    const [contentHeight, setContentHeight] = useState(0);
    const [animatedItemValue, setAnimatedItemValue] = useState<any>();

    const runAnimation = () => {
        const initialValue = isContentVisible
            ? headerHeight + contentHeight
            : headerHeight;
        const finalValue = isContentVisible
            ? headerHeight
            : contentHeight + headerHeight;

        setContentVisible(!isContentVisible);
        animatedItemValue.setValue(initialValue);

        Animated.spring(animatedItemValue, {
            toValue: finalValue,
            useNativeDriver: false,
            bounciness: 2,
        }).start();
    };

    const onAnimLayout = (evt: LayoutChangeEvent) => {
        const newHeaderHeight = evt.nativeEvent.layout.height;
        if (!isMounted && !isContentVisible) {
            setAnimatedItemValue(new Animated.Value(newHeaderHeight));

            setIsMounted(true);
            setHeaderHeight(newHeaderHeight);

            return;
        }

        setIsMounted(true);
        setHeaderHeight(newHeaderHeight);
    };

    const onLayout = (evt: LayoutChangeEvent) => {
        const newContentHeight = evt.nativeEvent.layout.height;
        setContentHeight(newContentHeight);
    };

    const onPress = () => runAnimation();

    return (
        <>
            <Animated.View
                style={[
                    styles.container,
                    {
                        height: animatedItemValue,
                        backgroundColor: backgroundColor,
                    },
                ]}>
                <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
                    <View
                        onLayout={onAnimLayout}
                        style={{backgroundColor: titleBackground}}>
                        <View>{header}</View>
                        <View style={styles.dropDownImage}>
                            {isContentVisible ? visibleImage : invisibleImage}
                        </View>
                    </View>
                </TouchableOpacity>

                <View
                    style={{
                        ...styles.content,
                        backgroundColor: contentBackground,
                    }}
                    onLayout={onLayout}>
                    <View style={[styles.contentChild]}>{children}</View>
                </View>
            </Animated.View>
            <HorizontalDivider
                style={{...styles.divider, borderBottomColor: underlineColor}}
            />
        </>
    );
};

export default DropDownItem;
