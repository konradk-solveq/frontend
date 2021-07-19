import React, {useEffect, useRef} from 'react';
import {Polyline as MapPolyline} from 'react-native-maps';

type ShortCoordsType = {
    latitude: number;
    longitude: number;
};

interface IProps {
    coords: ShortCoordsType[];
}

const Polyline: React.FC<IProps> = ({coords}: IProps) => {
    const polylineRef = useRef<MapPolyline>(null);

    useEffect(() => {
        if (coords?.length) {
            const t = setTimeout(() => {
                if (polylineRef.current) {
                    polylineRef.current.setNativeProps({
                        coordinates: coords,
                    });
                }
            }, 400);
            return () => {
                clearTimeout(t);
            };
        }
    }, [coords]);

    return (
        <MapPolyline
            ref={polylineRef}
            coordinates={[]}
            strokeColor="#d8232a"
            strokeColors={['#d8232a']}
            lineCap={'round'}
            lineJoin={'round'}
            strokeWidth={8}
            tappable={false}
        />
    );
};

export default Polyline;
