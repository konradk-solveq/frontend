import React, {useRef} from 'react';
import {Marker} from 'react-native-maps';

import MarkerImageAndroid from '../../../../../assets/images/map_marker_android.png';

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
            opacity={showMarker ? 1 : 0}
            stopPropagation={true}
            anchor={{x: 0.5, y: 0.5}}
            centerOffset={{x: 0.5, y: 0}}
            // tracksViewChanges={isAndroid ? false : true}
            image={MarkerImageAndroid}
            coordinate={{
                latitude: lat,
                longitude: lng,
            }}
        />
    );
};

export default CustomMarker;
