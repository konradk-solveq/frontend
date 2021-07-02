import React, {useContext} from 'react';

import {CounterDataContext} from '../counterContext/counterContext';

import DisplayValue from '../displayValue/displayValue';

const DisplayDistance: React.FC = () => {
    const distance = useContext(CounterDataContext)?.distance;

    return <DisplayValue value={distance || '0,00'} suffix="km" />;
};

export default DisplayDistance;
