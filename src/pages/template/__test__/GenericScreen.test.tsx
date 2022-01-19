import React from 'react';
import {Text, View} from 'react-native';
import {fireEvent, render} from '@testing-library/react-native';

import {initAppSize} from '@helpers/layoutFoo';
import GenericScreen from '../GenericScreen';

const SCREEN_TITLE = 'Generic Screen Test';
const CHILD_TEST_ID = 'GenericScreenChildTestComponent';
const BACK_ARROW_ID = 'TopBackBtn';

const mockedNavigate = jest.fn();
const mockedGoBack = jest.fn();
jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
        navigate: mockedNavigate,
        canGoBack: jest.fn().mockReturnValue(true),
        goBack: mockedGoBack,
    }),
}));

const ChildrenTestComponent: React.FC = () => (
    <Text testID={CHILD_TEST_ID}>Test child component</Text>
);

describe('<BikeSelectorList />', () => {
    describe('Rendering', () => {
        beforeAll(() => {
            initAppSize();
        });

        it('Should match snapshot', () => {
            const component = render(
                <GenericScreen screenTitle={SCREEN_TITLE} />,
            );

            expect(component).toMatchSnapshot();
        });

        it('Should render child component', () => {
            const component = render(
                <GenericScreen screenTitle={SCREEN_TITLE}>
                    <ChildrenTestComponent />
                </GenericScreen>,
            );

            expect(component).toMatchSnapshot();

            const childComponent = component.queryByTestId(CHILD_TEST_ID);
            expect(childComponent).not.toBeNull();
        });

        it('Should hide backArrowBtn', () => {
            const component = render(
                <GenericScreen screenTitle={SCREEN_TITLE} hideBackArrow />,
            );

            expect(component).toMatchSnapshot();

            const backArrowComponent = component.queryByTestId(BACK_ARROW_ID);
            expect(backArrowComponent).toBeNull();
        });

        it('Should render header right action element', () => {
            const testID = 'RightActionElement';
            const component = render(
                <GenericScreen
                    screenTitle={SCREEN_TITLE}
                    navigationRightActionElement={<View testID={testID} />}
                />,
            );

            expect(component).toMatchSnapshot();

            const rightActionElement = component.queryByTestId(testID);
            expect(rightActionElement).not.toBeNull();
        });

        it('Should navigate after press on backArrowBtn', () => {
            const component = render(
                <GenericScreen screenTitle={SCREEN_TITLE} />,
            );

            expect(component).toMatchSnapshot();

            const backArrowComponent = component.queryByTestId(BACK_ARROW_ID);
            expect(backArrowComponent).not.toBeNull();

            if (backArrowComponent) {
                fireEvent.press(backArrowComponent);
                expect(mockedGoBack).toBeCalledTimes(1);
            }
        });

        afterEach(() => {
            jest.clearAllMocks();
        });
    });
});
