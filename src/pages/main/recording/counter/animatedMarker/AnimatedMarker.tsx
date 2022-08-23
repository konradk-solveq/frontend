import React, {useRef, useEffect, useCallback} from 'react';
import {
    MapMarker,
    MarkerAnimated,
    AnimatedRegion,
    LatLng,
} from 'react-native-maps';

import {isIOS} from '@utils/platform';
import {LocationIconSvg} from '@components/svg';
import colors from '@theme/colors';

const ANIMATION_DURATION = 500;

interface IProps {
    coords: any;
    mapRegion: {latitudeDelta?: number; longitudeDelta?: number};
    setLocation: (pos: LatLng) => void;
    isRestored: boolean;
    setIsRestored: () => void;
    show?: boolean;
    location?: LatLng | null;
    compassHeading: number;
    headingOn?: boolean;
}

const AnimatedMarker: React.FC<IProps> = ({
    coords,
    mapRegion,
    setLocation,
    isRestored,
    setIsRestored,
    show,
    location,
    headingOn,
    compassHeading,
}: IProps) => {
    const markerRef = useRef<MapMarker>(null);
    const canAnimateIOSMarker = useRef(true);

    const animatedMarkerRef = useRef<MapMarker>(null);
    const animatedPostion = useRef<AnimatedRegion>(
        new AnimatedRegion({
            latitude: 51.023,
            longitude: 17.23,
            latitudeDelta: 0.0092,
            longitudeDelta: 0.0092,
        }),
    ).current;

    useEffect(() => {
        if (isIOS && isRestored && markerRef.current) {
            markerRef.current?.redraw();
        }
    }, [isRestored]);

    const setMarker = useCallback(async () => {
        if (coords?.lat && show) {
            const pos = {
                latitude: coords?.lat,
                longitude: coords?.lon,
            };

            // let ratio = 1;
            const latitudeDelta = mapRegion?.latitudeDelta || 1;
            const longitudeDelta = mapRegion?.longitudeDelta || 1;
            // if (typeof latitudeDelta !== 'undefined') {
            //     const zoom =
            //         Math.log2(
            //             360 * (getHorizontalPx(414) / 256 / latitudeDelta),
            //         ) +
            //         1; /* TODO: this won't work since props are always undefined */

            //     if (zoom > 17 && zoom < 20) {
            //         ratio = -((zoom - 20) / 3);
            //     }
            //     if (zoom >= 20) {
            //         ratio = 0;
            //     }
            // }

            if (
                !isRestored &&
                (markerRef.current || animatedMarkerRef.current)
            ) {
                setLocation(pos);
                if (markerRef.current) {
                    markerRef.current?.redraw();
                }

                setIsRestored();
                return;
            }

            if (!isIOS) {
                markerRef?.current?.animateMarkerToCoordinate(
                    pos,
                    ANIMATION_DURATION,
                );
            } else {
                if (canAnimateIOSMarker.current) {
                    canAnimateIOSMarker.current = false;
                    animatedPostion
                        ?.timing({
                            ...pos,
                            latitudeDelta: latitudeDelta,
                            longitudeDelta: longitudeDelta,
                            duration: ANIMATION_DURATION,
                            useNativeDriver: false,
                            toValue: 0,
                        })
                        .start(({finished}) => {
                            if (finished) {
                                canAnimateIOSMarker.current = true;
                            }
                        });
                }
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

    /**
     * Initial marker coords for IOS
     */
    useEffect(() => {
        if (isIOS && location) {
            const pos = {
                latitude: location?.latitude,
                longitude: location?.longitude,
            };
            animatedPostion
                ?.timing({
                    ...pos,
                    latitudeDelta: 1,
                    longitudeDelta: 1,
                    duration: 50,
                    useNativeDriver: false,
                    toValue: 0,
                })
                .start(({finished}) => {
                    if (finished) {
                        canAnimateIOSMarker.current = true;
                    }
                });
        }

        return () => {
            animatedPostion?.stopAnimation(regionToStop => {
                console.log('Stoped animation of MarkerAnimated', regionToStop);
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isIOS) {
        if (!location && !animatedPostion) {
            return null;
        }

        return (
            <MarkerAnimated
                ref={animatedMarkerRef}
                identifier="direction_arrow"
                anchor={{x: 0.5, y: 0.5}}
                coordinate={animatedPostion?.__getValue()}
                tracksViewChanges={true}
                stopPropagation
                tracksInfoWindowChanges={false}
                rotation={!headingOn ? compassHeading : 0}>
                <LocationIconSvg color={colors.black} />
            </MarkerAnimated>
        );
    }

    if (!location) {
        return null;
    }

    return (
        <MapMarker
            ref={markerRef}
            identifier="direction_arrow"
            coordinate={location}
            anchor={{x: 0.5, y: 0.6}}
            rotation={!headingOn ? compassHeading : 0}>
            <LocationIconSvg color={colors.black} />
        </MapMarker>
    );
};

export default React.memo(AnimatedMarker);
