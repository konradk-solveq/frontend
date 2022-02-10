import AsyncStorage from '@react-native-async-storage/async-storage';
import {PersistedState} from 'redux-persist/es/types';

import {SessionDataType} from '@interfaces/api';
import {jsonParse} from '@utils/transformJson';
import {loggErrorWithScope} from '@sentryLogger/sentryLogger';
import {AuthState} from '@storage/reducers/auth';
import {AuthDataState} from '@storage/reducers/authData';

/**
 * Do migration if 'auth' key exists and contains session data. Migrate to 'authData' secure storage.
 */
export const authMigration = async (
    state: PersistedState & AuthDataState,
): Promise<PersistedState | undefined> => {
    try {
        /**
         * Check 'auth' key exists. Abort migration if not.
         */
        const storedState = await AsyncStorage.getItem('persist:auth');

        if (!storedState) {
            return state;
        }

        const rehydratedLvl1: PersistedState & AuthState = jsonParse(
            storedState,
        );
        const storedStateVersion = jsonParse(rehydratedLvl1?._persist)?.version;

        /**
         * Abort if'auth'  persistConfig version is newer than '0'.
         * We shouldn't check 'authData' persistance version, as on IOS
         * it remains untouched when uninstalling the application (keychain property).
         */
        if (storedStateVersion >= 2) {
            return;
        }

        const sessionData: SessionDataType = jsonParse(
            rehydratedLvl1.sessionData,
        );

        /**
         * It tells that user have not been migrated yet.
         * After update to 2.0.x it's is initial state value.
         *
         * If variable did not exists before set it also as a initState
         */
        const initUserState = rehydratedLvl1?.userAuthState
            ? jsonParse(rehydratedLvl1.userAuthState) === 'uknown'
            : true;

        /**
         * Check auth session data exists and is not migrated.
         */
        if (rehydratedLvl1 && sessionData?.access_token && initUserState) {
            const userId = jsonParse(rehydratedLvl1?.userId);
            const deviceToken = jsonParse(rehydratedLvl1?.deviceToken);
            const recoveryCodes = jsonParse(rehydratedLvl1?.recoveryCodes);

            /**
             * Abort migration if there is no data to merge.
             */
            if (!userId || !deviceToken || !recoveryCodes) {
                return state;
            }

            let newState: PersistedState & Partial<AuthDataState> = {...state};
            /**
             * Copy 'auth' state into 'authData'.
             */
            newState = {
                ...newState,
                sessionData: sessionData,
                deviceToken: deviceToken,
                recoveryCodes: recoveryCodes,
                userId: userId,
            };

            return newState;
        }

        return state;
    } catch (error) {
        console.error('[AUTH MIGRATION]', error);
        loggErrorWithScope(error, 'migrateAuthToAuthDataInSecureStore');
        return state;
    }
};
