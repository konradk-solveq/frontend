import React from 'react';

import {ShortCoordsType} from '@type/coords';
import {DataI} from '@hooks/useLocalizationTracker';

type CounterDataType = {
    trackerData: DataI | undefined;
    treackerDataAgregator: ShortCoordsType[];
    pauseTime: number;
};

export const CounterCallbackContext = React.createContext(() => {});
export const CounterDataContext = React.createContext<CounterDataType>({
    trackerData: undefined,
    treackerDataAgregator: [],
    pauseTime: 0,
});
