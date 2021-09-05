import React, {useState, useRef, useEffect, useCallback} from 'react';
import {StyleSheet, Platform, Dimensions} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Camera, LatLng} from 'react-native-maps';

import useAppState from '@hooks/useAppState';
import {useAppSelector} from '../../../../hooks/redux';
import {favouriteMapDataByIDSelector} from '../../../../storage/selectors/map';
import {getCurrentLocation} from '../../../../utils/geolocation';

import mapStyle from '../../../../sharedComponents/maps/styles';
import AnimSvg from '../../../../helpers/animSvg';

import gradient from './gradientSvg';
import Polyline from './polyline/polyline';
import AnimatedMarker from './animatedMarker/AnimatedMarker';
import SinglePolyline from './polyline/singlePolyline';
import {useLocationProvider} from '@src/providers/staticLocationProvider/staticLocationProvider';

const isIOS = Platform.OS === 'ios';
const {width} = Dimensions.get('window');
interface IProps {
    routeId: string;
    trackerData: any;
    autoFindMe: boolean;
    headingOn: boolean;
    compassHeading: any;
    renderPath?: boolean;
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
}: IProps) => {
    const mapRef = useRef<MapView>(null);
    const mountedRef = useRef(false);
    const restoreRef = useRef(false);
    const globalLocation = useLocationProvider()?.location;

    const {appIsActive, appStateVisible} = useAppState();
    const [showWebView, setShowWebView] = useState(false);
    const [showMap, setShowMap] = useState(false);

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

    const mapData = useAppSelector(favouriteMapDataByIDSelector(routeId));

    const [location, setLocaion] = useState<LatLng | null>(null);
    const [foreignRoute, setForeignRoute] = useState<
        {latitude: number; longitude: number}[] | null
    >(null);
    const [autoFindMeLastState, setAutoFindMeLastState] = useState<boolean>(
        autoFindMe,
    );

    useEffect(() => {
        const loc = async () => {
            if (globalLocation) {
                setLocaion(globalLocation);
                setShowMap(true);
            }
            const l = await getCurrentLocation('', 1);
            if (l?.coords) {
                const c = {
                    latitude: l.coords.latitude,
                    longitude: l.coords.longitude,
                };
                setLocaion(c);
            }
            setShowMap(true);
        };
        loc();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                heading: headingOn ? compassHeading : 0,
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
    }, [autoFindMe, headingOn, trackerData?.coords, location, compassHeading]);

    useEffect(() => {
        setMapCamera();
    }, [setMapCamera]);
    console.log('location', location);
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

    /* TODO: error boundary */
    return showMap ? (
        <>
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
                        show={!!(mapRef?.current && mountedRef.current)}
                        location={location}
                        headingOn={headingOn}
                        compassHeading={compassHeading}
                    />
                ) : null}
                {trackerData?.coords ? (
                    <SinglePolyline
                        coords={trackerData}
                        renderPath={renderPath}
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
        </>
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
