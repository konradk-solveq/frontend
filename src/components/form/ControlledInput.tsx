import React from 'react';
import {Controller, Control, FieldValues} from 'react-hook-form';

import {FCPropsI} from '@components/types/form';
import {GenericInput} from '@components/form';

interface IProps {
    fieldName: keyof FieldValues;
    control: Control<FieldValues>;
    Input: React.FunctionComponent<FCPropsI>;
    onValidate: (
        val: string | number | boolean | string[] | undefined,
        fieldName: string,
    ) => any;
    defaultValue?: string;
}

const ControlledInput: React.FC<IProps> = ({
    fieldName,
    control,
    Input,
    onValidate,
    defaultValue = '',
}: IProps) => {
    return (
        <Controller
            control={control}
            render={({
                field: {onChange, value},
                fieldState: {invalid, error},
            }) => {
                return (
                    <GenericInput
                        Input={Input}
                        errMsg={error?.message}
                        isValid={!invalid}
                        onChange={onChange}
                        value={value}
                    />
                );
            }}
            rules={{
                validate: value => onValidate(value, fieldName),
            }}
            name={fieldName}
            defaultValue={defaultValue}
        />
    );
};

export default ControlledInput;
