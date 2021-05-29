import crashlytics from '@react-native-firebase/crashlytics';

export const initCrashlytics = async (username: string, userId: string) => {
    await Promise.all([
        crashlytics().setUserId(userId || 'undefined'),
        crashlytics().setAttributes({
            username: username,
        }),
    ]);
};

export const logger = crashlytics();

export default logger;
