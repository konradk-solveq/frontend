import {createSelector} from 'reselect';
import {RootState} from '../storage';

export const trackerActiveSelector = (state: RootState): boolean =>
    state.routes.currentRoute.isActive;
