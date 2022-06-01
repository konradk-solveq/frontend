import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {boolean, object} from '@storybook/addon-knobs';
import {I18nextProvider} from 'react-i18next';

import i18next from '@translations/i18next';
import {StyleSheet, ScrollView} from 'react-native';
import EditForm from '@containers/World/EditDetailsContainer';
import {
    imagesData,
    alertData,
    mapData,
    options,
} from '@containers/World/__mocks__/editDetailsData';
import {appContainerHorizontalMargin} from '@theme/commonStyle';

storiesOf('containers/World/EditDetailsContainer', module)
    .addDecorator(getStory => (
        <I18nextProvider i18n={i18next}>
            <ScrollView style={styles.container}>{getStory()}</ScrollView>
        </I18nextProvider>
    ))
    .add('Default', () => (
        <EditForm
            onSubmit={action('on-submit-action')}
            imagesData={imagesData}
            scrollTop={action('on-scroll-top')}
            mapData={undefined}
            options={options}
            alertData={alertData}
        />
    ))
    .add('Customized', () => (
        <EditForm
            onSubmit={action('on-submit-action')}
            imagesData={object('Images', imagesData)}
            scrollTop={action('on-scroll-top')}
            publish={boolean('Publish', false)}
            mapData={object('Map data', mapData)}
            options={object('Options data', options)}
            alertData={object('Alert data', alertData)}
        />
    ));

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        paddingHorizontal: appContainerHorizontalMargin,
    },
});
