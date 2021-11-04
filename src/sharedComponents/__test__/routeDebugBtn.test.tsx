import 'react-native';
import React from 'react';
import {fireEvent} from '@testing-library/react-native';

import {initAppSize} from '@helpers/layoutFoo';

import RouteDebugBtn from '@sharedComponents/buttons/routeDebugBtn';
import renderComponent from '@jestUtils/render';
import asyncEvent from '@jestUtils/asyncEvent';

describe('<RouteDebugBtn />', () => {
    describe('Rendering', () => {
        beforeAll(() => {
            initAppSize();
        });

        it('Should match snapshot', async () => {
            const component = await asyncEvent(
                renderComponent(<RouteDebugBtn />),
            );

            expect(component).toMatchSnapshot();
        });

        it('Should match snapshot - with onPress', async () => {
            const onPressFun = jest.fn();
            const component = await asyncEvent(
                renderComponent(<RouteDebugBtn onPress={onPressFun} />),
            );

            expect(component).toMatchSnapshot();
        });

        it('Should fire onPressEvent', async () => {
            const onPressFun = jest.fn();

            const {getByTestId} = await asyncEvent(
                renderComponent(<RouteDebugBtn onPress={onPressFun} />),
            );

            const likeBtn = getByTestId('route-debug-btn');
            await asyncEvent(fireEvent.press(likeBtn));

            expect(onPressFun).toBeCalled();
        });

        afterEach(() => {
            jest.restoreAllMocks();
            jest.clearAllMocks();
        });
    });
});
