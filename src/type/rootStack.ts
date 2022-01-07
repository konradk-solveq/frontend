import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, CompositeNavigationProp} from '@react-navigation/native';

import {TabStackType} from '@type/tabStack';
import {RouteMapType} from '@models/places.model';
import {MapType} from '@models/map.model';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

/* TODO: Complete missing lists params (if needed) */

/**
 * Compose bottom navigation and stack navigation to give us autocompletion.
 *
 * Makes auth screens are available globally.
 */
export type MainNavigationCompositePropT<
    ParamsList extends Partial<RootStackType>,
    RouteName extends keyof RootStackType = keyof RootStackType,
> = CompositeNavigationProp<
    StackNavigationProp<ParamsList, RouteName>,
    CompositeNavigationProp<
        BottomTabNavigationProp<TabStackType>,
        StackNavigationProp<AuthParamsListT>
    >
>;

/* AUTH */
export type AuthParamsListT = {
    RegisterScreen: undefined;
    LoginScreen: undefined;
    ResetPassword: undefined;
};
export type RegistrationRouteT = RouteProp<AuthParamsListT, 'RegisterScreen'>;
export type RegistrationNavigationPropT = MainNavigationCompositePropT<
    AuthParamsListT,
    'RegisterScreen'
>;
export type LoginRouteT = RouteProp<AuthParamsListT, 'LoginScreen'>;
export type LoginNavigationPropT = MainNavigationCompositePropT<
    AuthParamsListT,
    'LoginScreen'
>;
export type ResetPasswordRouteT = RouteProp<AuthParamsListT, 'ResetPassword'>;
export type ResetPasswordNavigationPropT = MainNavigationCompositePropT<
    AuthParamsListT,
    'ResetPassword'
>;
/* AUTH */

/* WORLD */
export type KrossWorldParamsListT = {
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
    MapPreview: {
        mapId?: string;
        private?: boolean;
        favourite?: boolean;
        featured?: boolean;
    };
    EditDetails: {
        mapID?: string;
        private?: boolean;
        redirectTo?: string;
    };
    FeaturedRoutesScreen: {
        sectionID: string;
        sectionName: string;
        featuredMapData?: MapType[];
    };
};
export type RoutesMapRouteT = RouteProp<KrossWorldParamsListT, 'RoutesMap'>;
export type RoutesMapNavigationPropT = MainNavigationCompositePropT<
    KrossWorldParamsListT,
    'RoutesMap'
>;
export type RouteDetailsRouteT = RouteProp<
    KrossWorldParamsListT,
    'RouteDetails'
>;
export type RouteDetailsNavigationPropT = MainNavigationCompositePropT<
    KrossWorldParamsListT,
    'RouteDetails'
>;
export type RoutePreviewRouteT = RouteProp<KrossWorldParamsListT, 'MapPreview'>;
export type RoutePreviewNavigationPropT = MainNavigationCompositePropT<
    KrossWorldParamsListT,
    'MapPreview'
>;
export type EditDetailsRouteT = RouteProp<KrossWorldParamsListT, 'EditDetails'>;
export type EditDetailsNavigationPropT = MainNavigationCompositePropT<
    KrossWorldParamsListT,
    'EditDetails'
>;
export type FeaturedMapsScreenRouteT = RouteProp<
    KrossWorldParamsListT,
    'FeaturedRoutesScreen'
>;
export type FeaturedMapsScreenNavigationPropT = MainNavigationCompositePropT<
    KrossWorldParamsListT,
    'FeaturedRoutesScreen'
>;
/* WORLD */

/* BIKE */
export type BikeParamsListT = {
    BikeParams: {
        description?: string;
    };
    BikeSummary: {
        frameNumber: string;
    };
    BikeData: {
        frameNumber: string;
    };
    WarrantyDetails: undefined;
    ReviewsDetails: undefined;
    AddingInfo: undefined;
    AddingByNumber: {
        emptyFrame?: boolean;
    };
    TutorialNFC: {
        emptyFrame?: boolean;
    };
    ServicesMap: undefined;
};
export type BikeParamsRouteT = RouteProp<BikeParamsListT, 'BikeParams'>;
export type BikeParamsNavigationPropT = MainNavigationCompositePropT<
    BikeParamsListT,
    'BikeParams'
>;
export type BikeSumamryRouteT = RouteProp<BikeParamsListT, 'BikeSummary'>;
export type BikeSumamryNavigationPropT = MainNavigationCompositePropT<
    BikeParamsListT,
    'BikeSummary'
>;
export type BikeDataRouteT = RouteProp<BikeParamsListT, 'BikeData'>;
export type BikeDataNavigationPropT = MainNavigationCompositePropT<
    BikeParamsListT,
    'BikeData'
>;
export type WarantyRouteT = RouteProp<BikeParamsListT, 'WarrantyDetails'>;
export type WarantyNavigationPropT = MainNavigationCompositePropT<
    BikeParamsListT,
    'WarrantyDetails'
