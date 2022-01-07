import React from 'react';
import {fireEvent} from '@testing-library/react-native';

import {initAppSize} from '@helpers/layoutFoo';
import asyncEvent from '@jestUtils/asyncEvent';
import renderComponent from '@jestUtils/render';
import {postApiCallMock} from '@utils/testUtils/apiCalls';

import AddingByNumber from '../addingByNumber';
import {routeFalsy, routeTruthly} from './mocks/routeParams';
import initStoreData from './mocks/initStoreData';
import lookupResponse from './mocks/apiResponse';

const FRAME_NUMBER_INPUT_ID = 'frame-number-input';
const ADDING_BY_NUMBER_NEXT_BTN_ID = 'adding-by-number-next-btn';
const EXPECTED_FRAME_NUMBER = '123456789';
const NEW_FRAME_NUMBER = '1234567890';

const mockedNavigate = jest.fn();
const mockedCanGoBack = jest.fn();
const navigationProp = {
    canGoBack: mockedCanGoBack,
    navigate: mockedNavigate,
};
const navigation = () => navigationProp;
const useNavigation = () => ({
    canGoBack: mockedCanGoBack,
    navigate: mockedNavigate,
});

jest.mock('@react-navigation/core', () => {
    const actualNav = jest.requireActual('@react-navigation/core');
    return {
        ...actualNav,
        navigation: navigation,
        useNavigation: useNavigation,
    };
});

describe('<AddingByNumber Screen />', () => {
    beforeAll(() => {
        initAppSize();
    });

    it('When navigated with emptyFrame param euqal true should not render input filled with frame number', async () => {
        const component = await asyncEvent(
            renderComponent(
                <AddingByNumber
                    navigation={navigationProp}
                    route={routeTruthly}
                />,
                undefined,
                initStoreData,
            ),
        );

        expect(component).toMatchSnapshot();

        const frameNumberInput = component.queryByTestId(FRAME_NUMBER_INPUT_ID);

        expect(frameNumberInput).not.toBeNull();
        expect(frameNumberInput.props.value).toEqual('');
    });

    it('When navigated with emptyFrame param euqal false should render input filled with frame number if exists', async () => {
        const component = await asyncEvent(
            renderComponent(
                <AddingByNumber
                    navigation={navigationProp}
                    route={routeFalsy}
                />,
                undefined,
                initStoreData,
            ),
        );

        expect(component).toMatchSnapshot();

        const frameNumberInput = component.queryByTestId(FRAME_NUMBER_INPUT_ID);

        expect(frameNumberInput).not.toBeNull();
        expect(frameNumberInput.props.value).toEqual(EXPECTED_FRAME_NUMBER);
    });

    it('When enter bike number can go to the next screen', async () => {
        const component = await asyncEvent(
            renderComponent(
                <AddingByNumber
                    navigation={navigationProp}
                    route={routeTruthly}
                />,
                undefined,
                initStoreData,
            ),
        );

        expect(component).toMatchSnapshot();

        const frameNumberInput = component.queryByTestId(FRAME_NUMBER_INPUT_ID);

        expect(frameNumberInput).not.toBeNull();
        expect(frameNumberInput.props.value).toEqual('');

        fireEvent.changeText(frameNumberInput, NEW_FRAME_NUMBER);
        const goNextBtn = component.queryByTestId(ADDING_BY_NUMBER_NEXT_BTN_ID);

        expect(goNextBtn).not.toBeNull();
        fireEvent.press(goNextBtn);

        await postApiCallMock(lookupResponse, 'get');

        expect(mockedNavigate).toBeCalledTimes(1);
    });

    it("When input value is empty can't go to the next screen", async () => {
        const component = await asyncEvent(
            renderComponent(
                <AddingByNumber
                    navigation={navigationProp}
                    route={routeTruthly}
                />,
                undefined,
                initStoreData,
            ),
        );

        expect(component).toMatchSnapshot();

        const goNextBtn = component.queryByTestId(ADDING_BY_NUMBER_NEXT_BTN_ID);

        expect(goNextBtn).not.toBeNull();
        fireEvent.press(goNextBtn);

        expect(mockedNavigate).not.toBeCalled();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});
