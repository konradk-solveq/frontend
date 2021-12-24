import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    authDataMock,
    emptyAuthSessionDataMock,
} from '../mocks/authenticationData';
import {jsonStringify} from '@utils/transformJson';

export const spyOnAsyncStorageAndInjectAuthState = () => {
    const mockedAuthPersistedState = {
        userId: jsonStringify(authDataMock.userId),
        deviceToken: jsonStringify(authDataMock.deviceToken),
        recoveryCodes: jsonStringify(authDataMock.recoveryCodes),
        isAuth: true,
        sessionData: jsonStringify(authDataMock.sessionData),
        userAuthState: 'mobile',
        _persist: '{"version":-1,"rehydrated":true}',
    };

    spyOnAsyncStorageGetItem(mockedAuthPersistedState);
};

export const spyOnAsyncStorageAndInjectEmptyAuthState = () => {
    const mockedAuthPersistedState = {
        userId: jsonStringify(''),
        deviceToken: jsonStringify(''),
        recoveryCodes: jsonStringify([]),
        isAuth: true,
        sessionData: jsonStringify(emptyAuthSessionDataMock),
        userAuthState: 'mobile',
        _persist: '{"version":-1,"rehydrated":true}',
    };

    spyOnAsyncStorageGetItem(mockedAuthPersistedState);
};

const spyOnAsyncStorageGetItem = (result: any) => {
    jest.spyOn(AsyncStorage, 'getItem').mockResolvedValue(
        jsonStringify(result),
    );
};
