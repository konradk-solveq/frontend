import * as SecureStore from 'expo-secure-store';
import {loggErrorWithScope} from '@sentryLogger/sentryLogger';

export interface CreateSecureStorageOptions {
    replacementChar: string;
    replaceFn: (key: string, replacementChar: string) => string;
}

export interface ReduxPersistExpoSecureStorage {
    setItem(key: string, value: string): Promise<void>;

    getItem(key: string): Promise<string | null | undefined>;

    removeItem(key: string): Promise<void>;
}

const defaultReplaceFn = (key: string, replaceCharacter: string) => {
    return key.replace(/[^a-z0-9.\-_]/gi, replaceCharacter);
};

const defaultOptions = {
    replacementChar: '_',
    replaceFn: defaultReplaceFn,
};

export const createSecureStorage = (
    options: CreateSecureStorageOptions = defaultOptions,
): ReduxPersistExpoSecureStorage => {
    return {
        getItem: async key => {
            try {
                return await SecureStore.getItemAsync(
                    options.replaceFn(key, options.replacementChar),
                );
            } catch (error) {
                console.log('[error -- secureStorageGetItem]', error);
                loggErrorWithScope(error, 'secureStorageGetItem');
            }
        },
        setItem: async (key, value) => {
            try {
                await SecureStore.setItemAsync(
                    options.replaceFn(key, options.replacementChar),
                    value,
                );
            } catch (error) {
                console.log('[error -- secureStorageSetItem]', error);
                loggErrorWithScope(error, 'secureStorageSetItem');
            }
        },
        removeItem: async key => {
            try {
                await SecureStore.deleteItemAsync(
                    options.replaceFn(key, options.replacementChar),
                );
            } catch (error) {
                console.log('[error -- secureStorageRemoveItem]', error);
                loggErrorWithScope(error, 'secureStorageRemoveItem');
            }
        },
    };
};

export default createSecureStorage();
