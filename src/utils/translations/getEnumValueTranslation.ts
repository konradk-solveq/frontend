export const getEnumValueTranslation = (
    values: {
        enumValue: string;
        i18nValue: string;
    }[],
    enumValue?: string,
) => {
    const translation = values.find(val => val.enumValue === enumValue);
    return translation && translation.i18nValue;
};
