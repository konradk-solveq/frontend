import React, {useState, useRef, useEffect, useCallback} from 'react';
import {StyleSheet, Platform} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
import CompassHeading from 'react-native-compass-heading';
import GetLocation, {Location} from 'react-native-get-location';
import {PERMISSIONS, request} from 'react-native-permissions';

import {useAppSelector} from '../../../../hooks/redux';
import {favouriteMapDataByIDSelector} from '../../../../storage/selectors/map';

import mapStyle from '../../../../sharedComponents/maps/styles';
import deepCopy from '../../../../helpers/deepCopy';

interface IProps {
    routeId: string;
    trackerData: any;
    routeNumber: number;
}

const CounterMapView: React.FC<IProps> = ({
    routeId,
    trackerData,
    routeNumber,
}: IProps) => {
    const mapRef = useRef<MapView>(null);

    const mapData = useAppSelector(favouriteMapDataByIDSelector(routeId));

    const [compassHeading, setCompassHeading] = useState(0);
    const [hasPermissions, setHasPermission] = useState(false);
    const [location, setLocaion] = useState<Location | null>(null);
    const [foreignRoute, setForeignRoute] = useState<
        {latitude: number; longitude: number}[] | null
    >(null);
    const [myRoute, setMyRoute] = useState([]);

    const askLocationPermissionOnAndroid = async () => {
        try {
            request(
                Platform.select({
                    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                    ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
                }),
            ).then(res => {
                if (res === 'granted') {
                    setHasPermission(true);
                }
            });
        } catch (error) {
            console.log('location set error:', error);
        }
    };

    const getCurrentLocationPositionHandler = useCallback(() => {
        if (!hasPermissions && Platform.OS === 'android') {
            askLocationPermissionOnAndroid();
            return;
        }
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        }).then(pos => {
            setLocaion(pos);
        });
    }, [hasPermissions]);

    useEffect(() => {
        getCurrentLocationPositionHandler();
    }, [getCurrentLocationPositionHandler]);

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
        if (trackerData?.coords && mapRef.current) {
            const pos = {
                latitude: trackerData.coords.lat,
                longitude: trackerData.coords.lon,
            };

            // zapisywanie trasy do vizualizacji
            const newRure = deepCopy(myRoute);
            if (typeof myRoute[routeNumber] === 'undefined') {
                newRure[routeNumber] = [];
            }
            const t = setTimeout(() => {
                newRure[routeNumber].push(pos);
                setMyRoute(newRure);
            }, 400);

            return () => {
                clearTimeout(t);
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trackerData]);

    useEffect(() => {
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
                {duration: 600},
            );
        }
    }, [trackerData, compassHeading]);

    useEffect(() => {
        const degree_update_rate = 3;

        CompassHeading.start(degree_update_rate, ({heading}) => {
            setCompassHeading(heading);
        });

        return () => {
            CompassHeading.stop();
        };
    }, []);

    return (
        <>
            {location && (
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    customMapStyle={mapStyle}
                    pitchEnabled={true}
                    ref={mapRef}
                    scrollEnabled={false}
                    initialCamera={{
                        center: {
                            latitude: location.latitude,
                            longitude: location.longitude,
                        },
                        pitch: 0,
                        altitude: 0,
                        heading: compassHeading,
                        zoom: 18,
                    }}>
                    {myRoute.map((e, i) => (
                        <Polyline
                            coordinates={e}
                            strokeColor="#d8232a"
                            strokeColors={['#d8232a']}
                            lineCap={'round'}
                            lineJoin={'round'}
                            strokeWidth={8}
                            key={'route_' + i}
                        />
                    ))}
                    {foreignRoute && (
                        <Polyline
                            coordinates={foreignRoute}
                            strokeColor="#3583e4"
                            strokeColors={['#3583e4']}
                            lineCap={'round'}
                            lineJoin={'round'}
                            strokeWidth={8}
                        />
                    )}
                </MapView>
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
});

export default CounterMapView;