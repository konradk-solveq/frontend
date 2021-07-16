import React, {useContext} from 'react';
import {TextStyle} from 'react-native';
import {getHorizontalPx} from '../../../../../../helpers/layoutFoo';
import {getAverageSpeedFromDistanceAndTime} from '../../../../../../utils/speed';

import {CounterDataContext} from '../counterContext/counterContext';

import DisplayValue from '../displayValue/displayValue';

interface IProps {
    time: Date;
    style?: TextStyle;
    fontSize?: number;
}

const DisplayAverageSpeed: React.FC<IProps> = ({
    time,
    style,
    fontSize,
}: IProps) => {
    const distance = useContext(CounterDataContext)?.odometer || 0;
    const cTime = Date.parse(time.toUTCString());

    const averageSpeed = getAverageSpeedFromDistanceAndTime(distance, cTime, 0);

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
