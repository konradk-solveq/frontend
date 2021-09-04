import React, {useCallback, useContext, useEffect, useRef} from 'react';
import {InteractionManager, Platform} from 'react-native';
import {Polyline as MapPolyline} from 'react-native-maps';
import {CounterDataContext} from '../nativeCounter/counterContext/counterContext';

type ShortCoordsType = {
    latitude: number;
    longitude: number;
};

interface IProps {
    coords?: ShortCoordsType[];
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
    const polylineRef = useRef<MapPolyline>(null);
    const routeData = useContext(CounterDataContext).treackerDataAgregator;

    const setCoords = (c: ShortCoordsType[]) => {
        if (polylineRef.current) {
            polylineRef.current?.setNativeProps({
                coordinates: c,
            });
        }
    };

    const setPolyline = useCallback(() => {
        if (coords?.length) {
            if (polylineRef.current) {
                setCoords(coords);
            }
        } else if (routeData?.length) {
            if (
                currentLengthRef?.current !== 0 &&
                currentLengthRef?.current + 5 > routeData.length
            ) {
                return;
            }

            if (polylineRef.current) {
                setCoords(routeData);
                currentLengthRef.current = routeData.length;
            }
        }
    }, [coords, routeData]);

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
