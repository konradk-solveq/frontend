import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {boolean, object} from '@storybook/addon-knobs';
import {I18nextProvider} from 'react-i18next';

import LayoutCenter from '@sb/utils/LayoutCenter';

import i18next from '@translations/i18next';

import {AddBikeByNumberContainer} from '@containers/AddBike';
import validationRules from '@utils/validation/validationRules';
import {validateData} from '@utils/validation/validation';

const rules: Record<string, any[] | undefined> = {
    bikeNumber: [
        validationRules.required,
        validationRules.string,
        {[validationRules.min]: 3},
    ],
};

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
    const rule = rules?.[fieldName];
    const isValid = validateData(rule, value);

    /* Control validation status by passing retrun value */
    return valueToReturn || {isValid: isValid, errorMessage: 'Error message'};
};

storiesOf('containers/AddBike/AddBikeByNumberContainer', module)
    .addDecorator(getStory => (
        <I18nextProvider i18n={i18next}>
            <LayoutCenter>{getStory()}</LayoutCenter>
        </I18nextProvider>
    ))
    .add('Default', () => (
        <AddBikeByNumberContainer
            onSubmit={action('on-submit-action')}
            onPressLink={action('on-press-link-action')}
            onValidate={actionWithReturnValue('on-validate-data-action')}
        />
    ))
    .add('Customized', () => (
        <AddBikeByNumberContainer
            onSubmit={action('on-submit-action')}
            onPressLink={action('on-press-link-action')}
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
