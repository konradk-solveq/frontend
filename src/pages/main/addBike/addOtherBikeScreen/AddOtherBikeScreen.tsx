import React, {useCallback, useMemo, useState} from 'react';
import {Dimensions} from 'react-native';

import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {bikeByFrameNumberSelector} from '@storage/selectors';
import {genericBikeSelector} from '@storage/selectors/bikes';
import {useAppNavigation} from '@navigation/hooks/useAppNavigation';
import {removeBikeByNumber, setBikeData} from '@storage/actions';
import {validateData} from '@utils/validation/validation';
import {genericBikerules} from '@utils/validation/validationRules';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {useAppRoute} from '@navigation/hooks/useAppRoute';
import {addBikeEvent} from '@analytics/utils/bikes';

import GenericScreen from '@pages/template/GenericScreen';
import {AddOtherBikeContainer} from '@containers/AddBike';
import {AddBikeSummaryModal} from '@pages/main/addBike/components';
import {OtherBikeDataT} from '@containers/AddBike/type/bike';

const {height} = Dimensions.get('screen');
const modalHeight = height <= 670 ? 480 : 443;

const AddOtherBikeScreen: React.FC = () => {
    const {t} = useMergedTranslation('AddOtherBikeScreen');
    const navigation = useAppNavigation();
    const dispatch = useAppDispatch();
    const fNumber = useAppRoute<'AddOtherBike'>()?.params?.frameNumber;

    const [isFetching, setIsFetching] = useState(false);
    const [frameNumber, setFrameNumber] = useState('');
    const [showModal, setShowModal] = useState(false);

    const genericBike = useAppSelector(genericBikeSelector);
    const bikeData = useAppSelector(bikeByFrameNumberSelector(frameNumber));

    const bd = useMemo(
        () => ({
            bikeName: bikeData?.description.name || '',
            imageUrl: '' /* Modal with data summary do not need this */,
            producer: bikeData?.description?.producer || '',
            frameNumber: frameNumber,
        }),
        [bikeData?.description, frameNumber],
    );

    const checkIsValid = useCallback(
        (fieldName: string, value?: string) => {
            const rule = genericBikerules?.[fieldName];
            const isValid = validateData(rule, value);
            return {isValid, errorMessage: t('form.errorMessage')};
        },
        [t],
    );

    const onSubmit = useCallback(
        (data: OtherBikeDataT) => {
            setIsFetching(true);
            const navigateToSummary = async () => {
                const serial_number = Date.now().toLocaleString();
                setFrameNumber(serial_number);
                dispatch(
                    setBikeData({
                        description: {
                            name: data.bikeName,
                            id: null,
                            sku: '',
                            producer: data.manufacturer,
                            serial_number: serial_number,
                            bikeType: data.bikeType,
                        },
                    }),
                );
                setTimeout(() => {
                    setShowModal(true);
                    setIsFetching(false);
                }, 1000);
            };
            navigateToSummary();
        },
        [dispatch],
    );

    /**
     * Close modal and remove bike data from storage
     */
    const onCloseModal = useCallback(() => {
        setShowModal(false);
        /**
         * Wait with removing data to avoid glitches
         */
        setTimeout(() => {
            dispatch(removeBikeByNumber(frameNumber));
        }, 1000);
    }, [dispatch, frameNumber]);

    /**
     * Ends whole process
     * and returns to start screen (BikeTab o HomeTab)
     *
     * When returns after adding with NFC it needs
     * to pop 3 screens instead of 2
     */
    const onAddBike = useCallback(() => {
        if (!bikeData) {
            return;
        }
        addBikeEvent();
        navigation.pop(fNumber ? 3 : 2);
    }, [navigation, fNumber, bikeData]);

    return (
        <GenericScreen
            screenTitle={t('headerTitle')}
            contentBelowHeader
            showCross={!fNumber}>
            <AddOtherBikeContainer
                onSubmit={onSubmit}
                onValidate={checkIsValid}
                isLoading={isFetching}
                genericBikeData={genericBike}
            />
            <AddBikeSummaryModal
                showModal={showModal}
                bikeData={bd}
                onAddBike={onAddBike}
                onClose={onCloseModal}
                otherBike
                height={modalHeight}
            />
        </GenericScreen>
    );
};

export default AddOtherBikeScreen;
