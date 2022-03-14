import React from 'react';
import {StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {boolean, object} from '@storybook/addon-knobs';
import {I18nextProvider} from 'react-i18next';

import LayoutCenter from '@sb/utils/LayoutCenter';

import i18next from '@translations/i18next';
import appConfig from '@api/mocks/configData';
import mapData from '@api/mocks/mapData';
import {getImagesThumbs, mapToClass} from '@utils/transformData';
import colors from '@theme/colors';

import RouteMapDetailsContainer from '@containers/World/RouteMapDetailsContainer';

const routeData = mapToClass(mapData.elements[2], appConfig);
const images = getImagesThumbs(routeData?.images || []);

storiesOf('containers/World/RoutesMapDetailsContainer', module)
    .addDecorator(getStory => (
        <I18nextProvider i18n={i18next}>
            <LayoutCenter style={styles.container}>{getStory()}</LayoutCenter>
        </I18nextProvider>
    ))
    .add('Default', () => (
        <RouteMapDetailsContainer
            onPressAction={action('route-map-details-container-pressed')}
            mapData={routeData}
            mapImages={images}
        />
    ))
    .add('Customized', () => (
        <RouteMapDetailsContainer
            onPressAction={action('route-map-details-container-pressed')}
            mapData={object('Route data', routeData)}
            mapImages={object('Route images', images)}
            isPrivate={boolean('Route created by user', false)}
            isPublished={boolean('Route has been published', false)}
            style={object('Tags style', styles.detailsContainer)}
        />
    ));

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ededed',
    },
    detailsContainer: {
        borderColor: colors.red,
        borderWidth: 1,
    },
});
