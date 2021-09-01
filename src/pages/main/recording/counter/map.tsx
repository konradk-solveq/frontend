import React, {
    useState,
    useRef,
    useEffect,
    useCallback,
    useContext,
} from 'react';
import {StyleSheet, Platform, Dimensions} from 'react-native';
import MapView, {
    PROVIDER_GOOGLE,
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
import {CounterDataContext} from './nativeCounter/counterContext/counterContext';
import AnimatedMarker from './animatedMarker/AnimatedMarker';

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
    const mountedRef = useRef(false);
    const compasHeadingdRef = useRef(0);
    const restoreRef = useRef(false);

    const routeData = useContext(CounterDataContext).treackerDataAgregator;

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
    const [autoFindMeLastState, setAutoFindMeLastState] = useState<boolean>(
        autoFindMe,
    );

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

            if (autoFindMe !== autoFindMeLastState) {
                if (autoFindMe) {
                    animation.zoom = ZOOM_START_VALUE;
                }
                setAutoFindMeLastState(autoFindMe);
            }

            mapRef.current?.animateCamera(animation, {duration: 1000});
        }
    }, [
        autoFindMe,
        autoFindMeLastState,
        trackerData?.coords,
        location,
        compassHeading,
    ]);

    useEffect(() => {
        setMapCamera();
    }, [setMapCamera]);

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

    const onSetLocationHanlder = (pos: LatLng) => {
        setLocaion(pos);
    };

    const onSetIsRestoredHandler = () => {
        restoreRef.current = true;
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
                        {mountedRef.current && (
                            <AnimatedMarker
                                coords={trackerData?.coords}
                                mapRegion={mapRef?.current?.__lastRegion}
                                setLocation={onSetLocationHanlder}
                                isRestored={restoreRef.current}
                                setIsRestored={onSetIsRestoredHandler}
                                show={!!(mapRef?.current && mountedRef.current)}
                                location={location}
                            />
                        )}
                        {trackerData?.coords && (
                            // <SinglePolyline coords={trackerData} />
                            <Polyline coords={routeData} />
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
