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

const Polyline: React.FC<IProps> = ({
    coords,
    strokeColor,
    strokeColors,
}: IProps) => {
    const currentLengthRef = useRef(0);
    const currentDistanceRef = useRef(0);

    const polylineRef = useRef<MapPolyline>(null);
    const odometer = useContext(CounterDataContext).trackerData?.odometer;

    useEffect(() => {
        if (odometer) {
            currentDistanceRef.current = odometer;
        }
    }, [odometer]);

    const setCoords = (c: ShortCoordsType[]) => {
        if (polylineRef.current) {
            polylineRef.current?.setNativeProps({
                coordinates: c,
            });
        }
    };

    const setPolyline = useCallback(() => {
        if (coords?.length) {
            if (
                currentLengthRef?.current !== 0 &&
                currentLengthRef?.current + 5 > coords.length &&
                odometer &&
                currentDistanceRef.current + 20 > odometer
            ) {
                return;
            }

            if (polylineRef.current) {
                setCoords(coords);
                currentLengthRef.current = coords.length;
            }
        }
    }, [coords, odometer]);

    useEffect(() => {
        if (isIOS) {
            setPolyline();
            return;
        }
        InteractionManager.runAfterInteractions(setPolyline);
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
