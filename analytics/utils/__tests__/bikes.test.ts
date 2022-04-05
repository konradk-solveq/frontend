import {addBikeEvent} from '@analytics/utils/bikes';

const mockedLogEvent = jest.fn();
jest.mock('@react-native-firebase/analytics', () => {
    return () => ({
        logEvent: mockedLogEvent,
    });
});

describe('[bikes] - @analytics/utils', () => {
    describe('[addBikeEvent()]', () => {
        it('Should log event "bike_add"', async () => {
            await addBikeEvent();

            expect(mockedLogEvent).toBeCalledTimes(1);
        });

        it('Should log event "bike_add" as "bike_add_type" equal to "kross"', async () => {
            await addBikeEvent(true);

            expect(mockedLogEvent).toBeCalledWith('bike_add', {
                bike_add_type: 'kross',
                bike_add_method: 'manual',
            });
        });

        it('Should log event "bike_add" as "bike_add_type" equal to "other"', async () => {
            await addBikeEvent(false);

            expect(mockedLogEvent).toBeCalledWith('bike_add', {
                bike_add_type: 'other',
                bike_add_method: 'manual',
            });
        });

        it('Should log event "bike_add" as "bike_add_method" equal to "nfc"', async () => {
            await addBikeEvent(false, true);

            expect(mockedLogEvent).toBeCalledWith('bike_add', {
                bike_add_type: 'other',
                bike_add_method: 'nfc',
            });
        });

        it('Should log event "bike_add" as "bike_add_method" equal to "manual"', async () => {
            await addBikeEvent(false, false);

            expect(mockedLogEvent).toBeCalledWith('bike_add', {
                bike_add_type: 'other',
                bike_add_method: 'manual',
            });
        });

        afterEach(() => {
            jest.clearAllMocks();
        });
    });
});
