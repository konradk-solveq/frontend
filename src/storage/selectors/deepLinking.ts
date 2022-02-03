import {RootState} from '@storage/storage';
import {RootStackType} from '@src/type/rootStack';

export const deepLinkingScreenToTakActionSelector = (
    state: RootState,
): keyof RootStackType => state.deepLinking.takeActionOnScreen;
