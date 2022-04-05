import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Alert, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {UserBike} from '@models/userBike.model';
import {RegularStackRoute} from '@navigation/route';
import {removeBikeByNumber} from '@storage/actions';
import {bikesListSelector} from '@storage/selectors';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {genericBikeSelector} from '@storage/selectors/bikes';

import {NoBikesContainer} from '@containers/Bike';
import GenericScreen from '@src/pages/template/GenericScreen';
import {useAppNavigation} from '@navigation/hooks/useAppNavigation';
import {nfcIsSupported} from '@helpers/nfc';
import BikeDetailsContainer from '@containers/Bike/BikeDetailsContainer';
import {Overview} from '@models/bike.model';
import ChangeBikeModal from '@pages/main/bike/components/modal/ChangeBikeModal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import colors from '@theme/colors';

interface Props {
    navigation: any;
    route: any;
}

const Bike: React.FC<Props> = (props: Props) => {
    const scrollRef = useRef<null | ScrollView>(null);
    const navigation = useAppNavigation();

    const dispatch = useAppDispatch();
    const bikes = useAppSelector(bikesListSelector);
    const hasAnyBikesAdded = useMemo(() => bikes.length, [bikes]);
    const genericBikeData = useAppSelector(genericBikeSelector);

    const [nfc, setNfc] = useState(false);
    const [showBottomModal, setShowBottomModal] = useState(false);

    const handleBikeChange = (bike: UserBike) => {
        setBike(bike);
        setShowBottomModal(false);
    };

    nfcIsSupported().then(r => {
        setNfc(r);
    });

    const [bike, setBike] = useState<UserBike | null>(bikes?.[0] || null);

    useEffect(() => {
        setBike(bikes?.[0] || null);
    }, [bikes]);

    const {t} = useMergedTranslation('MainBike');

    const handleParams = () => {
        props.navigation.navigate(RegularStackRoute.BIKE_PARAMS_SCREEN, {
            description: bike?.description,
            params: bike?.params,
        });
    };

    const handleServicesMap = () => {
        props.navigation.navigate(RegularStackRoute.SERVICES_MAP_SCREEN);
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
                    }
                },
            },
        ]);
    };

    const onAddKrossBike = useCallback(() => {
        navigation.navigate(nfc ? 'AddBike' : 'AddBikeByNumber', {
            emptyFrame: true,
        });
        setShowBottomModal(false);
    }, [navigation, nfc]);

    const onReviewPress = (e: Overview) => {
        props.navigation.navigate(RegularStackRoute.REVIEWS_DETAILS_SCREEN, {
            details: e,
        });
    };

    const onChangeBikeHandler = () => {
        setShowBottomModal(prev => !prev);
    };

    const onCloseBottomModal = () => {
        setShowBottomModal(false);
    };

    const onAddOtherBike = useCallback(() => {
        navigation.navigate('AddOtherBike', {
            frameNumber: '',
        });
    }, [navigation]);

    const warrantyData = bike?.warranty || genericBikeData?.warranty;
    const {top} = useSafeAreaInsets();
    return (
        <GenericScreen
            hideBackArrow
            noHeader
            statusBarBackgroundColor={colors.white}>
            <View style={{paddingTop: top}}>
                {hasAnyBikesAdded ? (
                    <>
                        <BikeDetailsContainer
                            bike={bike}
                            showBikeChangeButton={bikes.length > 1}
                            onAddKrossBike={onAddKrossBike}
                            handleParams={handleParams}
                            warrantyData={warrantyData}
                            handleServicesMap={handleServicesMap}
                            onRemoveBikeHandler={onRemoveBikeHandler}
                            onChangeBikeHandler={onChangeBikeHandler}
                            onReviewPress={onReviewPress}
                        />
                        <ChangeBikeModal
                            visible={showBottomModal}
                            onCloseBottomModal={onCloseBottomModal}
                            bikes={bikes}
                            onBikeSelect={handleBikeChange}
                            selectedBike={bike}
                            onAddKrossBike={onAddKrossBike}
                        />
                    </>
                ) : (
                    <NoBikesContainer
                        onPressPrimary={onAddKrossBike}
                        onPressSecondary={onAddOtherBike}
                        onPressTile={handleServicesMap}
                    />
                )}
            </View>
        </GenericScreen>
    );
};

export default Bike;
