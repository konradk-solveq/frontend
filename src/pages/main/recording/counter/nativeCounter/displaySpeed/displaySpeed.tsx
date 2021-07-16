import React, {useContext} from 'react';
import {TextStyle} from 'react-native';

import {CounterDataContext} from '../counterContext/counterContext';

import DisplayValue from '../displayValue/displayValue';

interface IProps {
    style?: TextStyle;
    fontSize?: number;
}

const DisplaySpeed: React.FC<IProps> = ({style, fontSize}: IProps) => {
    const speed = useContext(CounterDataContext)?.speed;

    return (
        <DisplayValue
            value={speed || '0,0'}
            suffix="km/h"
            style={style}
            fontSize={fontSize}
        />
    );
};

export default DisplaySpeed;