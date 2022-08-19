import React, {useState, useRef, useEffect, useCallback} from 'react';
import {StyleSheet, Platform, View} from 'react-native';
import MapView, {
    PROVIDER_GOOGLE,
    PROVIDER_DEFAULT,
    Camera,
    LatLng,
} from 'react-native-maps';

import {globalLocationSelector} from '@storage/selectors';
import {RouteMapType} from '@models/places.model';
import useAppState from '@hooks/useAppState';
import {useAppDispatch, useAppSelector} from '../../../../hooks/redux';
import {fetchMapIfNotExistsLocally} from '@storage/actions/maps';
import {
    favouriteMapDataByIDSelector,
    mapDataByIDSelector,
} from '../../../../storage/selectors/map';
import {getCurrentLocation} from '../../../../utils/geolocation';
import {DataI} from '@hooks/useLocalizationTracker';

import mapStyle from '../../../../sharedComponents/maps/styles';

import Polyline from './polyline/polyline';
import AnimatedMarker from './animatedMarker/AnimatedMarker';
import SinglePolyline from './polyline/singlePolyline';
import {ShortCoordsType} from '@type/coords';
import {isLocationValidate} from '@utils/locationData';
import {getCenterCameraCoords} from '@src/utils/mapCameraAnimation';

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
    routeId?: string;
    trackerData: DataI | undefined;
    autoFindMe: number;
    headingOn: boolean;
    compassHeading: any;
    renderPath?: boolean;
    restoredPath?: ShortCoordsType[];
    autoFindMeSwith: (e: number) => void;
    beforeRecording: boolean;
    onMapRotation: (angle: number) => void;
    isPlanned?: boolean;
    onMapHeadingReset: () => void;
    resetMapToNorth?: boolean;
}

const initCompasHeading = {
    center: {
        latitude: 53.020817,
        longitude: 20.866278,
    },
    pitch: 0,
    altitude: 0,
    heading: 0,
    zoom: 17,
};
const ZOOM_START_VALUE = 17;

const Map: React.FC<IProps> = ({
    routeId = '',
    trackerData,
    autoFindMe,
    headingOn,
    compassHeading,
    renderPath,
    restoredPath,
    autoFindMeSwith,
    beforeRecording,
    isPlanned = false,
    onMapRotation,
    onMapHeadingReset,
    resetMapToNorth = false,
}: IProps) => {
    const mapRef = useRef<MapView>(null);
    const mapWasFetchedRef = useRef(false);
    const dispatch = useAppDispatch();
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const cooldownRef = useRef<NodeJS.Timeout | null>(null);
    const mountedRef = useRef(false);
    const restoreRef = useRef(false);
    const locationSetRef = useRef(false);
    const isAnimatingCameraRef = useRef(false);
    const canAnimateRef = useRef(true);
    const pastDistanceRef = useRef<number | null>(null);

    const globalLocation = useAppSelector(globalLocationSelector);

    const {appStateVisible, appPrevStateVisible} = useAppState();
    const [showMap, setShowMap] = useState(false);

    const [cameraAnimCooldown, setCameraAnimCooldown] = useState(false);

    useEffect(() => {
        mountedRef.current = true;

        return () => {
            mountedRef.current = false;
            canAnimateRef.current = false;

            clearTimeout(timerRef.current as NodeJS.Timeout);
            clearTimeout(cooldownRef.current as NodeJS.Timeout);
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

    const mapData = useAppSelector(
        isPlanned
            ? favouriteMapDataByIDSelector(routeId)
            : mapDataByIDSelector(routeId),
    );

    const [location, setLocaion] = useState<LatLng | null>(null);
    const [foreignRoute, setForeignRoute] = useState<
        {latitude: number; longitude: number}[] | null
    >(null);

    /**
     * If path not exists locally try to fetch it once
     */
    useEffect(() => {
        if (routeId && !mapData?.path && !mapWasFetchedRef.current) {
            dispatch(
                fetchMapIfNotExistsLocally(
                    routeId,
                    RouteMapType.BIKE_MAP,
                    true,
                ),
            );
            mapWasFetchedRef.current = true;
        }
    }, [dispatch, mapData?.path, routeId]);

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
        if (mapData?.path?.length && mountedRef.current && !foreignRoute) {
            const fRoute = mapData.path.map(e => {
                return {
                    latitude: e[0],
                    longitude: e[1],
                };
            });
            setForeignRoute(fRoute);
        }
    }, [mapData?.path, foreignRoute]);

    const autoFindMeLastStateRef = useRef(0);
    /**
     * Backup location. If next will be undefined we use this one.
     */
    const peviousKnownLocation = useRef<LatLng | undefined>();

    /**
     * Deactivates cooldown system imidietly when findMeLocation btn has been triggered
     */
    useEffect(() => {
        if (autoFindMe || resetMapToNorth) {
            isAnimatingCameraRef.current = false;
            setCameraAnimCooldown(false);
        }
    }, [autoFindMe, resetMapToNorth]);

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

    const setMapCamera = useCallback(
        (headingToNorth?: boolean) => {
            if (cameraAnimCooldown) {
                return;
            }

            let animation: Partial<Camera> = {
                heading: headingOn && !headingToNorth ? compassHeading : 0,
            };
            if (headingToNorth) {
                onMapHeadingReset();
            }

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
        },
        [
            cameraAnimCooldown,
            headingOn,
            compassHeading,
            autoFindMe,
            trackerData,
            location,
            animateCam,
            animateCameraOnIOS,
            onMapHeadingReset,
        ],
    );

    /**
     * Disable animation when path is not rendered
     * (app is in background)
     */
    useEffect(() => {
        if (mountedRef.current && canAnimateRef.current) {
            setMapCamera(resetMapToNorth);
        }
    }, [setMapCamera, resetMapToNorth]);

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

    const onSetLocationHanlder = useCallback((pos: LatLng) => {
        setLocaion(pos);
    }, []);

    const onSetIsRestoredHandler = useCallback(() => {
        restoreRef.current = true;
        canAnimateRef.current = true;
    }, []);

    const handleCameraChange = useCallback(
        _ => {
            setCameraAnimCooldown(true);
            autoFindMeSwith(0);
            mapRef?.current?.getCamera().then(camera => {
                if (camera.heading !== 0) {
                    onMapRotation(camera.heading);
                }
            });
        },
        [autoFindMeSwith, onMapRotation],
    );

    /* TODO: error boundary */
    return showMap ? (
        <View>
            <MapView
                ref={mapRef}
                provider={
                    process.env.JEST_WORKER_ID
                        ? PROVIDER_DEFAULT
                        : PROVIDER_GOOGLE
                } /* There is an issue during the tests when PROVIDER_GGOGLE is set */
                style={styles.map}
                customMapStyle={mapStyle}
                pitchEnabled={true}
                rotateEnabled={true}
                scrollEnabled={true}
                zoomEnabled={true}
                zoomTapEnabled={true}
                showsCompass={false}
                onPanDrag={handleCameraChange}
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
                        show={!!(mapRef?.current && mountedRef.current)}
                        location={location}
                        headingOn={headingOn}
                        compassHeading={compassHeading || 0}
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

export default React.memo(Map);
