import React, {useEffect, useRef, useState} from 'react';
import {Polyline as MapPolyline} from 'react-native-maps';

type ShortCoordsType = {
    latitude: number;
    longitude: number;
};

interface IProps {
    coords: ShortCoordsType[];
    strokeColor?: string;
    strokeColors?: string[];
}

const Polyline: React.FC<IProps> = ({
    coords,
    strokeColor,
    strokeColors,
}: IProps) => {
    const polylineRef = useRef<MapPolyline>(null);
    const [newCoords, setNewCoords] = useState<ShortCoordsType[]>([]);

    useEffect(() => {
        if (coords?.length) {
            setNewCoords(coords);
        }
    }, [coords]);

    return (
        <MapPolyline
            ref={polylineRef}
            coordinates={newCoords}
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
