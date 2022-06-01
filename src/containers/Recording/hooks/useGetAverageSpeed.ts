import {useContext, useEffect, useRef} from 'react';

import {CounterDataContext} from '@pages/main/recording/counter/context/counterContext';
import {getAverageSpeedFromDistanceAndTime} from '@utils/speed';

const useGetAverageSpeed = (startTime?: Date, started?: boolean) => {
    const previusAverageSpeedRef = useRef('0.0');
    const odometer = useContext(CounterDataContext).trackerData?.odometer || 0;

    const pauseTime = useContext(CounterDataContext).pauseTime;
    const st = startTime ? Date.parse(startTime.toUTCString()) : 0;

    const averageSpeed =
        getAverageSpeedFromDistanceAndTime(odometer, st, pauseTime) || '0.0';

    useEffect(() => {
        if (started) {
            previusAverageSpeedRef.current = averageSpeed;
        }
    }, [started, averageSpeed]);

    return started ? averageSpeed : previusAverageSpeedRef.current;
};

export default useGetAverageSpeed;
