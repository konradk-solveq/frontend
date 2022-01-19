import React, {useState, useRef, useEffect, useCallback} from 'react';
import {StyleSheet, Platform, Dimensions, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Camera, LatLng} from 'react-native-maps';

import useAppState from '@hooks/useAppState';
import {useAppSelector} from '../../../../hooks/redux';
import {favouriteMapDataByIDSelector} from '../../../../storage/selectors/map';
import {getCurrentLocation} from '../../../../utils/geolocation';
import {DataI} from '@hooks/useLocalizationTracker';

import mapStyle from '../../../../sharedComponents/maps/styles';
import AnimSvg from '../../../../helpers/animSvg';

import GradientSvg from './gradientSvg';
import Polyline from './polyline/polyline';
import AnimatedMarker from './animatedMarker/AnimatedMarker';
import SinglePolyline from './polyline/singlePolyline';
import {useLocationProvider} from '@providers/staticLocationProvider/staticLocationProvider';
import {ShortCoordsType} from '@type/coords';
import {isLocationValidate} from '@utils/locationData';
import {getCenterCameraCoords} from '@src/utils/mapCameraAnimation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getAppLayoutConfig} from '@theme/appLayoutConfig';

type latType = {latitude: number; longitude: number};

const setLocationData = async (
    coords: {lat: number; lon: number} | undefined,
    setNewLocation: ({latitude, longitude}: latType) => void,
) => {
    const l = await getCurrentLocation('', 3);
    if (!l || !isLocationValidate(l)) {
        if (!coords) {
            return false;
        }
        const c = {
            latitude: coords.lat,
            longitude: coords.lon,
        };
        setNewLocation(c);
    }
    if (l?.coords) {
        const c = {
            latitude: l.coords.latitude,
            longitude: l.coords.longitude,
        };
        setNewLocation(c);
    }

    return true;
};

const isIOS = Platform.OS === 'ios';

