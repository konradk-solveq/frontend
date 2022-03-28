import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {boolean, object} from '@storybook/addon-knobs';
import {I18nextProvider} from 'react-i18next';

import LayoutCenter from '@sb/utils/LayoutCenter';

import i18next from '@translations/i18next';

import {genericBikerules} from '@utils/validation/validationRules';
import {validateData} from '@utils/validation/validation';
import AddOtherBikeContainer from '../AddOtherBikeContainer';
import {StyleSheet} from 'react-native';
import {bikeTypes} from '@src/services/mock/genericBIke';
import {genericBikeToClass} from '@src/utils/transformData';

const gb = {
    description: {
        id: '',
        name: '',
        producer: '',
        serial_number: '',
        sku: '',
    },
    bikeTypes: bikeTypes,
};

const genericBike = genericBikeToClass(gb);

/**
 * Validates data with the same rule as in screen
 * if no return value passed
 */
export const actionWithReturnValue = (
    name: string,
    valueToReturn?: {isValid: boolean; errorMessage: string},
) => (...args: [string, string | undefined]) => {
    action(name)(...args);

    /* Validate data */
    const [fieldName, value] = args;
    const rule = genericBikerules?.[fieldName];
    const isValid = validateData(rule, value);

    /* Control validation status by passing retrun value */
    return valueToReturn || {isValid: isValid, errorMessage: 'Error message'};
};

storiesOf('containers/AddBike/AddOtherBikeContainer', module)
    .addDecorator(getStory => (
        <I18nextProvider i18n={i18next}>
            <LayoutCenter style={styles.container}>{getStory()}</LayoutCenter>
        </I18nextProvider>
    ))
    .add('Default', () => (
        <AddOtherBikeContainer
            onSubmit={action('on-submit-action')}
            genericBikeData={genericBike}
            onValidate={actionWithReturnValue('on-validate-data-action')}
            isLoading={false}
        />
    ))
    .add('Customized', () => (
        <AddOtherBikeContainer
            onSubmit={action('on-submit-action')}
            genericBikeData={object('Generic Bike data', genericBike)}
            onValidate={actionWithReturnValue(
                'on-validate-data-action',
                object('Object to return after validation', {
                    isValid: true,
                    errorMessage: '',
                }),
            )}
            isLoading={boolean('Set loading status', false)}
        />
    ));

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
    },
});
