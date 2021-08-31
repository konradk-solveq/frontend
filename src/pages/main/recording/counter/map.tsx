import React, {useState, useRef, useEffect, useCallback} from 'react';
import {StyleSheet, Platform, Dimensions} from 'react-native';
import MapView, {
    PROVIDER_GOOGLE,
    Marker,
    MarkerAnimated,
    AnimatedRegion,
    Camera,
    LatLng,
} from 'react-native-maps';
import CompassHeading from 'react-native-compass-heading';

import useAppState from '@hooks/useAppState';
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

const initCompasHeading = {
    center: {
        latitude: 53.020817,
        longitude: 20.866278,
    },
    pitch: 0,
    altitude: 0,
    heading: 0,
    zoom: isIOS ? 18 : 17,
};
const ZOOM_START_VALUE = isIOS ? 18 : 17;

const Map: React.FC<IProps> = ({routeId, trackerData, autoFindMe}: IProps) => {
    const mapRef = useRef<MapView>(null);
    const markerRef = useRef<Marker>(null);
    const mountedRef = useRef(false);
    const compasHeadingdRef = useRef(0);
    const restoreRef = useRef(false);
    const animatedMarkerRef = useRef<MarkerAnimated>(null);

    const {appIsActive, appStateVisible} = useAppState();

    useEffect(() => {
        mountedRef.current = true;

        return () => {
            mountedRef.current = false;
        };
    }, []);

    useEffect(() => {
        if (!appIsActive && appStateVisible === 'background') {
            restoreRef.current = false;
        }
    }, [appIsActive, appStateVisible]);

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
    const [location, setLocaion] = useState<LatLng | null>(null);
    const [foreignRoute, setForeignRoute] = useState<
        {latitude: number; longitude: number}[] | null
    >(null);
    const [autoFindMeLastState, setAutoFindMeLastState] =
        useState<boolean>(autoFindMe);

    useEffect(() => {
        const loc = async () => {
            const l = await getCurrentLocation('', 1);
            if (l?.coords) {
                const c = {
                    latitude: l.coords.latitude,
                    longitude: l.coords.longitude,
                };
                setLocaion(c);
                animatedPostion?.setValue({
                    latitude: c.latitude,
                    longitude: c.longitude,
                    latitudeDelta: 0.0092,
                    longitudeDelta: 0.0092,
                });
            }
        };
        loc();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const degree_update_rate = 5;

        if (mountedRef.current) {
            CompassHeading.start(degree_update_rate, ({heading}) => {
                const lastHeading = compasHeadingdRef.current;
                compasHeadingdRef.current = heading;
                if (Math.abs(lastHeading - heading) >= degree_update_rate) {
                    setCompassHeading(heading);
                }
            });
        }

        return () => {
            CompassHeading.stop();
        };
    }, []);

    useEffect(() => {
        if (mapData?.path?.length && mountedRef.current) {
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
        const hasLocation = trackerData?.coords || location;
        const shouldResetZoom = autoFindMe !== autoFindMeLastState;

        if (mapRef.current && (hasLocation || shouldResetZoom)) {
            let animation: Partial<Camera> = {
                heading: compassHeading,
            };

            const coords = {latitude: 0, longitude: 0};
            if (trackerData?.coords) {
                coords.latitude = trackerData.coords.lat;
                coords.longitude = trackerData.coords.lon;
            } else if (location) {
                coords.latitude = location.latitude;
                coords.longitude = location.longitude;
            }

            if (hasLocation) {
                if (autoFindMe) {
                    animation.center = {
                        latitude: coords.latitude,
                        longitude: coords.longitude,
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
    }, [autoFindMe, trackerData?.coords, location, compassHeading]);

    const setMarker = useCallback(async () => {
        if (trackerData?.coords && mapRef?.current && mountedRef.current) {
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

            if (!restoreRef.current) {
                setLocaion(pos);
                markerRef.current?.redraw();

                restoreRef.current = true;
                return;
            }
            // restoreRef.current = true
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

    const cameraInitObj = {
        ...initCompasHeading,
        center: {
            latitude: location?.latitude || 53.020817,
            longitude: location?.longitude || 20.866278,
        },
        pitch: 0,
        altitude: 0,
        heading: compassHeading,
        zoom: ZOOM_START_VALUE,
    };

    const MarkerToDisplay =
        Platform.OS === 'android' ? (
            location && (
                <Marker
                    ref={markerRef}
                    coordinate={location}
                    anchor={{x: 0.3, y: 0.3}}>
                    <MarkPointer />
                </Marker>
            )
        ) : (
            <MarkerAnimated
                ref={animatedMarkerRef}
                anchor={{x: 0.5, y: 0.3}}
                coordinate={animatedPostion || location}>
                <MarkPointer />
            </MarkerAnimated>
        );

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
                        {mountedRef.current && MarkerToDisplay}
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
