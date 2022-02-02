import 'react-native';
import React from 'react';
import RN from 'react-native';
import {fireEvent} from '@testing-library/react-native';
import renderComponent from '@jestUtils/render';
import asyncEvent from '@jestUtils/asyncEvent';
import {initAppSize} from '@helpers/layoutFoo';

import {postApiCallMock} from '@utils/testUtils/apiCalls';
import RouteDetails from '@pages/main/world/routeDetails/routeDetails';
import {
    EDIT_BUTTON_NAVIGATION_ARGS,
    favouriteMapDataRoute,
    featuredMapDataInitialState,
    featuredMapDataRoute,
    MOCK_MAP_NAME,
    MOCK_MAP_RESPONSE,
    plannedMapDataInitialState,
    privateMapDataInitialState,
    privateMapDataRoute,
    publishedMapDataInitialState,
    SHARE_BUTTON_NAVIGATION_ARGS,
    sharedFeaturedMapDataRoute,
    sharedMapDataInitialState,
} from '@pages/main/world/routeDetails/__tests__/mocks/mapDataMock';
import ReactNavigationCore from '@react-navigation/core';
import {Map} from '@models/map.model';

const mockedNavigate = jest.fn();
const mockedCanGoBack = jest.fn();
const mockedAddListener = jest.fn();
const mockedRemoveListener = jest.fn();

const navigationProp = {
    canGoBack: mockedCanGoBack,
    navigate: mockedNavigate,
    addListener: mockedAddListener,
    removeListener: mockedRemoveListener,
};
const navigation = () => navigationProp;
const useNavigation = () => ({
    canGoBack: mockedCanGoBack,
    navigate: mockedNavigate,
    addListener: mockedAddListener,
    removeListener: mockedRemoveListener,
});

const useFocusEffect = () => {};
const useRoute = () => {};
jest.mock('@react-navigation/core', () => {
    const actualNav = jest.requireActual('@react-navigation/core');
    return {
        ...actualNav,
        navigation: navigation,
        useNavigation: useNavigation,
        useRoute: useRoute,
        useFocusEffect: useFocusEffect,
    };
});

const EDIT_BTN_ID = 'route-details-edit-btn';
const SHARE_BTN_ID = 'route-details-share-btn';
const START_BTN_ID = 'route-details-start-btn';
const REMOVE_BTN_ID = 'route-details-remove-btn';

describe('Route details', () => {
    beforeAll(() => {
        initAppSize();
    });

    beforeEach(async () => {
        // mocking Animated ScrollView with a standard react-native ScrollView
        // https://github.com/satya164/react-native-tab-view/issues/1104#issuecomment-932552609
        await jest
            .spyOn(RN.Animated, 'ScrollView', 'get')
            .mockImplementation(() => RN.ScrollView);

        await postApiCallMock();

        mockedNavigate.mockReset();
    });

    it('Should render with map data from redux', async () => {
        await jest
            .spyOn(ReactNavigationCore, 'useRoute')
            .mockReturnValue(featuredMapDataRoute);
        const component = await asyncEvent(
            renderComponent(
                <RouteDetails />,
                undefined,
                featuredMapDataInitialState,
            ),
        );
        const title = component.getByText(MOCK_MAP_NAME);

        expect(title).not.toBeNull();
        expect(component).toMatchSnapshot();
    });

    it('Should render with shared map data', async () => {
        await jest
            .spyOn(ReactNavigationCore, 'useRoute')
            .mockReturnValue(sharedFeaturedMapDataRoute);
        await postApiCallMock<Map>(MOCK_MAP_RESPONSE, 'get');
        const component = await asyncEvent(
            renderComponent(
                <RouteDetails />,
                undefined,
                sharedMapDataInitialState,
            ),
        );
        const title = component.getByText(MOCK_MAP_NAME);

        expect(title).not.toBeNull();
        expect(component).toMatchSnapshot();
    });

    it('Should render edit button on a private map', async () => {
        await jest
            .spyOn(ReactNavigationCore, 'useRoute')
            .mockReturnValue(privateMapDataRoute);
        const component = await asyncEvent(
            renderComponent(
                <RouteDetails />,
                undefined,
                privateMapDataInitialState,
            ),
        );
        const editButton = component.getByTestId(EDIT_BTN_ID);

        expect(editButton).not.toBeNull();

        const title = component.getByText(MOCK_MAP_NAME);

        expect(title).not.toBeNull();

        await asyncEvent(fireEvent.press(editButton));

        /**
         * After clicking the edit button react-navigation moves to edit details screen
         */

        expect(mockedNavigate).toBeCalledTimes(1);
        expect(mockedNavigate).toBeCalledWith(EDIT_BUTTON_NAVIGATION_ARGS);

        expect(component).toMatchSnapshot();
    });

    it('Should render a share button on published map', async () => {
        await jest
            .spyOn(ReactNavigationCore, 'useRoute')
            .mockReturnValue(featuredMapDataRoute);
        const component = await asyncEvent(
            renderComponent(
                <RouteDetails />,
                undefined,
                publishedMapDataInitialState,
            ),
        );
        const title = component.getByText(MOCK_MAP_NAME);

        expect(title).not.toBeNull();

        const shareButton = component.getByTestId(SHARE_BTN_ID);

        expect(shareButton).not.toBeNull();

        await asyncEvent(fireEvent.press(shareButton));

        /**
         * After clicking the share button react-navigation moves to edit details screen
         */

        expect(mockedNavigate).toBeCalledTimes(1);
        expect(mockedNavigate).toBeCalledWith(SHARE_BUTTON_NAVIGATION_ARGS);

        expect(component).toMatchSnapshot();
    });

    it('Should render a start and remove buttons on a planned map', async () => {
        await jest
            .spyOn(ReactNavigationCore, 'useRoute')
            .mockReturnValue(favouriteMapDataRoute);
        const component = await asyncEvent(
            renderComponent(
                <RouteDetails />,
                undefined,
                plannedMapDataInitialState,
            ),
        );
        const title = component.getByText(MOCK_MAP_NAME);

        expect(title).not.toBeNull();

        const startButton = component.getByTestId(START_BTN_ID);

        expect(startButton).not.toBeNull();

        const removeButton = component.getByTestId(REMOVE_BTN_ID);

        expect(removeButton).not.toBeNull();
        expect(component).toMatchSnapshot();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
});
