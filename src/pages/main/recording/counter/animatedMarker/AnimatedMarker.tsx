import React, {useRef, useEffect, useCallback} from 'react';
import {Platform} from 'react-native';
import {
    Marker,
    MarkerAnimated,
    AnimatedRegion,
    LatLng,
} from 'react-native-maps';

import {getHorizontalPx} from '@helpers/layoutFoo';

import MarkPointer from '../markPointer';

const isIOS = Platform.OS === 'ios';

interface IProps {
    coords: any;
    mapRegion: {latitudeDelta?: number; longitudeDelta?: number};
    setLocation: (pos: LatLng) => void;
    isRestored: boolean;
    setIsRestored: () => void;
    show?: boolean;
    location?: LatLng | null;
}

const AnimatedMarker: React.FC<IProps> = ({
    coords,
    mapRegion,
    setLocation,
    isRestored,
    setIsRestored,
    show,
    location,
}: IProps) => {
    const markerRef = useRef<Marker>(null);

    const animatedMarkerRef = useRef<MarkerAnimated>(null);
    const animatedPostion = useRef<AnimatedRegion>(
        new AnimatedRegion({
            latitude: 51.023,
            longitude: 17.23,
            latitudeDelta: 0.0092,
            longitudeDelta: 0.0092,
        }),
    ).current;

    const setMarker = useCallback(async () => {
        if (coords?.lat && show) {
            const pos = {
                latitude: coords?.lat,
                longitude: coords?.lon,
            };

            let ratio = 1;
            const latitudeDelta = mapRegion?.latitudeDelta || 1;
            const longitudeDelta = mapRegion?.longitudeDelta || 1;
            if (typeof latitudeDelta !== 'undefined') {
                const zoom =
                    Math.log2(
                        360 * (getHorizontalPx(414) / 256 / latitudeDelta),
                    ) + 1;

                if (zoom > 17 && zoom < 20) {
                    ratio = -((zoom - 20) / 3);
                }
                if (zoom >= 20) {
                    ratio = 0;
                }
            }

            if (!isRestored) {
                setLocation(pos);
                markerRef.current?.redraw();

                setIsRestored();
                return;
            }

            if (!isIOS) {
                markerRef?.current?.animateMarkerToCoordinate(
                    pos,
                    1000 + 500 * ratio,
                );
            } else {
                animatedPostion
                    ?.timing({
                        ...pos,
                        latitudeDelta: latitudeDelta,
                        longitudeDelta: longitudeDelta,
                        duration: 1000 + 500 * ratio,
                        useNativeDriver: false,
                    })
                    .start();
            }
        }
    }, [
        coords,
        animatedPostion,
        mapRegion,
        show,
        setLocation,
        isRestored,
        setIsRestored,
    ]);

    useEffect(() => {
        setMarker();
    }, [setMarker]);

    if (isIOS) {
        if (!location && !animatedPostion) {
            return null;
        }

        return (
            <MarkerAnimated
                ref={animatedMarkerRef}
                anchor={{x: 0.5, y: 0.3}}
                coordinate={animatedPostion || location}>
                <MarkPointer />
            </MarkerAnimated>
        );
    }

    if (!location) {
        return null;
    }

    return (
        <Marker ref={markerRef} coordinate={location} anchor={{x: 0.3, y: 0.3}}>
            <MarkPointer />
        </Marker>
    );
};

export default AnimatedMarker;
