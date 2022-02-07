import 'react-native';
import React from 'react';
import {fireEvent} from '@testing-library/react-native';

import {initAppSize} from '@helpers/layoutFoo';

import WhiteBtn from '@sharedComponents/buttons/WhiteBtn';
import renderComponent from '@jestUtils/render';
import asyncEvent from '@jestUtils/asyncEvent';

describe('<WhiteBtn />', () => {
    describe('Rendering', () => {
        beforeAll(() => {
            initAppSize();
        });

        it('Should match snapshot', async () => {
            const component = await asyncEvent(
                renderComponent(<WhiteBtn title="Test" onPress={() => {}} />),
            );

            expect(component).toMatchSnapshot();
        });

        it('Should match snapshot - with onPress', async () => {
            const onPressFun = jest.fn();
            const component = await asyncEvent(
                renderComponent(<WhiteBtn onPress={onPressFun} title="Test" />),
            );

            expect(component).toMatchSnapshot();
        });

        it('Should match snapshot - with neutralCase', async () => {
            const onPressFun = jest.fn();
            const component = await asyncEvent(
                renderComponent(
                    <WhiteBtn onPress={onPressFun} title="Test" neutralCase />,
                ),
            );
            const text = component.getByText('Test');

            expect(text).not.toBeNull();
            expect(component).toMatchSnapshot();
        });

        it('Should fire onPressEvent', async () => {
            const onPressFun = jest.fn();

            const component = await asyncEvent(
                renderComponent(<WhiteBtn onPress={onPressFun} title="Test" />),
            );

            const whiteBtn = component.getByTestId('white-btn');
            await asyncEvent(fireEvent.press(whiteBtn));

            expect(onPressFun).toBeCalled();

            expect(component).toMatchSnapshot();
        });

        afterEach(() => {
            jest.restoreAllMocks();
            jest.clearAllMocks();
        });
    });
});
