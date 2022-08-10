import {useCallback, useEffect, useRef, useState} from 'react';
import {Alert} from 'react-native';
import nfcManager, {
    NfcEvents,
    NfcTech,
    TagEvent,
    Ndef,
} from 'react-native-nfc-manager';

import {cleanUp, initNfc, nfcIsEnabled, readNdef} from '@helpers/nfc';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {isAndroid} from '@utils/platform';

const decodeNdefRecord = record => {
    if (Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
        return ['text', Ndef.text.decodePayload(record.payload)];
    } else if (Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_URI)) {
        return ['uri', Ndef.uri.decodePayload(record.payload)];
    }

    return ['unknown', '---'];
};

/**
 * TODO: It was copied from src/pages/onboarding/bikeAdding/turtorialNFC/turtorialNFC.tsx
 * Needs some refactor. Tests are missing.
 */
const useNFC = () => {
    const refTimer = useRef<any>();
    const {t} = useMergedTranslation('TutorialNFC');
    const nfcIsOnRef = useRef(false);

    const [startScanNFC, setStartScanNFC] = useState(false);
    const [nfcTagResult, setNfcTagResult] = useState<undefined | string>();

    const [nfcData, setNfcData] = useState<TagEvent>();
    async function getNFCInfo() {
        try {
            nfcManager.registerTagEvent();
            await nfcManager.requestTechnology(NfcTech.Ndef);
            const tag = await nfcManager.getTag();
            if (!tag) {
                return;
            }
            const results = tag?.ndefMessage?.map(decodeNdefRecord);
            console.log('[=== READ TAG ===]', results);
            setNfcData(tag);
            nfcManager.unregisterTagEvent();
            nfcManager.cancelTechnologyRequest();
            nfcManager.invalidateSessionIOS();
        } catch (ex) {
            console.error('something went wrong', ex);
        } finally {
            /*
        Remember to call cancelTechnologyRequest() after scanning is done
        Otherwise, you will get 'You can only issue one request at a time' error
        */
       console.log('finally')
            nfcManager.unregisterTagEvent();
            nfcManager.cancelTechnologyRequest();
            // nfcManager.clearBackgroundTag();
            // nfcManager.invalidateSessionIOS();
        }
    }
    // Initialize the NFC manager (This will run only once)
    useEffect(() => {
        nfcManager.isSupported().then(supported => {
            if (supported) {
                nfcManager.start();
            } else {
                setNfcData('NFC not supported');
            }
        });
    }, []);
    // Listen to NFC events (This will run every-time after nfcData changes)
    useEffect(() => {
        getNFCInfo();
    }, [nfcData]);

    const cancelScanByNfcHandler = useCallback(() => {
        if (startScanNFC) {
            setStartScanNFC(false);
            nfcIsOnRef.current = false;
        }
    }, [startScanNFC]);

    const onScanNfcHandler = useCallback(() => {
        setStartScanNFC(true);
    }, []);

    return {
        heandleScanByNfc: onScanNfcHandler,
        nfcTagResult,
        startScanNFC,
        cancelScanByNfcHandler,
    };
};

export default useNFC;
