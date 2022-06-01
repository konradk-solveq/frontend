import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
    View,
    TextStyle,
    ViewStyle,
    LayoutChangeEvent,
    StyleSheet,
    GestureResponderEvent,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';
import {LAYOUT_HORIZONTAL_MARGIN} from '@theme/layout';
import {getAppLayoutConfig} from '@theme/appLayoutConfig';
import {
    appContainerHorizontalMargin,
    navBarHeight,
    screenWidth,
} from '@theme/commonStyle';
import {MykrossIconFont} from '@theme/enums/iconFonts';
import colors from '@theme/colors';

import {Header2} from '@components/texts/texts';
import {IconButton} from '@components/buttons';

interface IProps {
    title: string;
    onPress?: (
        e: GestureResponderEvent,
    ) => void /* Action after back button pressed */;
    getHeaderHeight?: (height: number) => void;
    rightActions?: Element;
    hideBackArrow?: boolean;
    titleStyle?: TextStyle;
    forceBackArrow?: boolean;
    showCross?: boolean;
    style?: ViewStyle;
    testID?: string;
}

const NavigationHeader: React.FC<IProps> = ({
    style,
    onPress,
    title,
    getHeaderHeight,
    rightActions,
    hideBackArrow,
    titleStyle,
    forceBackArrow,
    showCross = false,
    testID = 'navigation-header-test-id',
}: IProps) => {
    const navigation = useNavigation();
    const statusBarHeight = getAppLayoutConfig.statusBarH();
    const [headerHeight, setHeaderHeight] = useState(
        navBarHeight - statusBarHeight,
    );

    const showBackArrow = useMemo(
        () => navigation.canGoBack() && !hideBackArrow,
        [hideBackArrow, navigation],
    );

    const onGetHeight = useCallback(() => {
        if (getHeaderHeight) {
            getHeaderHeight(headerHeight);
        }
    }, [getHeaderHeight, headerHeight]);

    useEffect(() => {
        onGetHeight();
    }, [onGetHeight]);

    const onPressHandler = useCallback(
        (e: GestureResponderEvent) => {
            if (onPress) {
                onPress(e);
                return;
            }

            if (navigation.canGoBack()) {
                navigation.goBack();
            }
        },
        [onPress, navigation],
    );

    const onLayoutEvent = (event: LayoutChangeEvent) => {
        const {height} = event?.nativeEvent?.layout;
        if (height) {
            setHeaderHeight(height);
        }
    };

    return (
        <View
            onLayout={onLayoutEvent}
            style={[
                styles.container,
                {height: navBarHeight, width: screenWidth},
                style,
            ]}
            testID={testID}>
            <View style={styles.row}>
                {/* Back/close button */}
                <ActionContainer>
                    {(forceBackArrow || showBackArrow) && (
                        <BackButton
                            onPress={onPressHandler}
                            showCross={showCross}
                            testID={`${testID}-back-button`}
                        />
                    )}
                </ActionContainer>

                {/* Title */}
                <TitleContainer>
                    <Header2
                        style={titleStyle}
                        algin="center"
                        adjustsFontSizeToFit
                        numberOfLines={1}
                        testID={`${testID}-title`}>
                        {title}
                    </Header2>
                </TitleContainer>

                {/* RIght action buttons */}
                <ActionContainer>
                    {rightActions && (
                        <View
                            style={styles.actionButtons}
                            testID={`${testID}-actions-container`}>
                            {rightActions}
                        </View>
                    )}
                </ActionContainer>
            </View>
        </View>
    );
};

interface IPropsContainer {
    children?: React.ReactNode;
}

const ActionContainer: React.FC<IPropsContainer> = ({
    children,
}: IPropsContainer) => <View style={styles.actionContainer}>{children}</View>;

const TitleContainer: React.FC<IPropsContainer> = ({
    children,
}: IPropsContainer) => <View style={styles.titleContainer}>{children}</View>;

interface IIBProps {
    onPress: (e: GestureResponderEvent) => void;
    showCross?: boolean;
    testID?: string;
}

const BackButton: React.FC<IIBProps> = React.memo(
    ({onPress, showCross, testID = 'back-button-id'}: IIBProps) => (
        <IconButton
            icon={
                showCross
                    ? MykrossIconFont.MYKROSS_ICON_EXIT
                    : MykrossIconFont.MYKROSS_ICON_BACK
            }
            iconColor={colors.black}
            style={styles.backButton}
            onPress={onPress}
            testID={showCross ? `${testID}-cross` : testID}
        />
    ),
);

export default React.memo(NavigationHeader);

const ROW_HEIGHT = 48;
const ACTION_CONTAINER_WIDTH = 60;
const HEADER_TITLE_CONTAINER_WIDTH =
    2 * (ACTION_CONTAINER_WIDTH + LAYOUT_HORIZONTAL_MARGIN);
const HEADER_CONTENT_CONTAINER_HEIGHT = 28;
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: navBarHeight,
        zIndex: 1,
    },
    row: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        marginBottom: getFVerticalPx(9),
        height: getFVerticalPx(ROW_HEIGHT),
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexDirection: 'row',
        paddingHorizontal: appContainerHorizontalMargin,
    },
    actionButtonsWraper: {
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
    actionButtons: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    actionContainer: {
        flexDirection: 'row',
        width: getFHorizontalPx(ACTION_CONTAINER_WIDTH),
        height: getFVerticalPx(HEADER_CONTENT_CONTAINER_HEIGHT),
        paddingRight: getFHorizontalPx(2),
        alignItems: 'center',
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: getFVerticalPx(HEADER_CONTENT_CONTAINER_HEIGHT),
        width: screenWidth - getFHorizontalPx(HEADER_TITLE_CONTAINER_WIDTH),
    },
    backButton: {
        width: getFHorizontalPx(24),
        height: getFHorizontalPx(24),
        paddingLeft: getFHorizontalPx(2),
        backgroundColor: 'transparent',
    },
});
