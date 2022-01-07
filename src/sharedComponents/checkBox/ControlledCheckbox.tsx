import React from 'react';
import {Controller} from 'react-hook-form';
import CheckBox from '@sharedComponents/checkBox/checkBox';

type CheckBoxPropT = {
    name: string;
    disabled: boolean;
};

const ControlledCheckbox = ({name, disabled}: CheckBoxPropT) => {
    return (
        <Controller
            render={({field: {onChange, value}, fieldState: {invalid}}) => (
                <>
                    <CheckBox
                        checked={value}
                        wrong={invalid}
                        getCheck={onChange}
                        disabled={disabled}
                    />
                </>
            )}
            name={name}
        />
    );
};

export default ControlledCheckbox;
