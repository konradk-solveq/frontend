import {createSelector} from 'reselect';
import {RootState} from '../storage';

export const trackerActiveSelector = (state: RootState): boolean =>
    state.routes.currentRoute.isActive;

export const trackerStartTimeSelector = (state: RootState): Date =>
    new Date(state.routes.currentRoute.startedAt);
