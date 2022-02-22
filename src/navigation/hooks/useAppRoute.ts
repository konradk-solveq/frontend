import {RouteProp, useRoute} from '@react-navigation/native';

import {StackCombinedT} from '@type/navigation';

export const useAppRoute = <T extends keyof StackCombinedT>() =>
    useRoute<RouteProp<StackCombinedT, T>>();
