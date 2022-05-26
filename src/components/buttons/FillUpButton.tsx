import React, {useRef} from 'react';
import {StyleSheet, ViewStyle, Animated} from 'react-native';

import colors from '@theme/colors';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {getFHorizontalPx} from '@helpers/appLayoutDimensions';
import Button from './Button';
import {MykrossIconFont} from '@theme/enums/iconFonts';

interface IProps {
    onFilledAction: () => void;
    onReleaseAction?: () => void;
    text: string;
    backgroundColor?: string;
    textColor?: string;
    icon?: MykrossIconFont;
    fillColor?: string;
    pressDuration?: number;
    cooldownDuration?: number;
    disabled?: boolean;
    withLoader?: boolean;
    withoutShadow?: boolean;
    style?: ViewStyle;
    testID?: string;
}

const FillUpButton: React.FC<IProps> = ({
    onFilledAction,
    onReleaseAction = () => {},
    text,
    backgroundColor,
    textColor,
    icon,
    fillColor = colors.lightRed,
    pressDuration = 3000,
    cooldownDuration = 100,
    disabled = false,
    withLoader = false,
    withoutShadow = false,
    style,
    testID = 'fill-up-btn-test-id',
}: IProps) => {
    const backgroundWidthRef = useRef(new Animated.Value(0)).current;

    const styles = StyleSheet.create({
        container: {
            width: getFHorizontalPx(294),
            height: getFHorizontalPx(48),
        },
        buttonFill: {
            position: 'absolute',
            backgroundColor: fillColor,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        },
    });

    const backgroundContainerWidth = backgroundWidthRef.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    const handleOnPressIn = () => {
        Animated.timing(backgroundWidthRef, {
            toValue: 1,
            duration: pressDuration,
            useNativeDriver: false,
        }).start(() => {
            if (backgroundWidthRef.__getValue() === 1) {
                onFilledAction();
            }
        });
    };

    const handleOnPressOut = () => {
        if (backgroundWidthRef.__getValue() < 1) {
            onReleaseAction();
        }

        Animated.timing(backgroundWidthRef, {
            toValue: 0,
            duration: cooldownDuration,
            useNativeDriver: false,
        }).start();
    };

    return (
        <TouchableWithoutFeedback
            onPressIn={handleOnPressIn}
            onPressOut={handleOnPressOut}
            style={styles.container}
            testID={`${testID}-touchable`}>
            <Button
                text={text}
                onPress={() => {}}
                color={backgroundColor}
                disabledColor={colors.lightRed}
                icon={icon}
                disabled={disabled}
                withLoader={withLoader}
                testID={testID}
                textColor={textColor}
                withoutShadow={withoutShadow}
                disabledTextColor={colors.white}
                loaderColor={colors.white}
                style={[style || {}]}
                isFillUp>
                <Animated.View
                    testID={`${testID}-animated-bg`}
                    style={[
                        styles.buttonFill,
                        {width: backgroundContainerWidth},
                    ]}
                />
            </Button>
        </TouchableWithoutFeedback>
    );
};

export default FillUpButton;
