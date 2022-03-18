import React from 'react';
import {StyleSheet, View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {object} from '@storybook/addon-knobs';

import LayoutCenter from '@sb/utils/LayoutCenter';
import appConfig from '@api/mocks/configData';
import mapData from '@api/mocks/mapData';
import colors from '@theme/colors';

import {getImagesThumbs, mapToClass} from '@utils/transformData';
import FullDescription from '@containers/World/components/FullDescription';

const routeData = mapToClass(mapData.elements[2], appConfig);
const images = getImagesThumbs({
    images: routeData?.images || [],
    thumbnails: [],
});

storiesOf('containers/World/components/FullDescription', module)
    .addDecorator(getStory => (
        <LayoutCenter style={styles.container}>
            <View style={styles.wrapper}>{getStory()}</View>
        </LayoutCenter>
    ))
    .add('Default', () => (
        <FullDescription mapData={routeData} images={images} />
    ))
    .add('Customized', () => (
        <FullDescription
            mapData={object('Route data, ', routeData)}
            images={object('Route images', images)}
        />
    ));

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ededed',
    },
    wrapper: {
        width: '100%',
    },
    tags: {
        borderColor: colors.red,
        borderWidth: 1,
    },
});
