import React from 'react';

import {DataI} from '@hooks/useLocalizationTracker';

type CounterDataType = {
    trackerData: DataI | undefined;
    pauseTime: number;
};

export const CounterCallbackContext = React.createContext(() => {});
export const CounterDataContext = React.createContext<CounterDataType>({
    trackerData: undefined,
    pauseTime: 0,
});
