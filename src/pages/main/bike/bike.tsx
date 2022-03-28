import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Alert} from 'react-native';
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
    }, [navigation, nfc]);

    const onReviewPress = (e: Overview) => {
        props.navigation.navigate(RegularStackRoute.REVIEWS_DETAILS_SCREEN, {
            details: e,
        });
    };

    const onAddOtherBike = useCallback(() => {
        navigation.navigate('AddOtherBike', {
            frameNumber: '',
        });
    }, [navigation]);

    const warrantyData = bike?.warranty || genericBikeData?.warranty;
    return (
        <GenericScreen hideBackArrow>
            {hasAnyBikesAdded ? (
                <BikeDetailsContainer
                    bike={bike}
                    onAddKrossBike={onAddKrossBike}
                    handleParams={handleParams}
                    warrantyData={warrantyData}
                    handleServicesMap={handleServicesMap}
                    onRemoveBikeHandler={onRemoveBikeHandler}
                    onReviewPress={onReviewPress}
                />
            ) : (
                <NoBikesContainer
                    onPressPrimary={onAddKrossBike}
                    onPressSecondary={onAddOtherBike}
                    onPressTile={handleServicesMap}
                />
            )}
        </GenericScreen>
    );
};

export default Bike;
