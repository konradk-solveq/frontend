import React, {useEffect, useState, useCallback, useRef} from 'react';
import {getHorizontalPx} from '../../../../../../helpers/layoutFoo';
import useAppState from '../../../../../../hooks/useAppState';

import {convertToCounterFormat} from '../../../../../../utils/dateTime';
import DisplayValue from '../displayValue/displayValue';

interface IProps {
    time: Date | undefined;
    isRunning: boolean;
    style?: TextStyle;
    fontSize?: number;
}

const DisplayTimer: React.FC<IProps> = ({
    time,
    isRunning,
    style,
    fontSize,
}: IProps) => {
    const interval = useRef<NodeJS.Timeout | null>(null);
    const timerStartedRef = useRef(false);

    const [currentTime, setCurrentTime] = useState(0);

    const {appStateVisible} = useAppState();
    const [previousState, setPrevoiusState] = useState('active');

    useEffect(() => {
        setPrevoiusState(appStateVisible);
    }, [appStateVisible]);

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
        }

        return () => {
            clearInterval(interval.current as NodeJS.Timeout);
        };
    }, [isRunning]);

    const convertedTime = convertToCounterFormat(currentTime, time);

    return (
        <DisplayValue
            value={convertedTime.hoursWithMinutes || '00:00'}
            style={[
                {marginLeft: fontSize > 23 ? getHorizontalPx(30) : 0},
                style,
            ]}
            suffix={`:${convertedTime.dzSeconds}`}
            noSpace={true}
            fontSize={fontSize}
        />
    );
};

export default React.memo(DisplayTimer);
