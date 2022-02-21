import {RouteProp} from '@react-navigation/native';

import {RootStackType} from '@type/rootStack';
import {TabStackType} from '@type/tabStack';

export type shareContentT = 'cyclingMap' | 'uknown';

export interface DeepLinkUrlI<T> {
    instance: T;
    shareId?: string;
    shareType?: shareContentT;
}

export type StackCombinedT = RootStackType & TabStackType;

export type RoutePropT<T extends keyof StackCombinedT> = RouteProp<
    StackCombinedT,
    T
>;
