import React from 'react';
import {DataI} from '../../../../../../hooks/useLocalizationTracker';

export const CounterCallbackContext = React.createContext(() => {});
export const CounterDataContext = React.createContext<DataI | undefined>(
    undefined,
);
