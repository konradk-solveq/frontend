import React, {useState, useRef, useEffect, useCallback} from 'react';
import {StyleSheet, Platform, Dimensions} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
import {Coords} from 'react-native-background-geolocation-android';
import CompassHeading from 'react-native-compass-heading';

import {useAppSelector} from '../../../../hooks/redux';
import {favouriteMapDataByIDSelector} from '../../../../storage/selectors/map';
import {getCurrentLocation} from '../../../../utils/geolocation';

import mapStyle from '../../../../sharedComponents/maps/styles';
import deepCopy from '../../../../helpers/deepCopy';
import AnimSvg from '../../../../helpers/animSvg';

import gradient from './gradientSvg';

const isIOS = Platform.OS === 'ios';
const {width} = Dimensions.get('window');
interface IProps {
    routeId: string;
    trackerData: any;
    routeNumber: number;
}

const Map: React.FC<IProps> = ({
    routeId,
    trackerData,
    routeNumber,
}: IProps) => {
    const mapRef = useRef<MapView>(null);

    const mapData = useAppSelector(favouriteMapDataByIDSelector(routeId));

    const [compassHeading, setCompassHeading] = useState(0);
    const [location, setLocaion] = useState<Coords | null>(null);
    const [foreignRoute, setForeignRoute] = useState<
        {latitude: number; longitude: number}[] | null
    >(null);
    const [myRoute, setMyRoute] = useState([]);

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
        zoom: isIOS ? 18 : 16,
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
                        pitchEnabled={false}
                        ref={mapRef}
                        rotateEnabled={false}
                        scrollEnabled={false}
                        zoomEnabled={false}
                        zoomTapEnabled={false}
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
                        {myRoute?.map((e, i) => {
                            if (!e) {
                                return null;
                            }
                            return (
                                <Polyline
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
                        })}
                        {foreignRoute && (
                            <Polyline
                                coordinates={foreignRoute}
                                strokeColor="#3583e4"
                                strokeColors={['#3583e4']}
                                lineCap={'round'}
                                lineJoin={'round'}
                                tappable={false}
                                strokeWidth={8}
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
