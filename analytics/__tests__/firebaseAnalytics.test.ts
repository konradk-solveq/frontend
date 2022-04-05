import {logEvent} from '@analytics/firebaseAnalytics';

const mockedLogEvent = jest.fn();
jest.mock('@react-native-firebase/analytics', () => {
    return () => ({
        logEvent: mockedLogEvent,
    });
});

describe('[firebaseAnalytics] - @analytics', () => {
    describe('[logEvent()]', () => {
        it('Should log event', async () => {
            await logEvent('custom_event', {});

            expect(mockedLogEvent).toBeCalledTimes(1);
        });

        it('Should log event with payload', async () => {
            const payload = {additional_info: 'data'};
            await logEvent('custom_event', payload);

            expect(mockedLogEvent).toBeCalledWith('custom_event', payload);
        });

        afterEach(() => {
            jest.clearAllMocks();
        });
    });
});
