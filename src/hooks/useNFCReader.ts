import {useCallback, useEffect, useRef, useState} from 'react';
import {Alert} from 'react-native';

import {cleanUp, initNfc, nfcIsEnabled, readNdef} from '@helpers/nfc';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {isAndroid} from '@utils/platform';

const useNFCReader = () => {
    const refTimer = useRef<any>();
    const {t} = useMergedTranslation('TutorialNFC');
    const nfcIsOnRef = useRef(false);

    const [startScanNFC, setStartScanNFC] = useState(false);
    const [nfcTagResult, setNfcTagResult] = useState<undefined | string>();

    useEffect(() => {
        if (!nfcIsOnRef.current) {
            nfcIsEnabled().then(r => {
                if (r) {
                    initNfc().then(res => {
                        nfcIsOnRef.current = res;
                    });
                }
            });
        }
        return () => {
            cleanUp();
            nfcIsOnRef.current = false;
        };
    }, []);

    const readNFCTag = useCallback(async () => {
        setNfcTagResult(undefined);
        setStartScanNFC(true);
        readNdef()
            .then(res => {
                res.forEach(e => {
                    if (e[0] === 'text') {
                        setNfcTagResult(e[1]?.trim());
                    }
                });
            })
            .catch(e => {
                if (e === 'CANCELED') {
                    refTimer.current = setTimeout(
                        () => {
                            nfcIsOnRef.current = false;
                        },
                        isAndroid ? 0 : 1500,
                    );
                }
            })
            .finally(() => {
                setStartScanNFC(false);
            });
    }, []);

    const cancelScanByNfcHandler = useCallback(() => {
        if (startScanNFC) {
            setStartScanNFC(false);
            nfcIsOnRef.current = false;
        }
    }, [startScanNFC]);

    useEffect(() => {
        if (nfcIsOnRef.current) {
            if (startScanNFC) {
                readNFCTag();
            }
            return;
        }
        if (startScanNFC) {
            nfcIsEnabled().then(r => {
                if (r) {
                    readNFCTag();
                } else {
                    Alert.alert('', t('alertMessage'), [
                        {text: 'Ok', onPress: () => cancelScanByNfcHandler()},
                    ]);
                }
            });
        }

        return () => clearTimeout(refTimer.current);
    }, [readNFCTag, t, startScanNFC, cancelScanByNfcHandler]);

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

export default useNFCReader;
