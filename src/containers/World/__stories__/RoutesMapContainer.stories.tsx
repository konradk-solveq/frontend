import React from 'react';
import {StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {object} from '@storybook/addon-knobs';
import {I18nextProvider} from 'react-i18next';

import LayoutCenter from '@sb/utils/LayoutCenter';
import {getFHorizontalPx} from '@theme/utils/appLayoutDimensions';

import {RoutesMapContainer} from '@containers/World';
import {BasicCoordsType} from '@type/coords';

import rotueMarkers from '@api/mocks/routesMapMarkersData';
import i18next from '@translations/i18next';

const location: BasicCoordsType = {
    latitude: 50.664087722680975,
    longitude: 17.88744936290463,
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
            onPressClose={action('onPressClose')}
            onMapLoadEnd={action('onMapLoadEnd')}
            onWebViewMessage={action('onWebViewMessage')}
            routesMarkers={object('Route markers', rotueMarkers)}
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
