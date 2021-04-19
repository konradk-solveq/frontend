import {
    isEmpty,
    isNotEmpty,
    isNumber,
    isNumberString,
    isString,
    isEmail,
    minLength,
    maxLength,
    matches,
} from 'class-validator';
import validationRules from './validationRules';

const containsRule = (rule: string, k: string) => {
    return rule === k;
};

export const validateData = (rules: any[], value: any) => {
    if (!Array.isArray(rules)) {
        return false;
    }

    let isValid = true;

    rules.forEach(el => {
        if (!isValid) {
            return;
        }

        if (typeof el === 'object') {
            if (el?.min) {
                isValid = minLength(value, el.min);
            }
            if (el?.max) {
                isValid = maxLength(value, el.max);
            }
            if (el?.match) {
                console.log(el.match)
                isValid = matches(value, new RegExp(el.match));
            }
        }

        if (containsRule(el, validationRules.required)) {
            isValid = isNotEmpty(value);
        }

        if (containsRule(el, validationRules.empty)) {
            isValid = isEmpty(value);
        }

        if (containsRule(el, validationRules.notEmpty)) {
            isValid = isNotEmpty(value);
        }

        if (containsRule(el, validationRules.number)) {
            isValid = isNumber(value);
        }

        if (containsRule(el, validationRules.numberString)) {
            isValid = isNumberString(value);
        }

        if (containsRule(el, validationRules.string)) {
            isValid = isString(value);
        }

        if (containsRule(el, validationRules.email)) {
            isValid = isEmail(value);
        }
    });

    return isValid;
};
