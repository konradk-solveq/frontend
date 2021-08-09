import React, {useState, useRef, useEffect, useCallback} from 'react';
import {StyleSheet, Platform, Dimensions} from 'react-native';
import MapView, {
    PROVIDER_GOOGLE,
    Marker,
    MarkerAnimated,
    AnimatedRegion,
    Camera,
} from 'react-native-maps';
import {Coords} from 'react-native-background-geolocation-android';
import CompassHeading from 'react-native-compass-heading';

import {useAppSelector} from '../../../../hooks/redux';
import {favouriteMapDataByIDSelector} from '../../../../storage/selectors/map';
import {getCurrentLocation} from '../../../../utils/geolocation';

import mapStyle from '../../../../sharedComponents/maps/styles';
import AnimSvg from '../../../../helpers/animSvg';

import gradient from './gradientSvg';
import Polyline from './polyline/polyline';
import SinglePolyline from './polyline/singlePolyline';
import MarkPointer from './markPointer';
import {getHorizontalPx} from '../../../../helpers/layoutFoo';

const isIOS = Platform.OS === 'ios';
const {width} = Dimensions.get('window');
interface IProps {
    routeId: string;
    trackerData: any;
    autoFindMe: boolean;
}

const Map: React.FC<IProps> = ({routeId, trackerData, autoFindMe}: IProps) => {
    const mapRef = useRef<MapView>(null);
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

    const mapData = useAppSelector(favouriteMapDataByIDSelector(routeId));

    const [compassHeading, setCompassHeading] = useState(0);
    const [location, setLocaion] = useState<Coords | null>(null);
    const [foreignRoute, setForeignRoute] = useState<
        {latitude: number; longitude: number}[] | null
    >(null);
    const [autoFindMeLastState, setAutoFindMeLastState] =
        useState<boolean>(autoFindMe);

    const ZOOM_START_VALUE = isIOS ? 18 : 17;

    useEffect(() => {
        const loc = async () => {
            const l = await getCurrentLocation('', 1);
            if (l?.coords) {
                setLocaion(l.coords);
                animatedPostion?.setValue({
                    latitude: l.coords.latitude,
                    longitude: l.coords.longitude,
                    latitudeDelta: 0.0092,
                    longitudeDelta: 0.0092,
                });
            }
        };
        loc();
    }, []);

    useEffect(() => {
        if (mapData?.path?.length) {
            const fRoute = mapData.path.map(e => {
                return {
                    latitude: e[0],
                    longitude: e[1],
                };
            });
            setForeignRoute(fRoute);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const setMapCamera = useCallback(() => {
        if (
            mapRef.current &&
            (autoFindMe !== autoFindMeLastState || trackerData?.coords)
        ) {
            let animation: Partial<Camera> = {};

            if (trackerData?.coords) {
                animation.heading = compassHeading;

                if (autoFindMe) {
                    animation.center = {
                        latitude: trackerData.coords.lat,
                        longitude: trackerData.coords.lon,
                    };
                }
            }

            if (autoFindMe != autoFindMeLastState) {
                if (autoFindMe) {
                    animation.zoom = ZOOM_START_VALUE;
                }
                setAutoFindMeLastState(autoFindMe);
            }

            mapRef.current?.animateCamera(animation, {duration: 1000});
        }
    }, [autoFindMe, trackerData?.coords, compassHeading]);

    const setMarker = useCallback(() => {
        if (trackerData?.coords && mapRef?.current) {
            const pos = {
                latitude: trackerData.coords.lat,
                longitude: trackerData.coords.lon,
            };

            let ratio = 1;
            const latitudeDelta =
                mapRef?.current?.__lastRegion?.latitudeDelta || 1;
            const longitudeDelta =
                mapRef?.current?.__lastRegion?.longitudeDelta || 1;
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

            if (Platform.OS === 'android') {
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
    }, [trackerData?.coords, animatedPostion]);

    useEffect(() => {
        setMapCamera();
    }, [setMapCamera]);

    useEffect(() => {
        setMarker();
    }, [setMarker]);

    useEffect(() => {
        const degree_update_rate = 3;

        CompassHeading.start(degree_update_rate, ({heading}) => {
            setCompassHeading(heading);
        });

        return () => {
            CompassHeading.stop();
        };
    }, []);

    const cameraInitObj = {
        center: {
            latitude: location?.latitude || 53.020817,
            longitude: location?.longitude || 20.866278,
        },
        pitch: 0,
        altitude: 0,
        heading: compassHeading,
        zoom: ZOOM_START_VALUE,
    };

    return (
        <>
            {location && (
                <>
                    <AnimSvg style={styles.gradient} source={gradient} />
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        customMapStyle={mapStyle}
                        pitchEnabled={true}
                        ref={mapRef}
                        rotateEnabled={true}
                        scrollEnabled={true}
                        zoomEnabled={true}
                        zoomTapEnabled={true}
                        showsCompass={false}
                        {...(!isIOS && {
                            initialCamera: cameraInitObj,
                        })}
                        {...(isIOS && {
                            onLayout: () => {
                                if (mapRef.current) {
                                    mapRef.current?.setCamera(cameraInitObj);
                                }
                            },
                        })}>
                        {Platform.OS === 'android' ? (
                            <Marker
                                ref={markerRef}
                                coordinate={location}
                                anchor={{x: 0.3, y: 0.3}}>
                                <MarkPointer />
                            </Marker>
                        ) : (
                            <MarkerAnimated
                                ref={animatedMarkerRef}
                                anchor={{x: 0.5, y: 0.3}}
                                coordinate={animatedPostion || location}>
                                <MarkPointer />
                            </MarkerAnimated>
                        )}
                        {trackerData?.coords && (
                            <SinglePolyline coords={trackerData} />
                        )}
                        {foreignRoute && (
                            <Polyline
                                coords={foreignRoute}
                                strokeColor="#3583e4"
                                strokeColors={['#3583e4']}
                            />
                        )}
                    </MapView>
                </>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
    },
    gradient: {
        position: 'absolute',
        width: width,
        height: width,
        top: 0,
        left: 0,
        zIndex: 1,
    },
});

export default Map;
