import NfcManager, {Ndef, NfcEvents} from 'react-native-nfc-manager';

// Pre-step, call this before any NFC operations
async function initNfc() {
    let isEnabled = await NfcManager.isEnabled();
    let isSupported = await NfcManager.isSupported();
    if (isEnabled && isSupported) {
        await NfcManager.start();
        return true;
    } else {
        return false;
    }
}

async function nfcIsEnabled() {
    return await NfcManager.isEnabled();
}

async function nfcIsSupported() {
    return await NfcManager.isSupported();
}

const cleanUp = () => {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    NfcManager.setEventListener(NfcEvents.SessionClosed, null);
};

function readNdef() {
    return new Promise((resolve, reject) => {
        NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
            let parsed = null;
            if (tag.ndefMessage && tag.ndefMessage.length > 0) {
                // ndefMessage is actually an array of NdefRecords,
                // and we can iterate through each NdefRecord, decode its payload
                // according to its TNF & type
                const ndefRecords = tag.ndefMessage;

                function decodeNdefRecord(record) {
                    if (
                        Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)
                    ) {
                        return [
                            'text',
                            Ndef.text.decodePayload(record.payload),
                        ];
                    } else if (
                        Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_URI)
                    ) {
                        return ['uri', Ndef.uri.decodePayload(record.payload)];
                    }

                    return ['unknown', '---'];
                }

                parsed = ndefRecords.map(decodeNdefRecord);
            }
            // console.log('%c parsed:', 'background: #ffcc00; color: #003300', parsed)

            resolve(parsed);
            // NfcManager.setAlertMessageIOS('NDEF tag found');
            // NfcManager.unregisterTagEvent().catch(() => 0);
        });

        NfcManager.setEventListener(NfcEvents.SessionClosed, () => {
            cleanUp();
            reject('CANCELED');
        });

        // NfcManager.registerTagEvent();
        NfcManager.registerTagEvent({
            readerModeDelay: 1000,
            alertMessage: 'SKANUJ NAKLEJKĘ NFC',
        });
    });
}

export {initNfc, nfcIsEnabled, nfcIsSupported, cleanUp, readNdef};
