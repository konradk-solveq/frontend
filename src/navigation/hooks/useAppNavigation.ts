import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MaterialTabStackType} from '@src/type/materialTabStack';

import {RootStackType} from '@type/rootStack';
import {TabStackType} from '@type/tabStack';

export const useAppNavigation = () =>
    useNavigation<
        StackNavigationProp<RootStackType & TabStackType & MaterialTabStackType>
    >();
