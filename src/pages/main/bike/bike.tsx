import React, { useCallback, useEffect, useState } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    Alert,
    Platform,
} from 'react-native';
import I18n from 'react-native-i18n';
import TabBackGround from '../../../sharedComponents/navi/tabBackGround';
import { ScrollView } from 'react-native-gesture-handler';
import GetLocation from 'react-native-get-location';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { getBike } from '../../../helpers/transformUserBikeData';
import { removeBikeByNumber } from '../../../storage/actions';
import { PERMISSIONS, request } from 'react-native-permissions';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

import Warranty from './warranty';
import Reviews from './reviews';
import ComplaintsRepairs from './complaintsRepairs';
import BikeSelectorList from './bikeSelectorList/bikeSelectorList';
import { countDaysToEnd } from '../../../helpers/warranty';
import ServiceMapBtn from '../../../sharedComponents/buttons/serviceMap';
import BigRedBtn from '../../../sharedComponents/buttons/bigRedBtn';

import {
    setObjSize,
    getCenterLeftPx,
    getVerticalPx,
    getWidthPx,
    getHorizontalPx,
} from '../../../helpers/layoutFoo';
import geoBox from '../../../helpers/geoBox';

import { UserBike } from '../../../models/userBike.model';

import BikeImage from '../../../sharedComponents/images/bikeImage';
import { CogBtn, ShowMoreArrowBtn } from '../../../sharedComponents/buttons';

import {fetchPlacesData} from '../../../storage/actions';

