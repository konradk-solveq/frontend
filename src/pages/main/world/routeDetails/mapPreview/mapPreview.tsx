import React, {useEffect, useState, useRef} from 'react';
import {View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
import CompassHeading from 'react-native-compass-heading';

import {useAppSelector} from '../../../../../hooks/redux';
import {
    selectMapPathByIDBasedOnTypeSelector,
    selectorTypeEnum,
} from '../../../../../storage/selectors/map';
import {Coords, CoordsType} from '../../../../../models/map.model';

import StackHeader from '../../../../../sharedComponents/navi/stackHeader/stackHeader';
import AnimSvg from '../../../../../helpers/animSvg';
import mapStyle from '../../../../../sharedComponents/maps/styles';
import gradient from './gradientSvg';

import styles from './style';
import {Platform} from 'react-native';

const isIOS = Platform.OS === 'ios';

interface Props {
    navigation: any;
    route: any;
}

const getMapType = (params: any) => {
    if (params?.private) {
        return selectorTypeEnum.private;
    }
    if (params?.favourite) {
        return selectorTypeEnum.favourite;
    }
    return selectorTypeEnum.regular;
};

const MapPreview: React.FC<Props> = ({navigation, route}: Props) => {
    const mapId = route?.params?.mapId;
    const mapRef = useRef<MapView>(null);

    const [compassHeading, setCompassHeading] = useState(0);
    const [foreignRoute, setForeignRoute] = useState<Coords[]>([]);

    const mapPath = useAppSelector<CoordsType[] | undefined>(
        selectMapPathByIDBasedOnTypeSelector(mapId, getMapType(route?.params)),
    );

    useEffect(() => {
        if (mapPath) {
            const fRoute = [...mapPath].map(e => {
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
        const degree_update_rate = 3;

        CompassHeading.start(degree_update_rate, ({heading}) => {
            setCompassHeading(heading);
        });

        return () => {
            CompassHeading.stop();
        };
    }, []);

    const heandleGoBackClick = () => {
        navigation.goBack();
    };
    return (
        <>
            <View style={styles.innerContainer}>
                <AnimSvg style={styles.gradient} source={gradient} />

                {foreignRoute?.[0] && (
                    <MapView
                        ref={mapRef}
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        customMapStyle={mapStyle}
                        pitchEnabled={true}
                        showsCompass={false}
                        {...(!isIOS && {
                            initialCamera: {
                                center: {
                                    latitude: foreignRoute?.[0].latitude,
                                    longitude: foreignRoute?.[0].longitude,
                                },
                                pitch: 0,
                                altitude: 0,
                                heading: compassHeading,
                                zoom: 16,
                            },
                        })}
                        {...(isIOS && {
                            onLayout: () => {
                                if (mapRef.current) {
                                    mapRef.current.animateCamera({
                                        center: {
                                            latitude: foreignRoute[0].latitude,
                                            longitude:
                                                foreignRoute[0].longitude,
                                        },
                                        pitch: 0,
                                        altitude: 0,
                                        heading: compassHeading,
                                        zoom: 16,
                                    });
                                }
                            },
                        })}>
                        {foreignRoute && (
                            <Polyline
                                coordinates={foreignRoute}
                                strokeColor="#d8232a"
                                strokeColors={['#d8232a']}
                                lineCap={'round'}
                                lineJoin={'round'}
                                strokeWidth={6}
                            />
                        )}
                    </MapView>
                )}

                <StackHeader onpress={heandleGoBackClick} inner="" />
            </View>
        </>
    );
};

export default MapPreview;
