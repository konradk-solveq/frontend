import React, {useContext} from 'react';
import {TextStyle} from 'react-native';
import {getHorizontalPx} from '../../../../../../helpers/layoutFoo';
import {getAverageSpeedFromDistanceAndTime} from '../../../../../../utils/speed';

import {CounterDataContext} from '../counterContext/counterContext';

import DisplayValue from '../displayValue/displayValue';

interface IProps {
    time: Date | undefined;
    style?: TextStyle;
    fontSize?: number;
}

const DisplayAverageSpeed: React.FC<IProps> = ({
    time,
    style,
    fontSize,
}: IProps) => {
    const distance = useContext(CounterDataContext).trackerData?.odometer || 0;

    const pauseTime = useContext(CounterDataContext).pauseTime;
    const cTime = time ? Date.parse(time.toUTCString()) : 0;

    const averageSpeed = getAverageSpeedFromDistanceAndTime(
        distance,
        cTime,
        pauseTime,
    );

    return (
        <DisplayValue
            style={[
                {marginLeft: fontSize > 23 ? getHorizontalPx(30) : 0},
                style,
            ]}
            value={averageSpeed || '0,0'}
            suffix="km/h"
            fontSize={fontSize}
        />
    );
};

export default DisplayAverageSpeed;
