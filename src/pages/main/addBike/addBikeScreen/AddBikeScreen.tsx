import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Image} from 'react-native';

import {removeBikeByNumber, setBikesListByFrameNumber} from '@storage/actions';
import {bikeByFrameNumberSelector} from '@storage/selectors';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {useAppNavigation} from '@navigation/hooks/useAppNavigation';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {isAndroid} from '@utils/platform';
import useNFCReader from '@hooks/useNFCReader';
import {addBikeEvent} from '@analytics/utils/bikes';

import ScanModal from '@pages/onboarding/bikeAdding/turtorialNFC/scanModal.android';
import GenericScreen from '@pages/template/GenericScreen';
import {AddBikeContainer} from '@containers/AddBike';
import {AddBikeSummaryModal} from '@pages/main/addBike/components';

import DefaultImage from '@assets/images/bike_placeholder.png';

const IMAGE_URL = Image.resolveAssetSource(DefaultImage).uri;

const AddBikeScreen: React.FC = () => {
    const navigation = useAppNavigation();
    const dispatch = useAppDispatch();
    const {t} = useMergedTranslation('AddBikeScreen');

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
            imageUrl: bikeData?.images?.[0] || IMAGE_URL,
            frameNumber: frameNumber,
        }),
        [bikeData?.description, bikeData?.images, frameNumber],
    );

    const {
        heandleScanByNfc,
        nfcTagResult,
        startScanNFC,
        cancelScanByNfcHandler,
    } = useNFCReader();

    const onPressFindHandler = useCallback(() => {
        navigation.navigate('AddingInfo');
    }, [navigation]);

    const onPressScanNfcHandler = useCallback(() => {
        heandleScanByNfc();
    }, [heandleScanByNfc]);

    const onPressScanByNumberHandler = useCallback(() => {
        navigation.navigate('AddBikeByNumber', {emptyFrame: true});
    }, [navigation]);

    useEffect(() => {
        if (!startScanNFC && nfcTagResult) {
            const navigateToSummary = async () => {
                setIsFetching(true);
                await dispatch(setBikesListByFrameNumber(nfcTagResult));
                setFrameNumber(nfcTagResult);
                setIsFetching(false);
                setShowModal(true);
            };
            navigateToSummary();
        }
    }, [dispatch, navigation, startScanNFC, nfcTagResult]);

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
        addBikeEvent(true, true);
        navigation.pop(2);
    };

    return (
        <GenericScreen screenTitle={t('headerTitle')} showCross>
            <AddBikeContainer
                onPressLink={onPressFindHandler}
                onPressScanNfc={onPressScanNfcHandler}
                onPressFindByNumber={onPressScanByNumberHandler}
                scanButtonIsDisabled={startScanNFC}
                isLoading={isFetching}
            />
            {isAndroid && (
                <ScanModal
                    showModal={startScanNFC}
                    startScan={() => {}}
                    onPressCancel={cancelScanByNfcHandler}
                />
            )}
            <AddBikeSummaryModal
                showModal={showModal && !startScanNFC}
                bikeData={bd}
                onAddBike={onAddBike}
                onClose={onCloseModal}
            />
        </GenericScreen>
    );
};

export default AddBikeScreen;
