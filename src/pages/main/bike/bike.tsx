import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Alert,
    Platform,
    StatusBar,
} from 'react-native';
import I18n from 'react-native-i18n';
import TabBackGround from '../../../sharedComponents/navi/tabBackGround';
import {ScrollView} from 'react-native-gesture-handler';
import GetLocation from 'react-native-get-location';

import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {getBike} from '../../../helpers/transformUserBikeData';
import {removeBikeByNumber} from '../../../storage/actions';
import {PERMISSIONS, request} from 'react-native-permissions';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {bikesListSelector} from '../../../storage/selectors';
import {fetchPlacesData} from '../../../storage/actions';

import Warranty from './warranty';
import Reviews from './reviews';
import ComplaintsRepairs from './complaintsRepairs';
import BikeSelectorList from './bikeSelectorList/bikeSelectorList';
import {countDaysToEnd} from '../../../helpers/warranty';
import ServiceMapBtn from '../../../sharedComponents/buttons/serviceMap';
import BigRedBtn from '../../../sharedComponents/buttons/bigRedBtn';

import geoBox from '../../../helpers/geoBox';

import {UserBike} from '../../../models/userBike.model';

import {CogBtn} from '../../../sharedComponents/buttons';

import SliverImage from '../../../sharedComponents/sliverImage/sliverImage';
import styles from './style';
import StackHeader from '../../../sharedComponents/navi/stackHeader/stackHeader';
import {getVerticalPx} from '../../../helpers/layoutFoo';
import useStatusBarHeight from '../../../hooks/statusBarHeight';

const isIOS = Platform.OS === 'ios';

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
    const scrollRef = useRef<null | ScrollView>(null);
    const statusBarHeight = useStatusBarHeight();

    const headerBackgroundHeight = getVerticalPx(
        100,
    ); /* equal to header height */

    const dispatch = useAppDispatch();
    const bikes = useAppSelector(bikesListSelector);
    const genericBikeData = useAppSelector<UserBike>(
        state => state.bikes.genericBike,
    );

    const [resetReviewsPosition, setResetReviewsPosition] = useState(false);

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
                            {lat: newBox.left, lng: newBox.top},
                            {lat: newBox.right, lng: newBox.bottom},
                        ],
                        width: 2000,
                    }),
                );
            })
            .catch(error => {
                const {code, message} = error;
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
            setResetReviewsPosition(true);
        }
    };

    const trans: any = I18n.t('MainBike');

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
                        scrollRef.current?.scrollTo({
                            y: 0,
                            animated: true,
                        });
                        setResetReviewsPosition(true);
                    }
                },
            },
        ]);
    };

    const safeAreaStyle = isIOS ? {marginTop: -statusBarHeight} : undefined;

    const warrantyData = bike?.warranty || genericBikeData.warranty;
    return (
        <>
            <StatusBar translucent />
            <SafeAreaView style={[styles.container, safeAreaStyle]}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                    }}>
                    <StackHeader
                        hideBackArrow
                        onpress={() => {}}
                        inner={trans.header}
                        style={styles.header}
                        titleStyle={styles.title}
                    />
                    <CogBtn
                        callback={heandleParams}
                        containerStyle={[
                            styles.params,
                            {
                                marginTop: getVerticalPx(40),
                            },
                        ]}
                        iconStyle={styles.paramIcon}
                    />

                    <SliverImage
                        imgSrc={bike?.images?.[0]}
                        headerElement={
                            <BikeSelectorList
                                style={styles.reviews}
                                list={bikes}
                                description={trans.warranty.reviews}
                                callback={onChangeBikeHandler}
                                currentBike={bike?.description?.serial_number}
                                buttonText={trans.add}
                            />
                        }>
                        {bike?.description && (
                            <>
                                <Text style={styles.bikeName}>
                                    {bike?.description.name}
                                </Text>

                                <Text style={styles.bikeDetails}>
                                    {trans.details[0] +
                                        bike?.description.producer +
                                        trans.details[1] +
                                        bike?.description.serial_number}
                                </Text>

                                {warrantyData &&
                                    warrantyData?.type !== 'no-info' && (
                                        <Warranty
                                        style={styles.warranty}
                                            navigation={props.navigation}
                                            type={warrantyData.info}
                                        toEnd={
                                                bike?.warranty
                                                    ? warrantyData?.end
                                                        ? countDaysToEnd(
                                                            warrantyData.end,
                                                        )
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
                                        resetPostion={resetReviewsPosition}
                                        onScrollToStart={() =>
                                            setResetReviewsPosition(false)
                                        }
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

                                <View style={styles.horizontalSpace}>
                                    <ServiceMapBtn
                                        style={styles.map}
                                        title={trans.servisMap}
                                        height={102}
                                        region={region}
                                        location={location}
                                        onpress={() => heandleServicesMap()}
                                    />
                                </View>

                                <View style={styles.horizontalSpace}>
                                    <BigRedBtn
                                        style={styles.btn}
                                        onpress={onRemoveBikeHandler}
                                        title={trans.btn}
                                    />
                                </View>
                            </>
                        )}
                    </SliverImage>
                </View>

                <TabBackGround />
            </SafeAreaView>
        </>
    );
};

export default Bike;
