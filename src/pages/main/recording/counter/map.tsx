import React, {useState, useRef, useEffect, useCallback} from 'react';
import {StyleSheet, Platform, Dimensions} from 'react-native';
import MapView, {PROVIDER_GOOGLE, MapPolylineProps} from 'react-native-maps';
import {Coords} from 'react-native-background-geolocation-android';
import CompassHeading from 'react-native-compass-heading';

import {useAppSelector} from '../../../../hooks/redux';
import {favouriteMapDataByIDSelector} from '../../../../storage/selectors/map';
import {getCurrentLocation} from '../../../../utils/geolocation';
import useAppState from '../../../../hooks/useAppState';
import {routesDataToPersist} from '../../../../utils/transformData';
import {trackerRouteIdSelector} from '../../../../storage/selectors/routes';

import mapStyle from '../../../../sharedComponents/maps/styles';
import deepCopy from '../../../../helpers/deepCopy';
import AnimSvg from '../../../../helpers/animSvg';

import gradient from './gradientSvg';
import {getCurrentRoutePathById} from '../../../../utils/routePath';
import InitialPolyline from './polyline/initialPolyline';
import Polyline from './polyline/polyline';
import MultiPolyline from './polyline/multiPolyline';

const isIOS = Platform.OS === 'ios';
const {width} = Dimensions.get('window');
interface IProps {
    routeId: string;
    trackerData: any;
    routeNumber: number;
    isRecordingActive: boolean;
}

const Map: React.FC<IProps> = ({routeId, trackerData, routeNumber}: IProps) => {
    const mapRef = useRef<MapView>(null);
    // const polylineRef = useRef<Polyline>(null);

    const currentRouteId = useAppSelector(trackerRouteIdSelector);
    const mapData = useAppSelector(favouriteMapDataByIDSelector(routeId));
    const [mapReady, setMapReady] = useState(false);

    const [compassHeading, setCompassHeading] = useState(0);
    const [location, setLocaion] = useState<Coords | null>(null);
    const [foreignRoute, setForeignRoute] = useState<
        {latitude: number; longitude: number}[] | null
    >(null);
    const [restored, setRestored] = useState(false);
    const [myRoute, setMyRoute] = useState<
        {latitude: number; longitude: number}[]
    >([]);

    // const {appIsActive} = useAppState();

    useEffect(() => {
        const loc = async () => {
            const l = await getCurrentLocation('', 1);
            setLocaion(l.coords);
        };
        loc();
    }, []);

    useEffect(() => {
        if (mapData) {
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

    useEffect(() => {
        // if (trackerData?.coords && mapRef.current && restored) {
        //     const pos = {
        //         latitude: trackerData.coords.lat,
        //         longitude: trackerData.coords.lon,
        //     };
        //     // zapisywanie trasy do vizualizacji
        //     const newRure = deepCopy(myRoute);
        //     console.log('[ORIGINAL', myRoute?.[0]?.length);
        //     console.log('[CLONED]', newRure?.[0]?.length);
        //     if (typeof myRoute[routeNumber] === 'undefined') {
        //         newRure[routeNumber] = [];
        //     }
        //     newRure[routeNumber].push(pos);
        //     setMyRoute(newRure);
        //     const t = setTimeout(() => {
        //         if (polylineRef.current) {
        //             polylineRef.current.setNativeProps({
        //                 coordinates: newRure[routeNumber],
        //             });
        //         }
        //         // polylineRef.set
        //     }, 400);
        //     return () => {
        //         clearTimeout(t);
        //     };
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trackerData, restored]);

    // useEffect(() => {
    //     let t: ReturnType<typeof setTimeout>;
    //     if (appIsActive && currentRouteId && mapReady) {
    //         console.log('[setRoute]');

    //         // const t = setTimeout(async () => {
    //         setRestored(false);
    //         const doIt = async () => {
    //             const newRoute = await getCurrentRoutePathById(currentRouteId);

    //             setMyRoute(newRoute);
    //             if (polylineRef.current) {
    //                 polylineRef.current.setNativeProps({
    //                     coordinates: newRoute[0],
    //                 });
    //             }
    //             t = setTimeout(() => {
    //                 setRestored(true);
    //             }, 500);
    //         };
    //         doIt();
    //         // }, 1000);
    //     }
    //     return () => {
    //         clearTimeout(t);
    //     };
    // }, [appIsActive, currentRouteId, mapReady]);

    const setMapCamera = useCallback(() => {
        if (mapRef.current && trackerData) {
            const pos = {
                latitude: trackerData.coords.lat,
                longitude: trackerData.coords.lon,
            };
            mapRef.current.animateCamera(
                {
                    heading: compassHeading,
                    center: pos,
                },
                {duration: 1000},
            );
        }
    }, [trackerData, compassHeading]);

    useEffect(() => {
        setMapCamera();
    }, [setMapCamera]);

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
        zoom: isIOS ? 18 : 17,
    };

    return (
        <>
            {location && (
                <>
                    <AnimSvg style={styles.gradient} source={gradient} />
                    <MapView
                        onMapReady={() => setMapReady(true)}
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        customMapStyle={mapStyle}
                        pitchEnabled={true}
                        ref={mapRef}
                        rotateEnabled={false}
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
                                    mapRef.current.setCamera(cameraInitObj);
                                }
                            },
                        })}>
                        {/* <InitialPolyline
                            mapReady={mapReady}
                            onRestore={s => setRestored(s)}
                            onRouteRestored={r => {}}
                        /> */}
                        {/* {trackerData?.coords && (
                            <Polyline
                                active={restored}
                                coords={trackerData.coords}
                                routeSectionNumber={routeNumber}
                            />
                        )} */}
                        {trackerData?.coords && (
                            <MultiPolyline
                                active={true}
                                // active={restored}
                                coords={{
                                    latitude: trackerData.coords.lat,
                                    longitude: trackerData.coords.lon,
                                    timestamp: trackerData.timestamp,
                                }}
                                routeSectionNumber={routeNumber}
                            />
                        )}
                        {/* <Polyline
                            ref={polylineRef}
                            coordinates={[]}
                            strokeColor="#d8232a"
                            strokeColors={['#d8232a']}
                            lineCap={'round'}
                            lineJoin={'round'}
                            strokeWidth={8}
                            tappable={false}
                            // key={'route_' + i}
                        /> */}
                        {/* {myRoute?.map((e, i) => {
                            if (!e) {
                                return null;
                            }
                            return (
                                <Polyline
                                    ref={polylineRef}
                                    coordinates={e}
                                    strokeColor="#d8232a"
                                    strokeColors={['#d8232a']}
                                    lineCap={'round'}
                                    lineJoin={'round'}
                                    strokeWidth={8}
                                    tappable={false}
                                    key={'route_' + i}
                                />
                            );
                        })} */}
                        {/* // {foreignRoute && ( */}
                        {/* //     <Polyline
                        //         coordinates={foreignRoute}
                        //         strokeColor="#3583e4"
                        //         strokeColors={['#3583e4']}
                        //         lineCap={'round'}
                        //         lineJoin={'round'}
                        //         tappable={false}
                        //         strokeWidth={8}
                        //     />
                        // )} */}
                    </MapView>
                </>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    map: {
        width: '100%',
        // height: mapBtnPos + mapBtnSize,
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
