import React from 'react';
import {Switch, SwitchProps} from 'react-native-switch';
import colors from '@theme/colors';
import {getFVerticalPx} from '@helpers/appLayoutDimensions';
import {StyleSheet} from 'react-native';
import {getFHorizontalPx} from '@theme/utils/appLayoutDimensions';

const CustomSwitch = ({
    onValueChange = () => {},
    disabled,
    activeText = '',
    inActiveText = '',
    backgroundActive = colors.green,
    backgroundInactive = colors.transparentGrey,
    value,
    circleActiveColor = colors.white,
    circleInActiveColor = colors.white,
    circleSize = getFVerticalPx(27),
    circleBorderActiveColor,
    circleBorderInactiveColor,
    activeTextStyle,
    inactiveTextStyle,
    containerStyle,
    barHeight = getFVerticalPx(31),
    circleBorderWidth = 0,
    renderInsideCircle,
    changeValueImmediately,
    innerCircleStyle,
    outerCircleStyle = styles.innerCircle,
    renderActiveText,
    renderInActiveText,
    switchLeftPx = getFHorizontalPx(3),
    switchRightPx = getFHorizontalPx(3),
    switchWidthMultiplier,
    switchBorderRadius,
    testID = 'switch-test-id',
}: SwitchProps) => (
    <Switch
        testID={testID}
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        activeText={activeText}
        inActiveText={inActiveText}
        circleSize={circleSize}
        barHeight={barHeight}
        circleBorderWidth={circleBorderWidth}
        backgroundActive={backgroundActive}
        backgroundInactive={backgroundInactive}
        circleActiveColor={circleActiveColor}
        circleInActiveColor={circleInActiveColor}
        circleBorderActiveColor={circleBorderActiveColor}
        circleBorderInactiveColor={circleBorderInactiveColor}
        activeTextStyle={activeTextStyle}
        inactiveTextStyle={inactiveTextStyle}
        containerStyle={containerStyle}
        renderInsideCircle={renderInsideCircle} // custom component to render inside the Switch circle (Text, Image, etc.)
        changeValueImmediately={changeValueImmediately} // if rendering inside circle, change state immediately or wait for animation to complete
        innerCircleStyle={innerCircleStyle} // style for inner animated circle for what you (may) be rendering inside the circle
        outerCircleStyle={outerCircleStyle} // style for outer animated circle
        renderActiveText={renderActiveText}
        renderInActiveText={renderInActiveText}
        switchLeftPx={switchLeftPx} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
        switchRightPx={switchRightPx} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
        switchWidthMultiplier={switchWidthMultiplier} // multiplied by the `circleSize` prop to calculate total width of the Switch
        switchBorderRadius={switchBorderRadius} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
    />
);

export default CustomSwitch;

const styles = StyleSheet.create({
    innerCircle: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: getFVerticalPx(3),
        },
        shadowOpacity: 0.15,
        shadowRadius: getFVerticalPx(4),
        elevation: 3,
    },
});
