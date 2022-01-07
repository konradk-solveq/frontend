import {RootState} from '@storage/storage';
import {Consent} from '@models/consents.model';

export const consentsListSelector = (state: RootState): Consent[] =>
    state.consents.consents;

export const loadingConsentsSelector = (state: RootState): boolean =>
    state.consents.loading;

export const errorConsentsSelector = (state: RootState): string =>
    state.consents.error;