>;
export type AddingInfoRouteT = RouteProp<BikeParamsListT, 'AddingInfo'>;
export type AddingInfoNavigationPropT = MainNavigationCompositePropT<
    BikeParamsListT,
    'AddingInfo'
>;
export type AddingByNumberRouteT = RouteProp<BikeParamsListT, 'AddingByNumber'>;
export type AddingByNumberNavigationPropT = MainNavigationCompositePropT<
    BikeParamsListT,
    'AddingByNumber'
>;
export type TutorialNFCRouteT = RouteProp<BikeParamsListT, 'TutorialNFC'>;
export type TutorialNFCNavigationPropT = MainNavigationCompositePropT<
    BikeParamsListT,
    'TutorialNFC'
>;
export type ServicesMapRouteT = RouteProp<BikeParamsListT, 'ServicesMap'>;
export type ServicesMapNavigationPropT = MainNavigationCompositePropT<
    BikeParamsListT,
    'ServicesMap'
>;
/* BIKE */

/* PROFILE */
export type ProfileParamsListT = {
    NameChange: undefined;
    AboutApp: undefined;
    Regulations: undefined;
    PrivacyPolicy: undefined;
    Help: undefined;
    Contact: undefined;
    Consents: undefined;
};
export type NameChangeRouteT = RouteProp<ProfileParamsListT, 'NameChange'>;
export type NameChangeNavigationPropT = MainNavigationCompositePropT<
    ProfileParamsListT,
    'NameChange'
>;
export type AboutAppRouteT = RouteProp<ProfileParamsListT, 'AboutApp'>;
export type AboutAppNavigationPropT = MainNavigationCompositePropT<
    ProfileParamsListT,
    'AboutApp'
>;
export type RegulationsRouteT = RouteProp<ProfileParamsListT, 'Regulations'>;
export type RegulationsNavigationPropT = MainNavigationCompositePropT<
    ProfileParamsListT,
    'Regulations'
>;
export type PrivacyPolicyRouteT = RouteProp<
    ProfileParamsListT,
    'PrivacyPolicy'
>;
export type PrivacyPolicyNavigationPropT = MainNavigationCompositePropT<
    ProfileParamsListT,
    'PrivacyPolicy'
>;
export type HelpRouteT = RouteProp<ProfileParamsListT, 'Help'>;
export type HelpNavigationPropT = MainNavigationCompositePropT<
    ProfileParamsListT,
    'Help'
>;
export type ContactRouteT = RouteProp<ProfileParamsListT, 'Contact'>;
export type ContactNavigationPropT = MainNavigationCompositePropT<
    ProfileParamsListT,
    'Contact'
>;
/* PROFILE */

/* COUNTER */
export type CounterParamsLsitT = {
    Counter: {
        mapID?: string;
        distance?: number;
        time?: number;
        pause?: number;
    };
    CounterThankYouPage: {
        distance?: string;
        time?: number;
        pause?: number;
    };
    ShortRouteScreen: undefined;
};
export type CounterRouteT = RouteProp<CounterParamsLsitT, 'Counter'>;
export type CounterNavigationPropT = MainNavigationCompositePropT<
    CounterParamsLsitT,
    'Counter'
>;
export type CounterThankYouPageRouteT = RouteProp<
    CounterParamsLsitT,
    'CounterThankYouPage'
>;
export type CounterThankYouPageNavigationPropT = MainNavigationCompositePropT<
    CounterParamsLsitT,
    'CounterThankYouPage'
>;
export type ShortRouteScreenRouteT = RouteProp<
    CounterParamsLsitT,
    'ShortRouteScreen'
>;
export type ShortRouteScreenNavigationPropT = MainNavigationCompositePropT<
    CounterParamsLsitT,
    'ShortRouteScreen'
>;
/* COUNTER */

/* GENERAL */
export type GeneralParamsListT = {
    SplashScreen: {
        redirectToScreen?: keyof GeneralParamsListT | keyof AuthParamsListT;
    };
    TabMenu: undefined;
    NewRegulations: undefined;
    NewAppVersion: undefined;
};
export type SplashScreenRouteT = RouteProp<GeneralParamsListT, 'SplashScreen'>;
export type SplashScreenNavigationPropT = MainNavigationCompositePropT<
    GeneralParamsListT,
    'SplashScreen'
>;
export type NewRegulationsScreenRouteT = RouteProp<
    GeneralParamsListT,
    'NewRegulations'
>;
export type NewRegulationsScreenNavigationPropT = MainNavigationCompositePropT<
    GeneralParamsListT,
    'NewRegulations'
>;
export type NewAppVersionScreenRouteT = RouteProp<
    GeneralParamsListT,
    'NewAppVersion'
>;
export type NewAppVersionScreenNavigationPropT = MainNavigationCompositePropT<
    GeneralParamsListT,
    'NewAppVersion'
>;
/* GENERAL */

export type RootStackType = GeneralParamsListT &
    AuthParamsListT &
    KrossWorldParamsListT &
    BikeParamsListT &
    CounterParamsLsitT &
    ProfileParamsListT;
