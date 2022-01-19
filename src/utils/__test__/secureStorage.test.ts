import SecureStorage from '@utils/secureStorage/SecureStorage';
import SecureStore from 'expo-secure-store';

describe('secureStorage -- utils', () => {
    describe('[setItemAsync]', () => {
        it('Should add an item to the secure store', async () => {
            jest.spyOn(
                SecureStore,
                'setItemAsync',
            ).mockImplementation((key: string, value: string) =>
                Promise.resolve(),
            );

            const result = await SecureStorage.setItem('key', 'value');

            expect(result).toEqual(undefined);
        });
    });
    describe('[getItemAsync]', () => {
        it('Should get an item from the secure store', async () => {
            const expectedValue = '200';

            jest.spyOn(
                SecureStore,
                'getItemAsync',
            ).mockImplementation((key: string) =>
                Promise.resolve(expectedValue),
            );

            const result = await SecureStorage.getItem('key');

            expect(result).toEqual(expectedValue);
        });
    });
    describe('[deleteItemAsync]', () => {
        it('Should remove an item from the secure store', async () => {
            jest.spyOn(
                SecureStore,
                'deleteItemAsync',
            ).mockImplementation((key: string) => Promise.resolve());

            const result = await SecureStorage.removeItem('key');

            expect(result).toEqual(undefined);
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });
});
