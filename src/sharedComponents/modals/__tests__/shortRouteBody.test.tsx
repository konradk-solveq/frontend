import 'react-native';
import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';

import {initAppSize} from '@helpers/layoutFoo';

import ShortRouteBody from '@sharedComponents/modals/body/shortRouteBody';
import asyncEvent from '@jestUtils/asyncEvent';

/**
 * It seems that function fireEvent.press doesn't respect
 * TouchableOpacity with prop disabled from react-native-gesture-handler,
 * so default platform is set to 'android'
 */
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'android',
    select: () => null,
}));

describe('<ShortRouteBody />', () => {
    describe('Rendering', () => {
        beforeAll(() => {
            initAppSize();
        });

        it('Should match snapshot', async () => {
            const onCloseFun = jest.fn();

            const component = await asyncEvent(
                render(<ShortRouteBody onClose={onCloseFun} />),
            );
            expect(component).toMatchSnapshot();
        });

        it('Should render component with alternative message', async () => {
            const onCloseFun = jest.fn();
            const alterMessage = 'Other message to show';

            const component = await asyncEvent(
                render(
                    <ShortRouteBody
                        onClose={onCloseFun}
                        showAlterMessage={alterMessage}
                    />,
                ),
            );

            const withMessage = component.getByText(alterMessage);
            expect(withMessage).toBeTruthy();

            expect(component).toMatchSnapshot();
        });

        it('Should render component with loader on btn', async () => {
            const onCloseFun = jest.fn();
            const testID = 'red-btn-loader';

            const component = await asyncEvent(
                render(<ShortRouteBody onClose={onCloseFun} withBtnLoader />),
            );

            const withLoader = component.getByTestId(testID);
            expect(withLoader).toBeTruthy();

            expect(component).toMatchSnapshot();
        });

        it('Should render component with disabled btn', async () => {
            const onCloseFun = jest.fn();
            const testID = 'big-red-btn-for-short-route';

            const component = await render(
                <ShortRouteBody onClose={onCloseFun} withBtnLoader />,
            );

            const disabledBtn = component.getByTestId(testID);
            await asyncEvent(fireEvent.press(disabledBtn));
            expect(onCloseFun).not.toHaveBeenCalled();

            expect(component).toMatchSnapshot();
        });

        afterEach(() => {
            jest.resetModules();
        });
    });
});
