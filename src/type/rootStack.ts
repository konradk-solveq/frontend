import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RouteMapType} from '../models/places.model';
import {MapType} from '@src/models/map.model';

export type RootStackType = {
    World:
        | {activeTab?: RouteMapType; refreshAfterReactioChanged?: boolean}
        | undefined;
    RoutesMap: {
        activeTab: RouteMapType;
        private?: boolean;
        favourite?: boolean;
        featured?: boolean;
    };
    RouteDetails: {
        mapID: string;
        sectionID?: string;
        private?: boolean;
        favourite?: boolean;
        featured?: boolean;
    };
    EditDetails: {
        mapID?: string;
        private?: boolean;
        redirectTo?: string;
    };
    FeaturedMapsScreen: {
        sectionID: string;
        sectionName: string;
        featuredMapData?: MapType[];
    };
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

export type EditDetailsRouteType = RouteProp<RootStackType, 'EditDetails'>;
export type EditDetailsNavigationPropI = StackNavigationProp<
    RootStackType,
    'EditDetails'
>;

export type FeaturedMapsScreenRouteType = RouteProp<
    RootStackType,
    'FeaturedMapsScreen'
>;
export type FeaturedMapsScreenNavigationPropI = StackNavigationProp<
    RootStackType,
    'FeaturedMapsScreen'
>;
