import {AnyAction} from 'redux';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';

import type {RootState} from '@storage/storage';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
