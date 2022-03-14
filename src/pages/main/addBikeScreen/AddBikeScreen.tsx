import React, {useCallback, useEffect, useState} from 'react';

import {setBikesListByFrameNumber} from '@storage/actions';
import {useAppDispatch} from '@hooks/redux';
import {useAppNavigation} from '@navigation/hooks/useAppNavigation';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {isAndroid} from '@utils/platform';
import useNFCReader from '@hooks/useNFCReader';

import ScanModal from '@pages/onboarding/bikeAdding/turtorialNFC/scanModal.android';
import GenericScreen from '@pages/template/GenericScreen';
import {AddBikeContainer} from '@containers/AddBike';

const AddBikeScreen: React.FC = () => {
    const navigation = useAppNavigation();
    const dispatch = useAppDispatch();
    const {t} = useMergedTranslation('AddBikeScreen');

    const [isFetching, setIsFetching] = useState(false);

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
        navigation.navigate('AddingByNumber', {emptyFrame: true});
    }, [navigation]);

    useEffect(() => {
        if (!startScanNFC && nfcTagResult) {
            const navigateToSummary = async () => {
                setIsFetching(true);
                await dispatch(setBikesListByFrameNumber(nfcTagResult));
                setIsFetching(false);
                navigation.navigate('BikeSummary', {frameNumber: nfcTagResult});
            };
            navigateToSummary();
        }
    }, [dispatch, navigation, startScanNFC, nfcTagResult]);

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
        </GenericScreen>
    );
};

export default AddBikeScreen;