interface IProps {
    routeId: string;
    trackerData: DataI | undefined;
    autoFindMe: number;
    headingOn: boolean;
    compassHeading: any;
    renderPath?: boolean;
    restoredPath?: ShortCoordsType[];
    autoFindMeSwith: (e: number) => void;
    beforeRecording: boolean;
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

const Map: React.FC<IProps> = ({
    routeId,
    trackerData,
    autoFindMe,
    headingOn,
    compassHeading,
    renderPath,
    restoredPath,
    autoFindMeSwith,
    beforeRecording,
}: IProps) => {
    const mapRef = useRef<MapView>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const cooldownRef = useRef<NodeJS.Timeout | null>(null);
    const mountedRef = useRef(false);
    const restoreRef = useRef(false);
    const locationSetRef = useRef(false);
    const isAnimatingCameraRef = useRef(false);
    const canAnimateRef = useRef(true);
    const pastDistanceRef = useRef<number | null>(null);

    const globalLocation = useLocationProvider()?.location;

    const {appStateVisible, appPrevStateVisible} = useAppState();
    const [showWebView, setShowWebView] = useState(false);
    const [showMap, setShowMap] = useState(false);

    const [cameraAnimCooldown, setCameraAnimCooldown] = useState(false);
    const {bottom} = useSafeAreaInsets();

    useEffect(() => {
        mountedRef.current = true;

        return () => {
            mountedRef.current = false;
        };
    }, []);

    useEffect(() => {
        if (
            appPrevStateVisible === 'active' &&
            appStateVisible === 'background'
        ) {
            restoreRef.current = false;
            canAnimateRef.current = false;
        }
    }, [appPrevStateVisible, appStateVisible]);

    /**
     * On background mode enable animation only for
     * significian distance difference
     */
    useEffect(() => {
        const distance = trackerData?.odometer || 0;
        if (!pastDistanceRef.current) {
            pastDistanceRef.current = distance;
            canAnimateRef.current = true;
            return;
        }
        if (pastDistanceRef.current + 200 <= distance) {
            pastDistanceRef.current = distance;
            canAnimateRef.current = true;
        }
    }, [trackerData?.odometer]);

    const mapData = useAppSelector(favouriteMapDataByIDSelector(routeId));

    const [location, setLocaion] = useState<LatLng | null>(null);
    const [foreignRoute, setForeignRoute] = useState<
        {latitude: number; longitude: number}[] | null
    >(null);

    useEffect(() => {
        if (!mountedRef.current || locationSetRef.current) {
            return;
        }

        const loc = async () => {
            if (globalLocation) {
                setLocaion(globalLocation);
                setShowMap(true);
            }

            const setLoc = await setLocationData(
                trackerData?.coords,
                setLocaion,
            );
            if (!setLoc) {
                return;
            }

            locationSetRef.current = true;
            setShowMap(true);
        };
        loc();
    }, [globalLocation, trackerData?.coords]);

    useEffect(() => {
        return () => {
            clearTimeout(timerRef.current as NodeJS.Timeout);
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

    const autoFindMeLastStateRef = useRef(0);
    /**
     * Backup location. If next will be undefined we use this one.
     */
    const peviousKnownLocation = useRef<LatLng | undefined>();

    /**
     * Deactivates cooldown system imidietly when findMeLocation btn has been triggered
     */
    useEffect(() => {
        if (autoFindMe) {
            isAnimatingCameraRef.current = false;
            setCameraAnimCooldown(false);
        }
    }, [autoFindMe]);

    const animateCam = useCallback(
        (animation: Partial<Camera>, duration: number, cooldown: boolean) => {
            mapRef.current?.animateCamera(animation, {duration: duration});

            if (cooldown) {
                setCameraAnimCooldown(true);
                cooldownRef.current = setTimeout(() => {
                    setCameraAnimCooldown(false);
                }, duration);
            }
        },
        [],
    );

    const animateCameraOnIOS = useCallback(
        async (animation: Partial<Camera>, cooldown: boolean) => {
            if (!isAnimatingCameraRef.current) {
                isAnimatingCameraRef.current = true;
                animateCam(animation, 850, cooldown);

                timerRef.current = setTimeout(
                    () => {
                        isAnimatingCameraRef.current = false;
                    },
                    headingOn ? 900 : 0,
                );
            }
        },
        [headingOn, animateCam],
    );

    const setMapCamera = useCallback(() => {
        if (cameraAnimCooldown) {
            return;
        }

        let animation: Partial<Camera> = {
            heading: headingOn ? compassHeading : 0,
        };
        let cooldown = false;
        if (autoFindMe > 0 && mapRef.current) {
            const updatedLocation = getCenterCameraCoords(
                trackerData?.coords,
                location,
                peviousKnownLocation.current,
            );
            if (updatedLocation) {
                animation.center = updatedLocation;

                peviousKnownLocation.current = updatedLocation;
            }

            animation.zoom = ZOOM_START_VALUE;
            cooldown = true;
        }
        autoFindMeLastStateRef.current = autoFindMe;

        if (isIOS) {
            animateCameraOnIOS(animation, cooldown);
        } else {
            animateCam(animation, 1000, cooldown);
        }
    }, [
        cameraAnimCooldown,
        headingOn,
        compassHeading,
        autoFindMe,
        trackerData,
        location,
        animateCam,
        animateCameraOnIOS,
    ]);

    /**
     * Disable animation when path is not rendered
     * (app is in background)
     */
    useEffect(() => {
        if (mountedRef.current && canAnimateRef.current) {
            setMapCamera();
        }
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
        canAnimateRef.current = true;
    };

    const handleCameraChange = useCallback(() => {
        autoFindMeSwith(0);
    }, [autoFindMeSwith]);

    /* TODO: error boundary */
    return showMap ? (
        <View>
            {showWebView && (
                <GradientSvg
                    style={[{top: -(getAppLayoutConfig.statusBarH() + bottom)}]}
                />
            )}
            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                customMapStyle={mapStyle}
                pitchEnabled={true}
                rotateEnabled={true}
                scrollEnabled={true}
                zoomEnabled={true}
                zoomTapEnabled={true}
                showsCompass={false}
                onPanDrag={handleCameraChange}
                onMapLoaded={() => {
                    setShowWebView(true);
                }}
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
                {mountedRef.current && location ? (
                    <AnimatedMarker
                        coords={trackerData?.coords}
                        mapRegion={mapRef?.current?.__lastRegion}
                        setLocation={onSetLocationHanlder}
                        isRestored={restoreRef.current}
                        setIsRestored={onSetIsRestoredHandler}
                        show={
                            !!(
                                (
                                    mapRef?.current &&
                                    mountedRef.current &&
                                    renderPath
                                ) //check if renderPath should stay
                            )
                        }
                        location={location}
                        headingOn={headingOn}
                        compassHeading={headingOn ? compassHeading : 0}
                    />
                ) : null}
                {!beforeRecording && trackerData?.coords ? (
                    <SinglePolyline
                        coords={trackerData}
                        renderPath={renderPath}
                        restoredPath={restoredPath}
                    />
                ) : null}
                {foreignRoute && (
                    <Polyline
                        coords={foreignRoute}
                        strokeColor="#3583e4"
                        strokeColors={['#3583e4']}
                    />
                )}
            </MapView>
        </View>
    ) : null;
};

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
    },
});

export default Map;
