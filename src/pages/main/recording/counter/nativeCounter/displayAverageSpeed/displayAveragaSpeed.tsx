import React, {useContext} from 'react';
import {TextStyle} from 'react-native';

import {CounterDataContext} from '../counterContext/counterContext';

import DisplayValue from '../displayValue/displayValue';

interface IProps {
    style?: TextStyle;
    fontSize?: number;
}

const DisplayAverageSpeed: React.FC<IProps> = ({style, fontSize}: IProps) => {
    const averageSpeed = useContext(CounterDataContext)?.averageSpeed;

    return (
        <DisplayValue
            style={[{marginLeft: fontSize > 23 ? 20 : 0}, style]}
            value={averageSpeed || '0,0'}
            suffix="km/h"
            fontSize={fontSize}
        />
    );
};

export default DisplayAverageSpeed;
