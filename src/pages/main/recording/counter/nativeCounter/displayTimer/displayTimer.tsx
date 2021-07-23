import React, {useEffect, useState, useCallback} from 'react';
import {TextStyle} from 'react-native';
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
    const [currentTime, setCurrentTime] = useState(0);

    const {appIsActive, appStateVisible} = useAppState();
    const [previousState, setPrevoiusState] = useState(appStateVisible);

    useEffect(() => {
        setPrevoiusState(appStateVisible);
    }, [appStateVisible]);

    const setTime = useCallback(() => {
        const startTime = time ? Date.parse(time.toUTCString()) : null;
        if (startTime) {
            setCurrentTime(Date.now() - startTime);
        }
    }, [time]);

    useEffect(() => {
        setTime();
    }, [setTime]);

    useEffect(() => {
        if (appIsActive && previousState === 'background') {
            setTime();

            setPrevoiusState('active');
        }
    }, [appIsActive, previousState, setTime]);

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
            style={[
                {marginLeft: fontSize > 23 ? getHorizontalPx(30) : 0},
                style,
            ]}
            suffix={`:${convertToCounterFormat(currentTime).dzSeconds}`}
            noSpace={true}
            fontSize={fontSize}
        />
    );
};

export default React.memo(DisplayTimer);
