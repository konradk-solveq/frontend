import React from 'react';
import {StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {text} from '@storybook/addon-knobs';
import {I18nextProvider} from 'react-i18next';

import LayoutCenter from '@sb/utils/LayoutCenter';
import i18next from '@translations/i18next';
import SavingPanel from '../SavingPanel';
import {LeafSvg, MoneySvg} from '@src/components/svg';
import colors from '@src/theme/colors';

const SAVINGS_FUEL = '22';
const SAVINGS_RESOURCE = '3310';

const SAVED_RESOURCE_TEXT = `${text(
    'Resource Value',
    SAVINGS_RESOURCE,
)} saved CO2 grams`;

const SAVED_FUEL_TEXT = `${text(
    'Fuel value',
    SAVINGS_FUEL,
)} liters of fuel saved`;

storiesOf('containers/Recording/components/SavingPanel', module)
    .addDecorator(getStory => (
        <I18nextProvider i18n={i18next}>
            <LayoutCenter style={styles.container}>{getStory()}</LayoutCenter>
        </I18nextProvider>
    ))
    .add('Saved resources option', () => (
        <SavingPanel
            text={SAVED_RESOURCE_TEXT}
            background={colors.lightGreen}
            icon={<LeafSvg />}
        />
    ))
    .add('Saved fuel option', () => (
        <SavingPanel
            text={SAVED_FUEL_TEXT}
            background={colors.lightBlue}
            icon={<MoneySvg />}
        />
    ));

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 0,
    },
});
