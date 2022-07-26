import 'react-native';
import React from 'react';
import {fireEvent} from '@testing-library/react-native';

import ErrorModal from '@components/modals/ErrorModal';
import renderComponent from '@jestUtils/render';
import asyncEvent from '@jestUtils/asyncEvent';

const ERROR_MODAL_TEST_ID = 'error-modal-test-id';

const onHandleClose = jest.fn();
const onHandleRetry = jest.fn();

describe('<ErrorModal />', () => {
    describe('Rendering', () => {
        it('Should show error message if provided prop', async () => {
            const component = await asyncEvent(
                renderComponent(
                    <ErrorModal
                        showModal={true}
                        errorTitle={'Error Title'}
                        errorMessage={'Error Message'}
                        handleClose={onHandleClose}
                    />,
                ),
            );

            const errorTitle = component.getByTestId(
                `${ERROR_MODAL_TEST_ID}-error-message`,
            );

            expect(errorTitle).not.toBeNull();
        });

        it('Should call on close action', async () => {
            const component = await renderComponent(
                <ErrorModal
                    showModal={true}
                    errorTitle={'Error Title'}
                    handleClose={onHandleClose}
                />,
            );

            const closeButton = component.getByTestId(
                `${ERROR_MODAL_TEST_ID}-close-button`,
            );

            fireEvent.press(closeButton);
            expect(onHandleClose).toBeCalledTimes(1);
        });

        it('Should call on retry action', async () => {
            const component = await renderComponent(
                <ErrorModal
                    showModal={true}
                    errorTitle={'Error Title'}
                    handleClose={onHandleClose}
                    handleRetryAction={onHandleRetry}
                />,
            );

            const retryButton = component.getByTestId(
                `${ERROR_MODAL_TEST_ID}-retry-button`,
            );

            fireEvent.press(retryButton);
            expect(onHandleRetry).toBeCalledTimes(1);
        });

        afterEach(() => {
            jest.restoreAllMocks();
            jest.clearAllMocks();
        });
    });
});
