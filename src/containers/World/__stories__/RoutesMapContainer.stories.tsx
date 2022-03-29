import React from 'react';
import {StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {boolean, object, select} from '@storybook/addon-knobs';
import {I18nextProvider} from 'react-i18next';

import LayoutCenter from '@sb/utils/LayoutCenter';
import {getFHorizontalPx} from '@theme/utils/appLayoutDimensions';

import {RoutesMapContainer} from '@containers/World';
import {BasicCoordsType} from '@type/coords';

import rotueMarkers from '@api/mocks/routesMapMarkersData';
import routePath from '@api/mocks/routesMapPathData';
import i18next from '@translations/i18next';

const location: BasicCoordsType = {
    latitude: 50.664087722680975,
    longitude: 17.88744936290463,
};

const mapTypeOptions = {
    Private: 'private',
    Public: 'regular',
    Saved: 'favourite',
};

storiesOf('containers/World/RoutesMapContainer', module)
    .addDecorator(getStory => (
        <I18nextProvider i18n={i18next}>
            <LayoutCenter style={styles.container}>{getStory()}</LayoutCenter>
        </I18nextProvider>
    ))
    .add('Default', () => (
        <RoutesMapContainer
            location={object('User Location', location)}
            centerMapAtLocation={object('Map center Location', location)}
            onPressClose={action('onPressClose')}
            onMapLoadEnd={action('onMapLoadEnd')}
            onWebViewMessage={action('onWebViewMessage')}
            animateButtonsPosition={boolean('Animate buttons position', false)}
            pathType={select('Route type', mapTypeOptions, 'regular')}
            routesMarkers={object('Route markers', rotueMarkers)}
            mapPath={object('Route path', routePath)}
        />
    ));

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 0,
    },
    button: {
        width: getFHorizontalPx(294),
        height: getFHorizontalPx(48),
    },
});
