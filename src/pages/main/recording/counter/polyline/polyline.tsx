import React, {useCallback, useContext, useEffect, useRef} from 'react';
import {InteractionManager, Platform} from 'react-native';
import {Polyline as MapPolyline} from 'react-native-maps';

import {CounterDataContext} from '@pages/main/recording/counter/context/counterContext';
import {getFHorizontalPx} from '@theme/utils/appLayoutDimensions';

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
            polylineRef.current?.setNativeProps({
                coordinates: c,
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
            strokeWidth={getFHorizontalPx(8)}
            tappable={false}
        />
    );
};

export default Polyline;
