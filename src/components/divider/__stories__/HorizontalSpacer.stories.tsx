import React from 'react';
import {StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {number, object} from '@storybook/addon-knobs';

import LayoutCenter from '@sb/utils/LayoutCenter';
import {HorizontalSpacer} from '..';
import colors from '@theme/colors';

storiesOf('components/divider/HorizontalSpacer', module)
    .addDecorator(getStory => (
        <LayoutCenter style={styles.container}>{getStory()}</LayoutCenter>
    ))
    .add('Default', () => <HorizontalSpacer style={styles.spacer} />)
    .add('Customized', () => (
        <HorizontalSpacer
            height={number('Spacer height', 20)}
            style={object('Spacer style', styles.spacer)}
        />
    ));

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ededed',
    },
    spacer: {
        backgroundColor: colors.red,
    },
});
