import {authMigration} from '@storage/migration/migrateAuthToAuthDataInSecureStore';
import {mockedInitStateMock, mockedStateMock} from './mocks/authDataState';
import {
    spyOnAsyncStorageAndInjectAuthState,
    spyOnAsyncStorageAndInjectAuthStateBeforeAppUpdate,
    spyOnAsyncStorageAndInjectEmptyAuthState,
} from './utils/asyncStorageSpyOn';

describe('REDUX STORE MIGRATION - migrateAuthToAuthDataInSecureStore', () => {
    describe('persist version is lower than 1', () => {
        it('Should migrate data if "auth" storage "userAuthState" is uknown', async () => {
            spyOnAsyncStorageAndInjectAuthState('uknown');

            const result = await authMigration(mockedInitStateMock);

            expect(result).toEqual(mockedStateMock);
        });

        it('Should migrate data if "auth" storage "userAuthState" is undefined', async () => {
            spyOnAsyncStorageAndInjectAuthStateBeforeAppUpdate();

            const result = await authMigration(mockedInitStateMock);

            expect(result).toEqual(mockedStateMock);
        });

        it('Shouldn\'t migrate data if "authData" storage contains session data', async () => {
            spyOnAsyncStorageAndInjectAuthState();

            const result = await authMigration(mockedStateMock);

            expect(result).toEqual(mockedStateMock);
        });

        it('Shouldn\'t migrate data if "auth" storage not contains session data', async () => {
            spyOnAsyncStorageAndInjectEmptyAuthState();

            const result = await authMigration(mockedInitStateMock);

            expect(result).toEqual(mockedInitStateMock);
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });
    });

    describe('persist version is equal ot bigger than 1', () => {
        beforeEach(() => {
            mockedInitStateMock._persist.version = 1;
        });

        it('Shouldn\'t migrate data if "auth" storage contains session data', async () => {
            spyOnAsyncStorageAndInjectAuthState();

            const result = await authMigration(mockedInitStateMock);

            expect(result).toEqual(mockedInitStateMock);
        });

        it('Shouldn\'t migrate data if "authData" storage contains session data', async () => {
            spyOnAsyncStorageAndInjectAuthState();

            const result = await authMigration(mockedStateMock);

            expect(result).toEqual(mockedStateMock);
        });

        it('Shouldn\'t migrate data if "auth" storage not contains session data', async () => {
            spyOnAsyncStorageAndInjectEmptyAuthState();

            const result = await authMigration(mockedInitStateMock);

            expect(result).toEqual(mockedInitStateMock);
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });
    });
});
