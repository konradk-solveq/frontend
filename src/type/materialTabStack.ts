import {
    RouteProp,
    NavigatorScreenParams,
    CompositeNavigationProp,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

import {
    AuthParamsListT,
    RecordParamsListT,
    GeneralParamsListT,
    KrossWorldParamsListT,
    RootStackType,
} from '@type/rootStack';

type NestedNavigatorParamsT<RootStackType> = NavigatorScreenParams<
    Partial<RootStackType>
>;

/**
 * Compose material top navigation. auth navigation screens and general navigation screens.
 * It gives us autocompletion.
 *
 * Rest of screens can be accessed as nested.
 *
 * @example
 *
 * ```typescript
 *
 * //1st level
 * {
 *     navigation.navigate('WorldBikeMap')
 * }
 *
 * ```
 *
 */
export type MainNavigationCompositePropT<
    ParamsList extends Partial<MaterialTabStackType>,
    RouteName extends keyof MaterialTabStackType = keyof MaterialTabStackType
> = CompositeNavigationProp<
    BottomTabNavigationProp<ParamsList, RouteName>,
    CompositeNavigationProp<
        StackNavigationProp<GeneralParamsListT>,
        StackNavigationProp<AuthParamsListT>
    >
>;

export type NavigatorScreenParamsT<
    ParamsList extends Partial<RootStackType>
> = NavigatorScreenParams<ParamsList>;

export type MaterialTabStackType = {
    WorldBikeMap: NestedNavigatorParamsT<KrossWorldParamsListT>;
    WorldMyRoutes: NestedNavigatorParamsT<KrossWorldParamsListT>;
    WorldPlannedRoutes: NestedNavigatorParamsT<KrossWorldParamsListT>;
};

export type WorldBikeTabRouteT = RouteProp<
    MaterialTabStackType,
    'WorldBikeMap'
>;
export type WorldBikeTabNavigationPropT = BottomTabNavigationProp<
    MaterialTabStackType,
    'WorldBikeMap'
>;

export type WorldMyTabRouteT = RouteProp<MaterialTabStackType, 'WorldMyRoutes'>;
export type WorldMyTabNavigationPropT = BottomTabNavigationProp<
    MaterialTabStackType,
    'WorldMyRoutes'
>;

export type WorldPlannedTabRouteT = RouteProp<
    MaterialTabStackType,
    'WorldPlannedRoutes'
>;
export type WorldPlannedTabNavigationPropT = BottomTabNavigationProp<
    MaterialTabStackType,
    'WorldPlannedRoutes'
>;
