import crashlytics from '@react-native-firebase/crashlytics';

import {convertToApiError} from '@utils/apiDataTransform/communicationError';
/* TODO: remove crashlytics logger from project */
export const initCrashlytics = async (username: string, userId: string) => {
    await Promise.all([
        crashlytics().setUserId(userId || 'undefined'),
        crashlytics().setAttributes({
            username: username,
        }),
    ]);
};

export const logger = crashlytics();

export const loggError = (error: any, logName: string) => {
    console.log(`[${logName}] - ${error}`);
    logger.log(`[${logName}] - ${error}`);
    const err = convertToApiError(error);
    logger.recordError(err);
};

export default logger;
