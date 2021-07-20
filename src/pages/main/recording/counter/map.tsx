import React, {useState, useRef, useEffect, useCallback} from 'react';
import {StyleSheet, Platform, Dimensions} from 'react-native';
import MapView, {
    PROVIDER_GOOGLE,
    Polyline as OriginalPolyline,
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
import MultiPolyline from './polyline/multiPolyline';

const isIOS = Platform.OS === 'ios';
const {width} = Dimensions.get('window');
interface IProps {
    routeId: string;
    trackerData: any;
    routeNumber: number;
    isRecordingActive: boolean;
    pauses: {start: number; end: number | null}[];
}

const Map: React.FC<IProps> = ({
    routeId,
    trackerData,
    routeNumber,
    pauses,
    isRecordingActive,
}: IProps) => {
    const mapRef = useRef<MapView>(null);

    const mapData = useAppSelector(favouriteMapDataByIDSelector(routeId));
    // const [mapReady, setMapReady] = useState(false);

    const [compassHeading, setCompassHeading] = useState(0);
    const [location, setLocaion] = useState<Coords | null>(null);
    const [foreignRoute, setForeignRoute] = useState<
        {latitude: number; longitude: number}[] | null
    >(null);

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
                        {trackerData?.coords && (
                            <MultiPolyline
                                active={isRecordingActive}
                                // active={restored}
                                pauses={pauses}
                                coords={trackerData}
                                routeSectionNumber={routeNumber}
                            />
                        )}
                        {foreignRoute && (
                            <OriginalPolyline
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
