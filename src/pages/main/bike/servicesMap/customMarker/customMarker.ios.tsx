import React, {useRef} from 'react';
import {Marker} from 'react-native-maps';

import MarkerSvg from './markerSvg';

interface IProps {
    lat: number;
    lng: number;
    showMarker: boolean;
    onPressMarker: () => void;
}

const CustomMarker: React.FC<IProps> = ({
    lat,
    lng,
    showMarker,
    onPressMarker,
}: IProps) => {
    const markerRef = useRef<Marker | null>();

    return (
        <Marker
            ref={markRef => (markerRef.current = markRef)}
            onPress={onPressMarker}
            opacity={showMarker ? 0 : 1}
            stopPropagation={true}
            anchor={{x: 0.5, y: 0.5}}
            centerOffset={{x: 0.5, y: 0}}
            tracksViewChanges={false}
            coordinate={{
                latitude: lat,
                longitude: lng,
            }}>
            <MarkerSvg />
        </Marker>
    );
};

export default CustomMarker;
