import 'react-native';
import React from 'react';
import {fireEvent} from '@testing-library/react-native';

import {initAppSize} from '@helpers/layoutFoo';

import GenericError from '@sharedComponents/error/GenericError';
import renderComponent from '@jestUtils/render';
import asyncEvent from '@jestUtils/asyncEvent';

const onPressFun = jest.fn();

describe('<GenericError />', () => {
    describe('Rendering', () => {
        beforeAll(() => {
            initAppSize();
        });

        it('Should match snapshot', async () => {
            const component = await asyncEvent(
                renderComponent(<GenericError onButtonPress={onPressFun} />),
            );

            expect(component).toMatchSnapshot();
        });

        it('Should match snapshot with error message', async () => {
            const component = await asyncEvent(
                renderComponent(
                    <GenericError
                        errorMessage={'Test'}
                        errorTitle={'Test'}
                        onButtonPress={onPressFun}
                    />,
                ),
            );

            expect(component).toMatchSnapshot();
        });

        it('Should fire onPressEvent', async () => {
            const component = await asyncEvent(
                renderComponent(<GenericError onButtonPress={onPressFun} />),
            );

            const genericError = component.getByTestId('white-btn');
            await asyncEvent(fireEvent.press(genericError));

            expect(onPressFun).toBeCalled();

            expect(component).toMatchSnapshot();
        });

        afterEach(() => {
            jest.restoreAllMocks();
            jest.clearAllMocks();
        });
    });
});
