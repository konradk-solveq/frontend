import React, {useCallback, useContext, useEffect, useRef} from 'react';
import {InteractionManager, Platform} from 'react-native';
import {Polyline as MapPolyline} from 'react-native-maps';
import {CounterDataContext} from '../nativeCounter/counterContext/counterContext';

import {Decimate_STTrace} from '@solveq/path-decimation-sttrace';
import {GeoPoint} from '@solveq/path-decimation-prelude';

type ShortCoordsType = {
    latitude: number;
    longitude: number;
    timestamp?: number;
};

interface IProps {
    coords: ShortCoordsType[];
    strokeColor?: string;
    strokeColors?: string[];
}

const isIOS = Platform.OS === 'ios';

const toGeoPoint = (data: ShortCoordsType) => {
    let date = data.timestamp ? new Date(data.timestamp) : new Date();
    const newPoint = new GeoPoint(data.latitude, data.longitude, date);
    return newPoint;
};

const getCompresionRatio = (length?: number) => {
    if (!length || length < 1000) {
        return 1.0;
    }

    if (length < 3000) {
        return 0.7;
    }

    if (length < 5000) {
        return 0.5;
    }

    return 0.3;
};

const getShortRoute = (c: ShortCoordsType[]) => {
    const ratio = getCompresionRatio(c?.length);
    console.log('[c length ----------]', ratio, c?.length, ratio < 1);

    if (ratio < 1) {
        const specialData = c.map(toGeoPoint).filter((r: GeoPoint | null) => r);

        const decimatedPath: ShortCoordsType[] = Decimate_STTrace(0.5)(
            specialData,
        ).map(gp => {
            return {
                latitude: gp.getLatitude(),
                longitude: gp.getLongitude(),
            };
        });

        console.log('[shorter c]', decimatedPath?.length);
        return decimatedPath;
    }

    return c;
};

const items = ['red', 'blue', 'green'];
const color = items[Math.floor(Math.random() * items.length)];

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
            strokeColor={color || '#d8232a'}
            strokeColors={items || ['#d8232a']}
            lineCap={'round'}
            lineJoin={'round'}
            strokeWidth={8}
            tappable={false}
        />
    );
};

export default Polyline;
