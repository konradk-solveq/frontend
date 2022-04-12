export const validationRules = {
    required: 'required',
    string: 'string',
    number: 'number',
    numberString: 'numberString',
    empty: 'empty',
    notEmpty: 'notEmpty',
    email: 'email',
    int: 'int',
    min: 'min',
    max: 'max',
    equal: 'equal',
    boolean: 'boolean',
    isArray: 'isArray',
    isLength: 'isLength',
};

export default validationRules;

export const genericBikerules: Record<string, any[] | undefined> = {
    bikeName: [
        validationRules.required,
        validationRules.string,
        {[validationRules.min]: 3},
    ],
    bikeType: [
        validationRules.required,
        validationRules.string,
        validationRules.notEmpty,
    ],
    manufacturer: [
        validationRules.required,
        validationRules.string,
        {[validationRules.min]: 3},
    ],
};

export const userRules: Record<string, any[] | undefined> = {
    name: [
        validationRules.required,
        validationRules.string,
        {[validationRules.min]: 3},
    ],
};
