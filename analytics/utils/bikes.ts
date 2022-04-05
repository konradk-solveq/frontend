import {logEvent} from '@analytics/firebaseAnalytics';

/**
 * Log "bike_add" event
 * "bike_add_type" and "bike_add_method" are expected
 * with exact same values by google analytics, so they cannot be changed
 * without braking statistics.
 */
export const addBikeEvent = async (krossBike?: boolean, withNFC?: boolean) => {
    await logEvent('bike_add', {
        bike_add_type: krossBike ? 'kross' : 'other',
        bike_add_method: withNFC ? 'nfc' : 'manual',
    });
};
