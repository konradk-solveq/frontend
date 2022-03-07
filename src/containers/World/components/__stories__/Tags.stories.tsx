import React from 'react';
import {StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {object} from '@storybook/addon-knobs';

import LayoutCenter from '@sb/utils/LayoutCenter';
import options from '@api/mocks/configData';
import colors from '@theme/colors';

import {Tags} from '@containers/World/components';

const optionsData = options.tags;

const TAGS = [...optionsData].map(o => o.enumValue);

storiesOf('containers/World/components/Tags', module)
    .addDecorator(getStory => (
        <LayoutCenter style={styles.container}>{getStory()}</LayoutCenter>
    ))
    .add('Default', () => <Tags tags={TAGS} options={optionsData} />)
    .add('Customized', () => (
        <Tags
            tags={object('Tags list', TAGS)}
            options={object('Tags options', optionsData)}
            style={object('Tags style', styles.tags)}
        />
    ));

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ededed',
    },
    tags: {
        borderColor: colors.red,
        borderWidth: 1,
    },
});
