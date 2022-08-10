import {useCallback, useEffect, useRef, useState} from 'react';

import useAppState from '@hooks/useAppState';
import {convertToCounterFormat} from '@utils/dateTime';

const useRecordingTimer = (
    time?: Date,
    isRunning?: boolean,
    pauseTime?: number,
) => {
    const interval = useRef<NodeJS.Timeout | null>(null);
    const timerStartedRef = useRef(false);
    const pauseTimeRef = useRef(0);

    const [currentTime, setCurrentTime] = useState(0);

    const {appStateVisible} = useAppState();
    const [previousState, setPrevoiusState] = useState('active');

    useEffect(() => {
        setPrevoiusState(appStateVisible);
    }, [appStateVisible]);

    useEffect(() => {
        if (pauseTime) {
            pauseTimeRef.current = pauseTime;
        }
    }, [pauseTime]);

    const startTimer = () => {
        setCurrentTime(Date.now());

        timerStartedRef.current = true;
    };

    const setTime = useCallback(() => {
        if (time) {
            startTimer();
        }
    }, [time]);

    useEffect(() => {
        if (
            appStateVisible === 'active' &&
            previousState === 'background' &&
            timerStartedRef.current
        ) {
            setTime();

            setPrevoiusState('active');
        }
    }, [appStateVisible, previousState, setTime]);

    useEffect(() => {
        if (isRunning) {
            startTimer();

            interval.current = setInterval(() => {
                setCurrentTime(prevTime => prevTime + 1000);
            }, 1000);
        } else {
            timerStartedRef.current = false;
        }

        return () => {
            clearInterval(interval.current as NodeJS.Timeout);
        };
    }, [isRunning]);

    const convertedTime = convertToCounterFormat(
        currentTime,
        pauseTimeRef.current,
        time,
    );

    /**
     * Returns hours and minutes as one value
     * and seconds as secoond
     */
    return convertedTime;
};

export default useRecordingTimer;
