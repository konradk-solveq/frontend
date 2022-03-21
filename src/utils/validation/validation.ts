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
    isBoolean,
    isArray,
} from 'class-validator';
import {UseFormSetError} from 'react-hook-form';
import {MapFormData, MapFormDataResult} from '../../interfaces/form';
import validationRules from './validationRules';

const containsRule = (rule: string, k: string) => {
    return rule === k;
};

export const validateData = (rules: any[] | undefined, value: any) => {
    if (!Array.isArray(rules) || !rules) {
        return false;
    }

    let isValid = true;

    rules.forEach(el => {
        if (!isValid) {
            return;
        }

        if (typeof el === 'object') {
            if (el?.min) {
                if (isArray(value)) {
                    isValid = value?.length >= el.min;
                } else {
                    isValid = minLength(value, el.min);
                }
            }
            if (el?.max) {
                if (isArray(value)) {
                    isValid = value?.length <= el.max;
                } else {
                    isValid = maxLength(value, el.max);
                }
            }
            if (el?.match) {
                isValid = matches(value, new RegExp(el.match));
            }
            if (el?.isLength) {
                isValid = value?.length === el.isLength;
            }
            return isValid;
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

        if (containsRule(el, validationRules.boolean)) {
            isValid = value == false || value == true || isBoolean(value);
        }
    });

    return isValid;
};

export const reValidateMapMetadataManually = (
    data: MapFormDataResult,
    validationMessages: string[],
    onError: UseFormSetError<MapFormData>,
    skip?: string[],
) => {
    let isValid = true;
    Object.keys(data).forEach((d: any) => {
        if (skip && skip.includes(d)) {
            return;
        }

        const el = data?.[d as keyof MapFormDataResult];
        const isEmptyString = isString(el) && isEmpty(el.trim());
        const emptyArray = isArray(el) && !el?.length;

        if (!el || isEmptyString || emptyArray) {
            isValid = false;
            onError(d, {
                type: 'manual',
                message: validationMessages[d],
            });
        }
    });

    return isValid;
};
