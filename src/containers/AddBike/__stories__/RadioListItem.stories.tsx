import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {object, select} from '@storybook/addon-knobs';
import {I18nextProvider} from 'react-i18next';

import LayoutCenter from '@sb/utils/LayoutCenter';

import i18next from '@translations/i18next';

import {bikeTypes} from '@services/mock/genericBIke';
import {RadioListItem} from '@containers/AddBike/components';

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
            bikeTypes={bikeTypes}
            bikeType={bikeTypes[0].enumValue}
            onPress={action('on-press-radio-list-item-action')}
        />
    ))
    .add('Customized', () => (
        <RadioListItem
            bikeTypes={object('Bike types', bikeTypes)}
            bikeType={select(
                'Selected bike type',
                bikeTypes.map(bt => bt.enumValue),
                bikeTypes[0].enumValue,
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
