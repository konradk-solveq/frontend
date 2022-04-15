import {storiesOf} from '@storybook/react-native';
import LayoutCenter from '@sb/utils/LayoutCenter';
import {action} from '@storybook/addon-actions';
import React from 'react';
import {Checkbox} from '@components/inputs';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {getFVerticalPx} from '@helpers/appLayoutDimensions';
import {boolean, color, object, number} from '@storybook/addon-knobs';
import colors from '@theme/colors';

storiesOf('components/input/Checkbox', module)
    .addDecorator(getStory => (
        <LayoutCenter style={styles.container}>{getStory()}</LayoutCenter>
    ))
    .add('Default', () => (
        <>
            <Checkbox onPress={action('on-checkbox-press')} checked={true} />
            <View style={styles.spacer} />
            <Checkbox onPress={action('on-checkbox-press')} checked={false} />
        </>
    ))
    .add('Customized', () => (
        <>
            <Checkbox
                onPress={action('on-checkbox-press')}
                checked={boolean('Checked', true)}
                size={number('Size', 18)}
                backgroundColor={color('Background color', colors.black)}
                iconColor={color('Icon color', colors.white)}
                style={object<ViewStyle>('Style', {})}
                hitSlop={number('Hit slop', 0)}
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
