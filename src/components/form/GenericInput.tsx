import React from 'react';

import {FCPropsI} from '@components/types/form';

interface IProps extends FCPropsI {
    Input: React.FunctionComponent<FCPropsI>;
}

const GenericInput: React.FC<IProps> = ({Input, ...props}: IProps) => {
    return <Input {...props} />;
};
export default GenericInput;
