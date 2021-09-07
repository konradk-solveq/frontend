import React, {useCallback, useContext, useEffect, useRef} from 'react';
import {InteractionManager, Platform} from 'react-native';
import {Polyline as MapPolyline} from 'react-native-maps';
import {CounterDataContext} from '../nativeCounter/counterContext/counterContext';

type ShortCoordsType = {
    latitude: number;
    longitude: number;
};

interface IProps {
    coords: ShortCoordsType[];
    strokeColor?: string;
    strokeColors?: string[];
}

const isIOS = Platform.OS === 'ios';

const getShortRoute = (c: ShortCoordsType[]) => {
    if (c?.length > 20000) {
        const newC: ShortCoordsType[] = [];

        for (let index = 0; index <= 20000; index++) {
            const l = c?.[c?.length - (index + 1)];
            if (l) {
                newC.unshift(l);
            }
        }

        return newC;
    }

    return c;
};

const Polyline: React.FC<IProps> = ({
    coords,
    strokeColor,
    strokeColors,
}: IProps) => {
    const currentLengthRef = useRef(0);
    const currentDistanceRef = useRef(0);

    const polylineRef = useRef<MapPolyline>(null);
    const odometer = useContext(CounterDataContext).trackerData?.odometer;

    const setCoords = (c: ShortCoordsType[]) => {
        if (polylineRef.current) {
            const cToAdd = getShortRoute(c);
            polylineRef.current?.setNativeProps({
                coordinates: cToAdd,
            });
        }
    };

    const setPolyline = useCallback(() => {
        if (coords?.length) {
            /**
             * Delay drawing new polyline because of performance issue
             */
            if (
                currentLengthRef?.current !== 0 &&
                currentLengthRef?.current + 8 > coords.length &&
                odometer &&
                currentDistanceRef.current !== 0 &&
                currentDistanceRef.current + 10 > odometer
            ) {
                return;
            }

            if (polylineRef.current) {
                setCoords(coords);
                currentLengthRef.current = coords.length;
                if (odometer) {
                    currentDistanceRef.current = odometer;
                }
            }
        }
    }, [coords, odometer]);

    useEffect(() => {
        if (isIOS) {
            setPolyline();
            return;
        }
        const task = InteractionManager.runAfterInteractions(setPolyline);

        return () => {
            task.cancel();
        };
    }, [setPolyline]);

    return (
        <MapPolyline
            ref={polylineRef}
            coordinates={[]}
            strokeColor={strokeColor || '#d8232a'}
            strokeColors={strokeColors || ['#d8232a']}
            lineCap={'round'}
            lineJoin={'round'}
            strokeWidth={8}
            tappable={false}
        />
    );
};

export default Polyline;
