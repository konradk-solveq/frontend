import React, {useContext} from 'react';
import {TextStyle} from 'react-native';

import {CounterDataContext} from '../counterContext/counterContext';

import DisplayValue from '../displayValue/displayValue';

interface IProps {
    style?: TextStyle;
    fontSize?: number;
}

const DisplayDistance: React.FC<IProps> = ({style, fontSize}: IProps) => {
    const distance = useContext(CounterDataContext).trackerData?.distance;

    return (
        <DisplayValue
            value={distance || '0,00'}
            suffix="km"
            style={style}
            fontSize={fontSize}
        />
    );
};

export default DisplayDistance;
