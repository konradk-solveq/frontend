import {storiesOf} from '@storybook/react-native';
import LayoutCenter from '@sb/utils/LayoutCenter';
import React from 'react';
import Slider from '@components/slider/Slider';
import {number, color, boolean, object} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import colors from '@theme/colors';
import {StyleSheet} from 'react-native';
import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';

storiesOf('components/slider/Slider', module)
    .addDecorator(getStory => <LayoutCenter>{getStory()}</LayoutCenter>)
    .add('Default', () => (
        <Slider min={0} max={100} step={1} onValueChange={() => {}} />
    ))
    .add('Customized', () => (
        <Slider
            min={number('Min', 0)}
            max={number('Max', 100)}
            step={number('Step', 1)}
            onValueChange={action('slider-value-changed')}
            thumbColor={color('Thumb color', colors.white)}
            disabledThumbColor={color('Disabled thumb color', colors.grey)}
            railColor={color('Rail color', colors.transparentGrey)}
            selectedRailColor={color('Selected rail color', colors.red)}
            disabled={boolean('Disabled', false)}
            style={object('Slider style', styles.slider)}
            thumbStyle={object('Thumb style', styles.thumb)}
            railStyle={object('Rail style', styles.rail)}
            selectedRailStyle={object(
                'Selected rail style',
                styles.selectedRail,
            )}
        />
    ));

const styles = StyleSheet.create({
    slider: {width: '100%'},
    thumb: {
        width: getFHorizontalPx(28),
        height: getFVerticalPx(28),
        borderRadius: getFHorizontalPx(14),
    },
    rail: {
        width: '100%',
        height: getFVerticalPx(4),
        borderRadius: getFVerticalPx(2),
    },
    selectedRail: {
        width: '100%',
        height: getFVerticalPx(4),
    },
});
