import React, {useEffect, useState} from 'react';

import {convertToCounterFormat} from '../../../../../../utils/dateTime';

import DisplayValue from '../displayValue/displayValue';

interface IProps {
    time: Date;
    isRunning: boolean;
}

const DisplayTimer: React.FC<IProps> = ({time, isRunning}: IProps) => {
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        const startTime = time ? Date.parse(time.toUTCString()) : null;
        if (startTime) {
            setCurrentTime(Date.now() - startTime);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isRunning) {
            const interval = setInterval(() => {
                setCurrentTime(prevTime => prevTime + 1000);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isRunning]);

    return (
        <DisplayValue
            value={
                convertToCounterFormat(currentTime).hoursWithMinutes || '00:00'
            }
            suffix={`:${convertToCounterFormat(currentTime).dzSeconds}`}
            noSpace
        />
    );
};

export default DisplayTimer;
