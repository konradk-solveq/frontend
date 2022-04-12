import React from 'react';

import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {I18nextProvider} from 'react-i18next';

import LayoutCenter from '@sb/utils/LayoutCenter';

import i18next from '@translations/i18next';
import UserIntroductionContainer from '@containers/Onboarding/UserIntroductionContainer';
import {userRules} from '@utils/validation/validationRules';
import {validateData} from '@utils/validation/validation';

/**
 * Validates data with the same rule as in screen
 * if no return value passed
 */
const actionWithReturnValue = (
    name: string,
    valueToReturn?: {isValid: boolean; errorMessage: string},
) => (...args: [string, string | undefined]) => {
    action(name)(...args);

    /* Validate data */
    const [fieldName, value] = args;
    const rule = userRules?.[fieldName];
    const isValid = validateData(rule, value);

    /* Control validation status by passing retrun value */
    return valueToReturn || {isValid: isValid, errorMessage: 'Error message'};
};

storiesOf('containers/Onboarding/UserIntroduction', module)
    .addDecorator(getStory => (
        <I18nextProvider i18n={i18next}>
            <LayoutCenter>{getStory()}</LayoutCenter>
        </I18nextProvider>
    ))
    .add('Default', () => (
        <UserIntroductionContainer
            onSubmit={action('on-submit')}
            onValidate={actionWithReturnValue('on-validate')}
        />
    ));
