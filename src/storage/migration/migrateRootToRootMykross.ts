import AsyncStorage from '@react-native-async-storage/async-storage';
import {PersistedState} from 'redux-persist/es/types';
import {BikesState} from '../reducers/bikes';
import {RootState} from '../storage';

/**
 * Do migration if 'root' key exists. Migrate 'bikes' data.
 */
export const migration = async (
    state: PersistedState | RootState,
): Promise<PersistedState | undefined> => {
    try {
        /**
         * Abort if persistConfig version is newer than '1'
         */
        if (state?._persist?.version > 1) {
            return state;
        }

        /**
         * Check 'root' key exists. Abort migration if not.
         */
        const storedState = await AsyncStorage.getItem('persist:root');

        if (!storedState) {
            return state;
        }

        const rehydratedLvl1 = JSON.parse(storedState);
        const newState = {...state};
        /**
         * Check bike data exists and rehydrate.
         */
        if (rehydratedLvl1?.bikes) {
            const rehydratedLvl2: BikesState = JSON.parse(rehydratedLvl1.bikes);

            /**
             * Abort migration if there is no data to merge.
             */
            if (!rehydratedLvl2?.list?.length) {
                return newState;
            }

            const bikesListToMerge = [...rehydratedLvl2.list];
            /**
             * Replace data if there is no bikes list in 'mykross_root' persisted data.
             */
            if (!state?.bikes?.list?.length) {
                newState.bikes = {
                    ...newState.bikes,
                    list: bikesListToMerge,
                };

                return newState;
            }

            /**
             * Merge bikes data.
             */
            const oldBikesList = [...state.bikes.list];
            let mergeBikesList = [...oldBikesList];
            bikesListToMerge.forEach(l => {
                if (!l?.description?.serial_number) {
                    return;
                }

                if (
                    !oldBikesList.find(
                        e =>
                            e?.description?.serial_number !==
                            l.description.serial_number,
                    )
                ) {
                    mergeBikesList.push(l);
                }
            });

            if (!mergeBikesList?.length) {
                return state;
            }

            newState.bikes = {
                ...newState.bikes,
                list: mergeBikesList,
            };

            /**
             * Remove 'root' data.
             */
            await AsyncStorage.removeItem('persist:root');

            return newState;
        }

        return state;
    } catch (error) {
        return state;
    }
};
