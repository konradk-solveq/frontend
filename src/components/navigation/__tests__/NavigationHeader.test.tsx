import 'react-native';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Navigation from '@react-navigation/native';

import {NavigationHeader} from '@components/navigation';
import ActionButtons from './utils/ActionButtons';

const NAVIGATION_HEADER_TEST_ID = 'navigation-header-test-id';
const NAVIGATION_HEADER_ACTIONS_CONTAINER_TEST_ID = `${NAVIGATION_HEADER_TEST_ID}-actions-container`;
const NAVIGATION_HEADER_BACK_BUTTON_TEST_ID = `${NAVIGATION_HEADER_TEST_ID}-back-button`;
const NAVIGATION_HEADER_CROSS_BUTTON_TEST_ID = `${NAVIGATION_HEADER_BACK_BUTTON_TEST_ID}-cross`;
const NAVIGATION_HEADER_TITLE_TEST_ID = `${NAVIGATION_HEADER_TEST_ID}-title`;

const HEADER_TITLE = 'Header title';
const LEFT_ACTION_BUTON_TEST_ID = 'left-action-button-test-id';
const RIGHT_ACTION_BUTON_TEST_ID = 'right-action-button-test-id';

const mockedOnPressLeftActionButton = jest.fn();
const mockedOnPressRightActionButton = jest.fn();

const mockedNavigate = jest.fn();
const mockedGoBack = jest.fn();
const mockedOnPress = jest.fn();
jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
        canGoBack: jest.fn().mockReturnValue(true),
        goBack: mockedGoBack,
        navigate: mockedNavigate,
    }),
}));

describe('<NavigationHeader /> - components/navigation', () => {
    it('Should render component with passed title', () => {
        const {getByTestId} = render(<NavigationHeader title={HEADER_TITLE} />);

        const headerTitle = getByTestId(NAVIGATION_HEADER_TITLE_TEST_ID);
        expect(headerTitle.props.children).toEqual(HEADER_TITLE);
    });

    it('Should render component with back button', () => {
        const {getByTestId} = render(<NavigationHeader title={HEADER_TITLE} />);

        const backButton = getByTestId(NAVIGATION_HEADER_BACK_BUTTON_TEST_ID);

        fireEvent.press(backButton);
        expect(mockedGoBack).toBeCalledTimes(1);
    });

    it('Should render component without back button', () => {
        const {queryByTestId} = render(
            <NavigationHeader title={HEADER_TITLE} hideBackArrow />,
        );

        const backButton = queryByTestId(NAVIGATION_HEADER_BACK_BUTTON_TEST_ID);

        expect(backButton).toBeNull();
    });

    it('Should render component with cross button', () => {
        const {getByTestId} = render(
            <NavigationHeader title={HEADER_TITLE} showCross />,
        );

        const crossButton = getByTestId(NAVIGATION_HEADER_CROSS_BUTTON_TEST_ID);

        expect(crossButton).not.toBeNull();
        fireEvent.press(crossButton);
        expect(mockedGoBack).toBeCalledTimes(1);
    });

    it('Should render component with actions container', () => {
        const {getByTestId} = render(
            <NavigationHeader
                title={HEADER_TITLE}
                rightActions={
                    <ActionButtons
                        onPressLeft={mockedOnPressLeftActionButton}
                        onPressRight={mockedOnPressRightActionButton}
                    />
                }
            />,
        );

        const actionsContainer = getByTestId(
            NAVIGATION_HEADER_ACTIONS_CONTAINER_TEST_ID,
        );

        expect(actionsContainer).not.toBeNull();

        fireEvent.press(getByTestId(LEFT_ACTION_BUTON_TEST_ID));
        expect(mockedOnPressLeftActionButton).toBeCalledTimes(1);

        fireEvent.press(getByTestId(RIGHT_ACTION_BUTON_TEST_ID));
        expect(mockedOnPressRightActionButton).toBeCalledTimes(1);
    });

    it('When cannot navigate back should render component without back button', () => {
        /* Cannot go back from current screen */
        const actualNav = jest.requireActual('@react-navigation/core');
        jest.spyOn(Navigation, 'useNavigation').mockImplementationOnce(() => ({
            ...actualNav,
            canGoBack: jest.fn().mockReturnValue(false),
        }));

        const {queryByTestId} = render(
            <NavigationHeader title={HEADER_TITLE} />,
        );

        const backButton = queryByTestId(NAVIGATION_HEADER_BACK_BUTTON_TEST_ID);

        expect(backButton).toBeNull();
    });

    it('When cannot navigate back should render component with back button when forced', () => {
        /* Cannot go back from current screen */
        const actualNav = jest.requireActual('@react-navigation/core');
        jest.spyOn(Navigation, 'useNavigation').mockImplementationOnce(() => ({
            ...actualNav,
            canGoBack: jest.fn().mockReturnValue(false),
        }));

        const {getByTestId} = render(
            <NavigationHeader title={HEADER_TITLE} forceBackArrow />,
        );

        const backButton = getByTestId(NAVIGATION_HEADER_BACK_BUTTON_TEST_ID);

        expect(backButton).not.toBeNull();
    });

    it('When cannot navigate back should fire onPress on back button when passed callback funtion', () => {
        /* Cannot go back from current screen */
        const actualNav = jest.requireActual('@react-navigation/core');
        jest.spyOn(Navigation, 'useNavigation').mockImplementationOnce(() => ({
            ...actualNav,
            canGoBack: jest.fn().mockReturnValue(false),
        }));

        const {getByTestId} = render(
            <NavigationHeader
                title={HEADER_TITLE}
                forceBackArrow
                onPress={mockedOnPress}
            />,
        );

        const backButton = getByTestId(NAVIGATION_HEADER_BACK_BUTTON_TEST_ID);

        expect(backButton).not.toBeNull();
        fireEvent.press(backButton);
        expect(mockedOnPress).toBeCalledTimes(1);
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });
});
