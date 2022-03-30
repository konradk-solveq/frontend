import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {
    color,
    number,
    boolean,
    object,
    optionsKnob,
} from '@storybook/addon-knobs';

import LayoutCenter from '@sb/utils/LayoutCenter';
import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';
import colors from '@theme/colors';

import {AnimatedPlaceholder} from '@components/placeholders';

const {width} = Dimensions.get('screen');
const horizontalPadding = getFHorizontalPx(16);
const BASE_HEIGHT = getFVerticalPx(100);
const PLACEHOLDER_LAYOUT = {
    width: width - horizontalPadding * 2,
    height: BASE_HEIGHT,
};

storiesOf('components/placeholders/AnimatedPlaceholder', module)
    .addDecorator(getStory => (
        <LayoutCenter style={styles.container}>{getStory()}</LayoutCenter>
    ))
    .add('Default', () => (
        <AnimatedPlaceholder
            layout={PLACEHOLDER_LAYOUT}
            showPlaceholder
            containerStyle={styles.placeholderContainer}>
            <View style={styles.component} />
        </AnimatedPlaceholder>
    ))
    .add('Customized', () => (
        <AnimatedPlaceholder
            layout={object('Placeholder layout', PLACEHOLDER_LAYOUT)}
            showPlaceholder={boolean('Show placeholder', true)}
            speed={number('Animation speed (ms)', 1200)}
            direction={optionsKnob(
                'Animation direction',
                {right: 'right', left: 'left'},
                'right',
                {
                    display: 'inline-radio',
                },
            )}
            backgroundColor={color('Background color', colors.lightGrey)}
            highlightColor={color('Highlight color', colors.greyish)}
            containerStyle={object(
                'Placeholder container style',
                styles.placeholderContainer,
            )}>
            <View style={styles.component} />
        </AnimatedPlaceholder>
    ));

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: horizontalPadding,
    },
    component: {
        width: '100%',
        height: BASE_HEIGHT,
    },
    placeholderContainer: {
        backgroundColor: '#000000',
    },
});
