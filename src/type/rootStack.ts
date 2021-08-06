import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RouteMapType} from '../models/places.model';

export type RootStackType = {
    World:
        | {activeTab?: RouteMapType; refreshAfterReactioChanged?: boolean}
        | undefined;
    RoutesMap: {
        activeTab: RouteMapType;
        private?: boolean;
        favourite?: boolean;
    };
    RouteDetails: {mapID: string; private?: boolean; favourite?: boolean};
};

export type WorldRouteType = RouteProp<RootStackType, 'World'>;
export type WorldNavigationPropI = StackNavigationProp<RootStackType, 'World'>;

export type RoutesMapRouteType = RouteProp<RootStackType, 'RoutesMap'>;
export type RoutesMapNavigationPropI = StackNavigationProp<
    RootStackType,
    'RoutesMap'
>;

export type RouteDetailsRouteType = RouteProp<RootStackType, 'RouteDetails'>;
export type RouteDetailsNavigationPropI = StackNavigationProp<
    RootStackType,
    'RouteDetails'
>;
