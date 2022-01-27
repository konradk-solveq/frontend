import React, {useCallback, useEffect, useRef, useState} from 'react';
import {SafeAreaView, View, Text, Alert} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import {useAppDispatch, useAppSelector} from '@hooks/redux';
import useStatusBarHeight from '@hooks/statusBarHeight';
import {UserBike} from '@models/userBike.model';
import {RegularStackRoute} from '@navigation/route';
import {fetchPlacesData, removeBikeByNumber} from '@storage/actions';
import {bikesListSelector} from '@storage/selectors';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {useLocationProvider} from '@providers/staticLocationProvider/staticLocationProvider';
import geoBox from '@helpers/geoBox';
import {getBike} from '@helpers/transformUserBikeData';
import {countDaysToEnd} from '@helpers/warranty';

import {CogBtn, BigRedBtn, ServiceMapBtn} from '@sharedComponents/buttons';
import SliverImage from '@sharedComponents/sliverImage/sliverImage';
import StackHeader from '@sharedComponents/navi/stackHeader/stackHeader';
import TabBackGround from '@sharedComponents/navi/tabBackGround';

import BikeSelectorList from './bikeSelectorList/bikeSelectorList';
import ComplaintsRepairs from './complaintsRepairs';
import Reviews from './reviews';
import Warranty from './warranty';
import {isIOS} from '@utils/platform';

import styles from './style';

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

    const loc = useLocationProvider()?.location;

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
        longitude: loc?.latitude || 20.89136063395526,
        latitude: loc?.longitude || 53.008773556173104,
    });

    const getCurrentLocationPositionHandler = useCallback(async () => {
        let newBox;

        if (loc) {
            serLocation(loc);
            newBox = geoBox(
                {
                    lon: loc.longitude,
                    lat: loc.latitude,
                },
                35,
            );
            serBox(newBox);
            serRegion({
                latitude: loc.latitude,
                longitude: loc.longitude,
                latitudeDelta: Math.abs((newBox.left - newBox.right) / 2),
                longitudeDelta: Math.abs((newBox.top - newBox.bottom) / 2),
            });
            try {
                await dispatch(
                    fetchPlacesData({
                        bbox: [
                            {lat: newBox.left, lng: newBox.top},
                            {lat: newBox.right, lng: newBox.bottom},
                        ],
                        width: 2000,
                    }),
                );
            } catch (error: any) {
                console.error('[getCurrentLocationPositionHandler]', error);
                const errorMessage = error?.errorMessage || error;
                Alert.alert('Error', errorMessage);
            }
        }
    }, [dispatch, loc]);

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

    const {t} = useMergedTranslation('MainBike');

    const heandleParams = () => {
        props.navigation.navigate(RegularStackRoute.BIKE_PARAMS_SCREEN, {
            description: bike?.description,
            params: bike?.params,
        });
    };

    const heandleServicesMap = () => {
        if (!region || !location || !box) {
            return;
        }

        props.navigation.navigate(RegularStackRoute.SERVICES_MAP_SCREEN, {
            region: region,
            location: location,
            box: box,
        });
    };

    const onRemoveBikeHandler = () => {
        Alert.alert('', t('removeAlert'), [
            {
                text: t('cancelAction'),
            },
            {
                text: t('removveAction'),
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
        <SafeAreaView style={[styles.container, safeAreaStyle]}>
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                }}>
                <StackHeader
                    hideBackArrow
                    inner={t('header')}
                    style={styles.header}
                    rightActions={
                        bike?.description && (
                            <CogBtn
                                callback={heandleParams}
                                iconStyle={styles.paramIcon}
                            />
                        )
                    }
                />

                <SliverImage
                    imgSrc={bike?.images?.[0]}
                    hideHeader={!bike?.description}
                    headerElement={
                        <BikeSelectorList
                            list={bikes}
                            description={t('warranty.reviews')}
                            callback={onChangeBikeHandler}
                            currentBike={bike?.description?.serial_number}
                            buttonText={t('add')}
                        />
                    }>
                    {bike?.description && (
                        <>
                            <Text style={styles.bikeName}>
                                {bike?.description.name}
                            </Text>

                            <Text style={styles.bikeDetails}>
                                {t('details', {
                                    name: bike?.description.producer,
                                    number: bike?.description.serial_number,
                                })}
                            </Text>

                            {warrantyData && warrantyData?.type !== 'no-info' && (
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
                                    warranty={t('warranty')}
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
                                    description={t('warranty.reviews')}
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
                                        description={t(
                                            'warranty.complaintsRepairs',
                                        )}
                                    />
                                )}

                            <View style={styles.horizontalSpace}>
                                <ServiceMapBtn
                                    style={styles.map}
                                    title={t('servisMap')}
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
                                    title={t('btn')}
                                />
                            </View>
                        </>
                    )}
                </SliverImage>
            </View>

            <TabBackGround />
        </SafeAreaView>
    );
};

export default Bike;
