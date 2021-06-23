import React from 'react';
import {Controller, Control} from 'react-hook-form';
import {SelectI} from '../../../../../../models/map.model';
import GenericInput from './genericInput';
import {FCPropsI, FormData} from './types';

interface IProps {
    fieldName: keyof FormData;
    control: Control<FormData>;
    Input: React.FunctionComponent<FCPropsI>;
    onValidate: (
        val: string | number | boolean | SelectI | undefined,
        fieldName: string,
    ) => any;
}

const ControlledInput: React.FC<IProps> = ({
    fieldName,
    control,
    Input,
    onValidate,
}: IProps) => {
    return (
        <Controller
            control={control}
            render={({
                field: {onChange, onBlur, value, name},
                formState: {errors},
            }) => {
                const errMsg = errors?.[name]?.message;
                const isValid = !errMsg && !!value;

                return (
                    <GenericInput
                        Input={Input}
                        errMsg={errMsg}
                        isValid={isValid}
                        onChange={onChange}
                        value={value}
                    />
                );
            }}
            rules={{
                validate: value => onValidate(value, fieldName),
            }}
            name={fieldName}
            defaultValue=""
        />
    );
};

export default ControlledInput;
