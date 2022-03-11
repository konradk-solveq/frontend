import {storiesOf} from '@storybook/react-native';
import LayoutCenter from '@sb/utils/LayoutCenter';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Switch} from '@components/inputs';
import {getFVerticalPx} from '@helpers/appLayoutDimensions';
import colors from '@theme/colors';
import {getFHorizontalPx} from '@theme/utils/appLayoutDimensions';
import {action} from '@storybook/addon-actions';
import {boolean, text, color, number, object} from '@storybook/addon-knobs';

storiesOf('components/input/Switch', module)
    .addDecorator(getStory => (
        <LayoutCenter style={styles.container}>{getStory()}</LayoutCenter>
    ))
    .add('Default', () => (
        <>
            <Switch value={false} />
            <View style={styles.spacer} />
            <Switch value={true} />
        </>
    ))
    .add('Custom', () => (
        <>
            <Switch
                onValueChange={action('switch-on-press')}
                value={boolean('Value', true)}
                disabled={boolean('Disabled', false)}
                activeText={text('Active text', '')}
                inActiveText={text('Inactive text', '')}
                circleSize={number('Circle size', getFVerticalPx(27))}
                barHeight={number('Bar height', getFVerticalPx(31))}
                switchBorderRadius={number(
                    'Switch border radius',
                    getFVerticalPx(15.5),
                )}
                circleBorderWidth={number(
                    'Circle border width',
                    getFVerticalPx(2),
                )}
                switchLeftPx={number('Switch left px', getFHorizontalPx(3))}
                switchRightPx={number('Switch right px', getFHorizontalPx(3))}
                backgroundActive={color('Background active', colors.green)}
                backgroundInactive={color('Background inactive', colors.grey)}
                circleActiveColor={color('Circle active', colors.white)}
                circleInActiveColor={color('Circle inactive', colors.white)}
                circleBorderActiveColor={color(
                    'Circle border active',
                    colors.white,
                )}
                circleBorderInactiveColor={color(
                    'Circle border inactive',
                    colors.red,
                )}
                activeTextStyle={object('Active text style', {})}
                inactiveTextStyle={object('Inactive text style', {})}
                containerStyle={object('Container style', {})}
                innerCircleStyle={object('Inner circle style', {})}
                outerCircleStyle={object('Outer circle style', {})}
                switchWidthMultiplier={number('Width multiplier', 2)}
            />
        </>
    ));

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ededed',
    },
    spacer: {
        height: getFVerticalPx(10),
    },
});