interface Props {
    navigation: any;
    route: any;
}
const defaultRegion = {
    latitude: 53.008773556173104,
    latitudeDelta: 0.07588885599553308,
    longitude: 20.89136063395526,
    longitudeDelta: 0.4499640028797671,
};
const Bike: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();
    const bikes = useAppSelector<UserBike[]>(state => state.bikes.list);
    const genericBikeData = useAppSelector<UserBike>(
        state => state.bikes.genericBike,
    );

    const [bike, setBike] = useState<UserBike | null>(bikes?.[0] || null);
    const [box, serBox] = useState({
        bottom: 53.46894730287977,
        left: 20.86694125763505,
        right: 20.89377214236495,
        top: 52.569019297120235,
    });
    const [region, serRegion] = useState(defaultRegion);
    const [location, serLocation] = useState({
        longitude: 20.89136063395526,
        latitude: 53.008773556173104,
    });

    const [hasPermissions, setHasPermission] = useState(false);

    const getCurrentLocationPositionHandler = useCallback(() => {
        let newBox;
        if (!hasPermissions && Platform.OS === 'android') {
            askLocationPermissionOnAndroid();
            return;
        }
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                serLocation(location);
                newBox = geoBox(
                    {
                        lon: location.longitude,
                        lat: location.latitude,
                    },
                    35,
                );
                serBox(newBox);
                serRegion({
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: Math.abs((newBox.left - newBox.right) / 2),
                    longitudeDelta: Math.abs((newBox.top - newBox.bottom) / 2),
                });
            })
            .then(() => {
                dispatch(
                    fetchPlacesData({
                        bbox: [
                            { lat: newBox.left, lng: newBox.top },
                            { lat: newBox.right, lng: newBox.bottom },
                        ],
                        width: 2000,
                    }),
                );
            })
            .catch(error => {
                const { code, message } = error;
                if (code === 'UNAVAILABLE' && Platform.OS === 'android') {
                    openLocationSettings();
                }
                console.warn(code, message);
            });
    }, [hasPermissions]);

    /* TODO: extract location methods to helper/custom hook */
    const openLocationSettings = () => {
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
            interval: 10000,
            fastInterval: 5000,
        })
            .then(data => {
                getCurrentLocationPositionHandler();
            })
            .catch(err => {
                console.log('location settings - error', error);
            });
    };

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

    useEffect(() => {
        getCurrentLocationPositionHandler();
    }, [getCurrentLocationPositionHandler]);

    useEffect(() => {
        setBike(bikes?.[0] || null);
    }, [bikes]);

    const onChangeBikeHandler = (frameNumber: string) => {
        if (frameNumber === bike?.description.serial_number) {
            return;
        }
        const newBike = getBike(bikes, frameNumber);
        if (newBike) {
            setBike(newBike);
        }
    };

    const trans: any = I18n.t('MainBike');

    setObjSize(334, 50);
    const w = getWidthPx();
    const l = getCenterLeftPx();
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
        },
        scroll: {
            backgroundColor: '#ffffff',
        },
        header: {
            marginTop: getVerticalPx(65),
            left: l,
            width: w,
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'center',
            fontSize: 18,
            color: '#313131',
        },
        params: {
            position: 'absolute',
            top: getVerticalPx(65 - 13),
            right: getHorizontalPx(40 - 13),
            width: getHorizontalPx(13 + 20 + 13),
            height: getHorizontalPx(13 + 20 + 13),
        },
        paramIcon: {
            margin: getHorizontalPx(13),
            width: getHorizontalPx(20),
            height: getHorizontalPx(20),
        },
        bikeName: {
            left: l,
            width: w,
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: 40,
            color: '#313131',
            textAlign: 'center',
        },
        bikeDetails: {
            marginTop: getVerticalPx(5),
            left: l,
            width: w,
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'center',
            fontSize: 15,
            color: '#555555',
        },
        warranty: {
            marginTop: getVerticalPx(76),
        },
        reviews: {
            marginTop: getVerticalPx(45),
        },
        complaintsRepairs: {
            marginTop: getVerticalPx(30),
        },
        separator: {
            width: '100%',
            height: getVerticalPx(200),
        },
        map: {
            left: l,
            width: w,
        },
        btn: {
            left: l,
            width: w,
            height: 50,
            marginTop: getVerticalPx(72),
        },
        test: {
            backgroundColor: 'khaki',
        },
    });

    const heandleParams = () => {
        props.navigation.navigate('BikeParams', {
            description: bike?.description,
            params: bike?.params,
        });
    };

    const heandleServicesMap = () => {
        if (!region || !location || !box) {
            return;
        }

        props.navigation.navigate('ServicesMap', {
            region: region,
            location: location,
            box: box,
        });
    };

    const onRemoveBikeHandler = () => {
        Alert.alert('', trans.removeAlert, [
            {
                text: trans.cancelAction,
            },
            {
                text: trans.removveAction,
                onPress: () => {
                    if (bike?.description) {
                        dispatch(
                            removeBikeByNumber(bike.description.serial_number),
                        );
                    }
                },
            },
        ]);
    };

    const warrantyData = bike?.warranty || genericBikeData.warranty;
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll}>
                <Text style={styles.header}>{trans.header}</Text>

                {bike?.description && (
                    <CogBtn
                        callback={heandleParams}
                        containerStyle={styles.params}
                        iconStyle={styles.paramIcon}
                    />
                )}

                <BikeSelectorList
                    style={styles.reviews}
                    list={bikes}
                    description={trans.warranty.reviews}
                    callback={onChangeBikeHandler}
                    currentBike={bike?.description?.serial_number}
                    buttonText={trans.add}
                />

                {bike?.description && (
                    <>
                        {bike?.images && bike.images.length > 0 ? (
                            <BikeImage imgUrl={bike.images[0]} />
                        ) : (
                            <BikeImage />
                        )}

                        <ShowMoreArrowBtn onPress={() => { }} up={true} />

                        <Text style={styles.bikeName}>
                            {bike?.description.name}
                        </Text>

                        <Text style={styles.bikeDetails}>
                            {trans.details[0] +
                                bike?.description.producer +
                                trans.details[1] +
                                bike?.description.serial_number}
                        </Text>

                        {warrantyData && (
                            <Warranty
                                style={styles.warranty}
                                navigation={props.navigation}
                                type={warrantyData.info}
                                toEnd={
                                    bike?.warranty
                                        ? warrantyData?.end
                                            ? countDaysToEnd(warrantyData.end)
                                            : null
                                        : undefined
                                }
                                warranty={trans.warranty}
                                details={{
                                    description: bike?.description,
                                    warranty: warrantyData,
                                }}
                            />
                        )}

                        {warrantyData?.overviews && (
                            <Reviews
                                style={styles.reviews}
                                list={warrantyData.overviews}
                                details={{
                                    description: bike?.description,
                                    warranty: warrantyData,
                                }}
                                box={box}
                                region={region}
                                location={location}
                                description={trans.warranty.reviews}
                                navigation={props.navigation}
                            />
                        )}

                        {bike?.complaintsRepairs &&
                            bike.complaintsRepairs.length > 0 && (
                                <ComplaintsRepairs
                                    style={styles.complaintsRepairs}
                                    list={bike.complaintsRepairs}
                                    description={
                                        trans.warranty.complaintsRepairs
                                    }
                                />
                            )}

                        <ServiceMapBtn
                            style={styles.map}
                            title={trans.servisMap}
                            height={102}
                            region={region}
                            location={location}
                            onpress={() => heandleServicesMap()}
                        />

                        <BigRedBtn
                            style={styles.btn}
                            onpress={onRemoveBikeHandler}
                            title={trans.btn}
                        />
                    </>
                )}

                <View style={styles.separator} />
            </ScrollView>

            <TabBackGround />
        </SafeAreaView>
    );
};

export default Bike;
