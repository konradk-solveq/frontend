import React, {useContext, useEffect} from 'react';
import {TextStyle} from 'react-native';

import {CounterDataContext} from '../counterContext/counterContext';

import DisplayValue from '../displayValue/displayValue';

interface IProps {
    style?: TextStyle;
    fontSize?: number;
    beforeRecording: boolean;
}

const DisplaySpeed: React.FC<IProps> = ({
    style,
    fontSize,
    beforeRecording,
}: IProps) => {
    const speed = useContext(CounterDataContext).trackerData?.speed;

    return (
        <DisplayValue
            value={beforeRecording ? '0,0' : speed || '0,0'}
            suffix="km/h"
            style={style}
            fontSize={fontSize}
        />
    );
};

export default DisplaySpeed;
