import {
    RouteProp,
    NavigatorScreenParams,
    CompositeNavigationProp,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

import {
    AuthParamsListT,
    BikeParamsListT,
    RecordParamsListT,
    GeneralParamsListT,
    KrossWorldParamsListT,
    ProfileParamsListT,
    RootStackType,
    THPParamsListT,
} from '@type/rootStack';

type NestedNavigatorParamsT<RootStackType> = NavigatorScreenParams<
    Partial<RootStackType>
>;

/**
 * Compose bottom navigation. auth navigation screens and general navigation screens.
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
 *     navigation.navigate('LoginScreen')
 * }
 *
 * //nested
 * {
 *     navigation.navigate('BikeTab', {
 *       screen: 'BikeSummary',
 *       params: {frameNumber: '12345'}
 *     })
 * }
 * ```
 *
 */
export type MainNavigationCompositePropT<
    ParamsList extends Partial<TabStackType>,
    RouteName extends keyof TabStackType = keyof TabStackType
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

export type TabStackType = {
    HomeTab: NestedNavigatorParamsT<GeneralParamsListT>;
    WorldTab: NestedNavigatorParamsT<KrossWorldParamsListT>;
    RecordTab: NestedNavigatorParamsT<RecordParamsListT>;
    BikeTab: NestedNavigatorParamsT<BikeParamsListT>;
    ProfileTab: NestedNavigatorParamsT<ProfileParamsListT>;
    ThankYouPageTab: NestedNavigatorParamsT<THPParamsListT>;
};

export type HomeTabRouteT = RouteProp<TabStackType, 'HomeTab'>;
export type HomeTabNavigationPropT = BottomTabNavigationProp<
    TabStackType,
    'HomeTab'
>;

export type WorldTabRouteT = RouteProp<TabStackType, 'WorldTab'>;
export type WorldTabNavigationPropT = BottomTabNavigationProp<
    TabStackType,
    'WorldTab'
>;

export type RecordTabRouteT = RouteProp<TabStackType, 'RecordTab'>;
export type RecordTabNavigationPropT = BottomTabNavigationProp<
    TabStackType,
    'RecordTab'
>;

export type BikeTabRouteT = RouteProp<TabStackType, 'BikeTab'>;
export type BikeTabNavigationPropT = MainNavigationCompositePropT<
    TabStackType,
    'BikeTab'
>;

export type ProfileTabRouteT = RouteProp<TabStackType, 'ProfileTab'>;
export type ProfileTabNavigationPropT = BottomTabNavigationProp<
    TabStackType,
    'ProfileTab'
>;
