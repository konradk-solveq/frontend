import React from 'react';
import {Stack} from './../stack';
import {horizontalAnim} from '../../helpers/positioning';

import SplashScreen from '../../pages/main/splashScreen/splashScreen';
import newRegulations from '../../pages/main/newRegulations/newRegulations';
import ListPageInput from '../../sharedComponents/inputs/listPageInput';
import InputPage from '../../sharedComponents/inputs/inputPage';
import MineMenu from '../../pages/main/mainMenu';

import AddingByNumber from '../../pages/onboarding/bikeAdding/addingByNumber/addingByNumber';
import TurtorialNFC from '../../pages/onboarding/bikeAdding/turtorialNFC/turtorialNFC';
import AddingInfo from '../../pages/onboarding/bikeAdding/info/info';
import BikeData from '../../pages/onboarding/bikeData/bikeData';
import BikeSummary from '../../pages/onboarding/bikeSummary/bikeSummary';
import ServicesMap from '../../pages/main/bike/servicesMap/servicesMap';
import AboutApp from '../../pages/main/profile/aboutApp/aboutApp';
import ReviewsDetails from '../../pages/main/bike/reviewsDetails/reviewsDetails';
import NameChange from '../../pages/main/profile/nameChange/nameChange';
import Counter from '../../pages/main/recording/counter/counter';
import RouteDetails from '../../pages/main/world/routeDetails/routeDetails';
import CounterThankYouPage from '../../pages/main/recording/counterThankYouPage/counterThankYouPage';
import EditDetails from '../../pages/main/world/editDetails/editDetails';
import MapPreview from '../../pages/main/world/routeDetails/mapPreview/mapPreview';
import Regulations from '../../pages/onboarding/permitsDeclarations/regulations';
import PrivacyPolicy from '../../pages/onboarding/permitsDeclarations/privacyPolicy';
import Help from '../../pages//main/profile/help/help';
import Contact from '../../pages//main/profile/contact/contact';

import {RegularStackRoute, BothStackRoute} from '../route';

const RegularStackNavigator: React.FC = () => {
    return (
        <Stack.Navigator
            headerMode="none"
            initialRouteName={RegularStackRoute.SPLASH_SCREEN}
            mode="modal"
            screenOptions={horizontalAnim}>
            <Stack.Screen
                name={RegularStackRoute.SPLASH_SCREEN}
                component={SplashScreen}
            />
            <Stack.Screen
                name={BothStackRoute.MAIN_MENU_SCREEN}
                component={MineMenu}
            />
            <Stack.Screen
                name={RegularStackRoute.NEW_REGULATIONS_SCREEN}
                component={newRegulations}
            />

            {/* Start add bike */}
            <Stack.Screen
                name={BothStackRoute.TURTORIAL_NFC_SCREEN}
                component={TurtorialNFC}
            />
            <Stack.Screen
                name={BothStackRoute.ADDING_BY_NUMBER_SCREEN}
                component={AddingByNumber}
            />
            <Stack.Screen
                name={BothStackRoute.BIKE_DATA_SCREEN}
                component={BikeData}
            />
            <Stack.Screen
                name={BothStackRoute.BIKE_SUMMARY_SCREEN}
                component={BikeSummary}
            />
            <Stack.Screen
                name={BothStackRoute.ADDING_INFO_SCREEN}
                component={AddingInfo}
            />
            <Stack.Screen
                name={RegularStackRoute.SERVICES_MAP_SCREEN}
                component={ServicesMap}
            />
            <Stack.Screen
                name={RegularStackRoute.REVIEWS_DETAILS_SCREEN}
                component={ReviewsDetails}
            />
            <Stack.Screen
                name={BothStackRoute.LIST_PAGE_INPUT_SCREEN}
                component={ListPageInput}
            />
            <Stack.Screen
                name={RegularStackRoute.COUNTER_SCREEN}
                component={Counter}
            />
            <Stack.Screen
                name={RegularStackRoute.COUNTER_THANK_YOU_PAGE_SCREEN}
                component={CounterThankYouPage}
            />
            {/* End add bike */}

            {/* START KROSS WORLD */}
            <Stack.Screen
                name={RegularStackRoute.ROUTE_DETAILS_SCREEN}
                component={RouteDetails}
            />
            <Stack.Screen
                name={RegularStackRoute.MAP_PREVIEW_SCREEN}
                component={MapPreview}
            />
            <Stack.Screen
                name={RegularStackRoute.EDIT_DETAILS_SCREEN}
                component={EditDetails}
            />
            {/* END KROSS WORLD */}

            {/* START KROSS PROFILE */}
            <Stack.Screen
                name={RegularStackRoute.NAME_CHANGE_SCREEN}
                component={NameChange}
            />
            <Stack.Screen
                name={RegularStackRoute.ABOUT_APP_SCREEN}
                component={AboutApp}
            />
            <Stack.Screen
                name={BothStackRoute.REGULATIONS_SCREEN}
                component={Regulations}
            />
            <Stack.Screen
                name={BothStackRoute.PRIVACY_POLICY_SCREEN}
                component={PrivacyPolicy}
            />
            <Stack.Screen
                name={RegularStackRoute.HELP_SCREEN}
                component={Help}
            />
            <Stack.Screen
                name={RegularStackRoute.CONTACT_SCREEN}
                component={Contact}
            />
            {/* END KROSS PROFILE */}

            {/* univesal/generic pages */}
            <Stack.Screen
                name={BothStackRoute.INPUT_PAGE_SCREEN}
                component={InputPage}
            />
        </Stack.Navigator>
    );
};

export default RegularStackNavigator;
