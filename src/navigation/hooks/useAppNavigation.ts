import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {RootStackType} from '@type/rootStack';
import {TabStackType} from '@type/tabStack';

export const useAppNavigation = () =>
    useNavigation<StackNavigationProp<RootStackType & TabStackType>>();
