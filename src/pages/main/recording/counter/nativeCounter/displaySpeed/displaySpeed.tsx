import React, {useContext} from 'react';

import {CounterDataContext} from '../counterContext/counterContext';

import DisplayValue from '../displayValue/displayValue';

const DisplaySpeed: React.FC = () => {
    const speed = useContext(CounterDataContext)?.speed;

    return <DisplayValue value={speed || '0,0'} suffix="km/h" />;
};

export default DisplaySpeed;
