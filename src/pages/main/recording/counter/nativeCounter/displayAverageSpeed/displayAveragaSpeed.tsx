import React, {useContext} from 'react';

import {CounterDataContext} from '../counterContext/counterContext';

import DisplayValue from '../displayValue/displayValue';

const DisplayAverageSpeed: React.FC = () => {
    const averageSpeed = useContext(CounterDataContext)?.averageSpeed;

    return (
        <DisplayValue
            style={{marginLeft: 20}}
            value={averageSpeed || '0,0'}
            suffix="km/h"
        />
    );
};

export default DisplayAverageSpeed;
