import crashlytics from '@react-native-firebase/crashlytics';

export const initCrashlytics = async (username: string) => {
    await Promise.all([
        crashlytics().setUserId('undefined'),
        crashlytics().setAttributes({
            username: username,
        }),
    ]);
};

export const logger = crashlytics();

export default logger;
