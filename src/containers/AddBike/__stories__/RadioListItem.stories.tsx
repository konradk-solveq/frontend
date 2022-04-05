import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {object, select} from '@storybook/addon-knobs';
import {I18nextProvider} from 'react-i18next';

import LayoutCenter from '@sb/utils/LayoutCenter';

import i18next from '@translations/i18next';

import {bikesConfig} from '@services/mock/genericBIke';
import {RadioListItem} from '@containers/AddBike/components';

const bikeTypesList = bikesConfig.bikeTypes.options;

const {width} = Dimensions.get('screen');

storiesOf('containers/AddBike/components/RadioListItem', module)
    .addDecorator(getStory => (
        <I18nextProvider i18n={i18next}>
            <LayoutCenter>
                <View style={styles.container}>{getStory()}</View>
            </LayoutCenter>
        </I18nextProvider>
    ))
    .add('Default', () => (
        <RadioListItem
            bikeTypes={bikeTypesList}
            bikeType={bikeTypesList[0].enumValue}
            onPress={action('on-press-radio-list-item-action')}
        />
    ))
    .add('Customized', () => (
        <RadioListItem
            bikeTypes={object('Bike types', bikeTypesList)}
            bikeType={select(
                'Selected bike type',
                bikeTypesList.map(bt => bt.enumValue),
                bikeTypesList[0].enumValue,
            )}
            onPress={action('on-press-radio-list-item-action')}
        />
    ));

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        width: width,
        paddingHorizontal: 16,
    },
});
