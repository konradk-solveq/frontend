import {loggErrorWithScope} from '@sentryLogger/sentryLogger';
import Share, {ShareOptions} from 'react-native-share';

type ShareOptionsT = Pick<ShareOptions, 'message' | 'title' | 'subject'>;

export const callSystemShare = async (
    url: string,
    shareContent?: ShareOptionsT,
    callback?: () => void,
) => {
    try {
        const options: ShareOptions = {
            message: shareContent?.message,
            title: shareContent?.title,
            url: url,
            subject: shareContent?.subject,
        };

        /**
         * There is some issue with this package.
         * I've read that problem probably camse from RN implementation.
         * When use email or clipboard it returnes error
         * even if user action wass succesfull.
         * With whatsapp for example it works correctly.
         *
         * I didn't solve this.
         * It works corectly with 'singleShare' method.
         *
         * https://github.com/react-native-share/react-native-share/issues/1103
         * https://github.com/react-native-share/react-native-share/issues/1112
         *
         *
         */
        const {success, dismissedAction} = await Share.open(options);
        if (success) {
            if (callback) {
                callback();
            }
            return;
        }
    } catch (error: any) {
        /**
         * It shouldn't be used here,
         * but for for some reason even sucesfull action
         * ocurres an error.
         * When dissmised it also throws an error,
         * but should return 'dissmisedAction'
         */
        const falsePositiveError = error?.message === 'User did not share';
        if (falsePositiveError && callback) {
            callback();
        }
        if (!falsePositiveError) {
            console.error('[callSystemShare -- util]', error);
            loggErrorWithScope(error, 'callSystemShare -- util');
        }
    }
};
