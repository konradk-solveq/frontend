import React from 'react';
import {StyleSheet, View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {object, text} from '@storybook/addon-knobs';

import LayoutCenter from '@sb/utils/LayoutCenter';
import appConfig from '@api/mocks/configData';
import mapData from '@api/mocks/mapData';
import colors from '@theme/colors';

import {PrologDescription} from '@containers/World/components';
import {mapToClass} from '@utils/transformData';

const routeData = mapToClass(mapData.elements[0], appConfig);

storiesOf('containers/World/components/PrologDescription', module)
    .addDecorator(getStory => (
        <LayoutCenter style={styles.container}>
            <View style={styles.wrapper}>{getStory()}</View>
        </LayoutCenter>
    ))
    .add('Default', () => (
        <PrologDescription
            name={routeData.name}
            distance={routeData.distanceInKilometers}
            time={routeData.timeFormatedToString}
            distanceToRoute={routeData.distanceToRouteInKilometers}
            difficultiesLevels={routeData.pickedDifficulties}
            reactions={routeData.reactions}
        />
    ))
    .add('Customized', () => (
        <PrologDescription
            name={text('Route name', routeData.name)}
            distance={text(
                'Route distance (km)',
                routeData.distanceInKilometers,
            )}
            time={text('Ruoute duration', routeData.timeFormatedToString)}
            distanceToRoute={text(
                'Distance to route',
                routeData.distanceToRouteInKilometers,
            )}
            difficultiesLevels={object(
                'Route difficulty levels',
                routeData.pickedDifficulties,
            )}
            reactions={object('Likes', routeData.reactions)}
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
