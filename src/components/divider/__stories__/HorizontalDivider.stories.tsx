import React from 'react';
import {StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {color, number, object} from '@storybook/addon-knobs';

import LayoutCenter from '@sb/utils/LayoutCenter';
import {HorizontalDivider} from '..';
import colors from '@theme/colors';

storiesOf('components/divider/HorizontalDivider', module)
    .addDecorator(getStory => (
        <LayoutCenter style={styles.container}>{getStory()}</LayoutCenter>
    ))
    .add('Default', () => <HorizontalDivider style={styles.spacer} />)
    .add('Customized', () => (
        <HorizontalDivider
            color={color('Divider color', colors.red)}
            width={number('Divider width', 2)}
            style={object('Icon style', styles.spacer)}
        />
    ));

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ededed',
    },
    spacer: {
        width: '100%',
    },
});
