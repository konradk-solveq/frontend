import React, {useCallback, useMemo, useState} from 'react';
import {Alert} from 'react-native';

import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {bikeByFrameNumberSelector} from '@storage/selectors';
import {useAppNavigation} from '@navigation/hooks/useAppNavigation';
import {removeBikeByNumber, setBikesListByFrameNumber} from '@storage/actions';
import {validateData} from '@utils/validation/validation';
import validationRules from '@utils/validation/validationRules';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {addBikeEvent} from '@analytics/utils/bikes';

import GenericScreen from '@pages/template/GenericScreen';
import {AddBikeByNumberContainer} from '@containers/AddBike';
import {AddBikeSummaryModal} from '@pages/main/addBike/components';

const rules: Record<string, any[] | undefined> = {
    bikeNumber: [
        validationRules.required,
        validationRules.string,
        {[validationRules.min]: 3},
    ],
};

const AddBikeByNumberScreen: React.FC = () => {
    const {t} = useMergedTranslation('AddBikeByNumberScreen');
    const navigation = useAppNavigation();
    const dispatch = useAppDispatch();

    const [isFetching, setIsFetching] = useState(false);
    const [frameNumber, setFrameNumber] = useState('');
    const [showModal, setShowModal] = useState(false);

    const bikeData = useAppSelector(bikeByFrameNumberSelector(frameNumber));
    /**
     * Only first url retruns image
     */
    const bd = useMemo(
        () => ({
            bikeName: bikeData?.description.name || '',
            imageUrl: bikeData?.images?.[0],
            frameNumber: frameNumber,
        }),
        [bikeData?.description, bikeData?.images, frameNumber],
    );

    const checkIsValid = useCallback(
        (fieldName: string, value?: string) => {
            const rule = rules?.[fieldName];
            const isValid = validateData(rule, value);
            return {isValid, errorMessage: t('form.errorMessage')};
        },
        [t],
    );

    const onSubmit = useCallback(
        (bikeNumber: string) => {
            /* TODO: show bike details as modal */
            const navigateToSummary = async () => {
                setIsFetching(true);
                try {
                    await dispatch(setBikesListByFrameNumber(bikeNumber));
                    setFrameNumber(bikeNumber);
                    setShowModal(true);
                } catch (error) {
                    /* TODO: to reafactor after error screen will be redesigned */
                    if (error.notFound) {
                        navigation.navigate('AddOtherBike', {
                            frameNumber: bikeNumber,
                        });
                        return;
                    }
                    const errorMessage = error?.errorMessage || 'Error';
                    Alert.alert('Error', errorMessage);
                } finally {
                    setIsFetching(false);
                }
            };
            navigateToSummary();
        },
        [navigation, dispatch],
    );

    const onPressFindHandler = useCallback(() => {
        navigation.navigate('AddingInfo');
    }, [navigation]);

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
     */
    const onAddBike = () => {
        addBikeEvent(true);
        navigation.pop(2);
    };

    return (
        <GenericScreen screenTitle={t('headerTitle')} contentBelowHeader>
            <AddBikeByNumberContainer
                onSubmit={onSubmit}
                onValidate={checkIsValid}
                onPressLink={onPressFindHandler}
                isLoading={isFetching}
            />
            <AddBikeSummaryModal
                showModal={showModal}
                bikeData={bd}
                onAddBike={onAddBike}
                onClose={onCloseModal}
            />
        </GenericScreen>
    );
};

export default AddBikeByNumberScreen;
