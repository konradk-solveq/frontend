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

import gradient from './gradientSvg';
import Polyline from './polyline/polyline';
import AnimatedMarker from './animatedMarker/AnimatedMarker';
import SinglePolyline from './polyline/singlePolyline';
import {useLocationProvider} from '@providers/staticLocationProvider/staticLocationProvider';
import {ShortCoordsType} from '@type/coords';
import {isLocationValidate} from '@utils/locationData';

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
const {width} = Dimensions.get('window');

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
    const mountedRef = useRef(false);
    const restoreRef = useRef(false);
    const locationSetRef = useRef(false);
    const isAnimatingCameraRef = useRef(false);

    const globalLocation = useLocationProvider()?.location;

    const {appStateVisible, appPrevStateVisible} = useAppState();
    const [showWebView, setShowWebView] = useState(false);
    const [showMap, setShowMap] = useState(false);

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
        }
    }, [appPrevStateVisible, appStateVisible]);

    const mapData = useAppSelector(favouriteMapDataByIDSelector(routeId));

    const [location, setLocaion] = useState<LatLng | null>(null);
    const [foreignRoute, setForeignRoute] = useState<
        {latitude: number; longitude: number}[] | null
    >(null);
    const [autoFindMeLastState, setAutoFindMeLastState] = useState<number>(
        autoFindMe,
    );

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

    const animateCam = (animation: Partial<Camera>, duration?: number) => {
        mapRef.current?.animateCamera(animation, {duration: duration || 1000});
    };

    const animateCameraOnIOS = useCallback(
        async (animation: Partial<Camera>) => {
            if (!isAnimatingCameraRef.current) {
                isAnimatingCameraRef.current = true;
                animateCam(animation, 850);

                timerRef.current = setTimeout(
                    () => {
                        isAnimatingCameraRef.current = false;
                    },
                    headingOn ? 900 : 0,
                );
            }
        },
        [headingOn],
    );

    const setMapCamera = useCallback(() => {
        let animation: Partial<Camera> = {
            heading: headingOn ? compassHeading : 0,
        };

        if (autoFindMe > 0 && mapRef.current) {
            if ((trackerData && trackerData.coords) || location) {
                if (trackerData && trackerData.coords) {
                    animation.center = {
                        latitude: trackerData.coords.lat,
                        longitude: trackerData.coords.lon,
                    };
                } else if (location) {
                    animation.center = {
                        latitude: location.latitude,
                        longitude: location.longitude,
                    };
                }
            }

            if (autoFindMe !== autoFindMeLastState) {
                animation.zoom = ZOOM_START_VALUE;
            }
            setAutoFindMeLastState(autoFindMe);
        }

        if (isIOS) {
            animateCameraOnIOS(animation);
        } else {
            animateCam(animation);
        }
    }, [
        location,
        autoFindMe,
        headingOn,
        compassHeading,
        trackerData,
        animateCameraOnIOS,
        autoFindMeLastState,
    ]);

    /**
     * Disable animation when path is not rendered
     * (app is in background)
     */
    useEffect(() => {
        if (mountedRef.current && restoreRef.current) {
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
    };

    const handleCameraChange = e => {
        autoFindMeSwith(0);
    };

    /* TODO: error boundary */
    return showMap ? (
        <View>
            {showWebView && (
                <AnimSvg style={styles.gradient} source={gradient} />
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
                onPanDrag={(e: any) => handleCameraChange(e)}
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
                        compassHeading={compassHeading}
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
