import 'react-native';
import React from 'react';
import {fireEvent} from '@testing-library/react-native';

import {initAppSize} from '@helpers/layoutFoo';

import RouteDebugBtn from '@sharedComponents/buttons/routeDebugBtn';
import renderComponent from '@jestUtils/render';
import asyncEvent from '@jestUtils/asyncEvent';

jest.mock('../../utils/translations/useMergedTranslation', () => ({
    useMergedTranslation: (val: string) => {
        return {
            t: (str: string) => `${val}.${str}`,
        };
    },
}));

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

            const component = await asyncEvent(
                renderComponent(<RouteDebugBtn onPress={onPressFun} />),
            );

            const routeDebugBtn = component.getByTestId('route-debug-btn');
            await asyncEvent(fireEvent.press(routeDebugBtn));

            expect(onPressFun).toBeCalled();

            expect(component).toMatchSnapshot();
        });

        afterEach(() => {
            jest.restoreAllMocks();
            jest.clearAllMocks();
        });
    });
});
