export const AuthStackRoute = {
    REGISTER_SCREEN: 'RegisterScreen',
    LOGIN_SCREEN: 'LoginScreen',
    RESET_PASSWORD_SCREEN: 'ResetPassword',
};

export const OnboardingStackRoute = {
    NEW_BEGINNING_SCREEN: 'Tutorial',
    PERMITS_SCREEN: 'Permits',
    GET_TO_KNOW_EACH_OTHER_SCREEN: 'GetToKnowEachOther',

    // not used jet
    ONBOARDING_REGISTER_SCREEN: 'OnboardingRegister',
    ONBOARDING_LOGIN_SCREEN: 'OnboardingLogin',
    ONBAORDING_RESET_PASSWORD_SCREEN: 'OnbaordingResetPassword',
    CYCLING_PROFILE_SCREEN: 'CyclingProfile',

    // Bike + Onboarding
    TURTORIAL_NFC_ONBOARDING_SCREEN: 'TutorialNFCOnboarding',
    ADDING_BY_NUMBER_ONBOARDING_SCREEN: 'AddingByNumberOnboarding',
    BIKE_DATA_ONBOARDING_SCREEN: 'BikeDataOnboarding',
    BIKE_SUMMARY_ONBOARDING_SCREEN: 'BikeSummaryOnboarding',
    ADDING_INFO_ONBOARDING_SCREEN: 'AddingInfoOnboarding',
    INPUT_PAGE_ONBOARDING_SCREEN: 'InputPageOnboarding',
    LIST_PAGE_INPUT_ONBOARDING_SCREEN: 'ListPageInputOnboarding',

    // Profile + Onboarding
    REGULATIONS_ONBOARDING_SCREEN: 'RegulationsOnboarding',
    PRIVACY_POLICY_ONBOARDING_SCREEN: 'PrivacyPolicyOnboarding',

    TAB_MENU_ONBOARDING_SCREEN: 'TabMenuOnboarding',
};

export const RegularStackRoute = {
    TAB_MENU_SCREEN: 'TabMenu',

    SPLASH_SCREEN: 'SplashScreen',
    NEW_REGULATIONS_SCREEN: 'newRegulations',
    NEW_APP_VERSION_SCREEN: 'NewAppVersion',

    // Home
    HOME_SCREEN: 'HomeTab',

    // World
    KROSS_WORLD_SCREEN: 'WorldTab',
    ROUTE_DETAILS_SCREEN: 'RouteDetails',
    EDIT_DETAILS_SCREEN: 'EditDetails',
    MAP_PREVIEW_SCREEN: 'MapPreview',
    COUNTER_SCREEN: 'Counter',
    COUNTER_THANK_YOU_PAGE_SCREEN: 'CounterThankYouPage',
    ROUTES_MAP_SCREEN: 'RoutesMap',
    FEATURED_ROUTES_SCRREN: 'FeaturedRoutesScreen',
    SHORT_ROUTE_SCREEN: 'ShortRouteScreen',
    SHARE_ROUTE_SCREEN: 'ShareRouteScreen',

    // Bike
    BIKE_SCREEN: 'BikeTab',
    SERVICES_MAP_SCREEN: 'ServicesMap',
    REVIEWS_DETAILS_SCREEN: 'ReviewsDetails',
    BIKE_PARAMS_SCREEN: 'BikeParams',
    WARRANTY_DETAILS_SCREEN: 'WarrantyDetails',
    ADD_BIKE_SCREEN: 'AddBike',
    ADDING_BY_NUMBER_SCREEN: 'AddBikeByNumber',
    BIKE_DATA_SCREEN: 'BikeData',
    BIKE_SUMMARY_SCREEN: 'BikeSummary',
    ADDING_INFO_SCREEN: 'AddingInfo',
    INPUT_PAGE_SCREEN: 'InputPage',
    LIST_PAGE_INPUT_SCREEN: 'ListPageInput',

    // Profile
    PROFILE_SCREEN: 'ProfileTab',
    NAME_CHANGE_SCREEN: 'NameChange',
    LANGUAGE_CHANGE_SCREEN: 'LanguageChange',
    ABOUT_APP_SCREEN: 'AboutApp',
    HELP_SCREEN: 'Help',
    CONTACT_SCREEN: 'Contact',
    CONSENTS_SCREEN: 'Consents',
    REGULATIONS_SCREEN: 'Regulations',
    PRIVACY_POLICY_SCREEN: 'PrivacyPolicy',
};

export const KrossWorldTabRoute = {
    BIKE_MAP_SCREEN: 'WorldBikeMap',
    MY_ROUTES_SCREEN: 'WorldMyRoutes',
    PLANNING_SCREEN: 'WorldPlannedRoutes',
};

/**
 * TODO: those names are duplicated in 'RegularStackRoute'
 * and should be deleted in the future.
 */
export const BothStackRoute = {
    TAB_MENU_SCREEN: 'TabMenu',

    // Bike + Onboarding
    TURTORIAL_NFC_SCREEN: 'TutorialNFC',
    ADDING_BY_NUMBER_SCREEN: 'AddingByNumber',
    BIKE_DATA_SCREEN: 'BikeData',
    BIKE_SUMMARY_SCREEN: 'BikeSummary',
    ADDING_INFO_SCREEN: 'AddingInfo',
    INPUT_PAGE_SCREEN: 'InputPage',
    LIST_PAGE_INPUT_SCREEN: 'ListPageInput',

    // Profile + Onboarding
    REGULATIONS_SCREEN: 'Regulations',
    PRIVACY_POLICY_SCREEN: 'PrivacyPolicy',
};

export const CyclingProfileRoute = {
    CYCLING_PROFILE_VIEW_SCREEN: 'CyclingProfileView',
    CYCLING_PROFILE_SETTINGS_SCREEN: 'CyclingProfileSettings',
};
