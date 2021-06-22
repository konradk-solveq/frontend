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
import RewiewsDetails from '../../pages/main/bike/rewiewsDetails/rewiewsDetails';
import NameChange from '../../pages/main/profile/nameChange/nameChange';
import Counter from '../../pages/main/recording/counter/counter';
import RouteDetails from '../../pages/main/world/routeDetails/routeDetails';
import CounterThankYouPage from '../../pages/main/recording/counterThankYouPage/counterThankYouPage';
import EditDetails from '../../pages/main/world/editDetails/editDetails';
import {RegularStackRoute} from '../route';
import MapPreview from '../../pages/main/world/routeDetails/mapPreview/mapPreview';
import Regulations from '../../pages/onboarding/permitsDeclarations/regulations';
import PrivacyPolicy from '../../pages/onboarding/permitsDeclarations/privacyPolicy';
import Contact from '../../pages//main/profile/contact/contact';

const RegularStackNavigator: React.FC = () => {
    return (
        <Stack.Navigator
            headerMode="none"
            initialRouteName="SplashScreen"
            mode="modal"
            screenOptions={horizontalAnim}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="MineMenu" component={MineMenu} />
            <Stack.Screen name="newRegulations" component={newRegulations} />

            {/* Start add bike */}
            <Stack.Screen name="AddingByNumber" component={AddingByNumber} />
            <Stack.Screen name="TurtorialNFC" component={TurtorialNFC} />
            <Stack.Screen name="AddingInfo" component={AddingInfo} />
            <Stack.Screen name="BikeData" component={BikeData} />
            <Stack.Screen name="BikeSummary" component={BikeSummary} />
            <Stack.Screen name="ServicesMap" component={ServicesMap} />
            <Stack.Screen name="AboutApp" component={AboutApp} />
            <Stack.Screen name="RewiewsDetails" component={RewiewsDetails} />
            <Stack.Screen name="NameChange" component={NameChange} />
            <Stack.Screen name="Counter" component={Counter} />
            <Stack.Screen
                name="CounterThankYouPage"
                component={CounterThankYouPage}
            />
            {/* End add bike */}

            {/* START KROSS WORLD */}
            <Stack.Screen name="RouteDetailsScreen" component={RouteDetails} />
            <Stack.Screen
                name={RegularStackRoute.MAP_PREVIEW_SCREEN}
                component={MapPreview}
            />
            <Stack.Screen
                name={RegularStackRoute.EDIT_DETAILS_SCREEN}
                component={EditDetails}
            />
            {/* END KROSS WORLD */}

            {/* univesal/generic pages */}
            <Stack.Screen name="ListPageInput" component={ListPageInput} />
            <Stack.Screen name="InputPage" component={InputPage} />
            <Stack.Screen name="Regulations" component={Regulations} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            <Stack.Screen name="Contact" component={Contact} />
        </Stack.Navigator>
    );
};

export default RegularStackNavigator;
