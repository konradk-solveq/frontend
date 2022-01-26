import 'react-native';
import React from 'react';
import {Text} from 'react-native';
import {fireEvent, render} from '@testing-library/react-native';

import {useMergedTranslation} from '@utils/translations/useMergedTranslation';

import ErrorBoundary from '../ErrorBoundary';

const RESET_BUTTON_ID = 'error-boundary-reset-button';
const RESTART_BUTTON_ID = 'error-boundary-restart-button';

describe('<ErrorBoundary />', () => {
    let consoleErrorSpyOn: jest.SpyInstance;
    let errorMock: Error;
    const {t} = useMergedTranslation('ErrorBoundary');

    describe('Rendering', () => {
        beforeAll(() => {
            consoleErrorSpyOn = jest
                .spyOn(console, 'error')
                .mockImplementation(() => {});
            errorMock = new Error('This is a test error!');
        });

        it('Should match snapshot - render', async () => {
            const component = await render(
                <ErrorBoundary>
                    <Text>Child component</Text>
                </ErrorBoundary>,
            );

            expect(component).toMatchSnapshot();
        });

        describe('When error occurs', () => {
            it('Should catch error and render message', async () => {
                const component = await render(
                    <ErrorBoundary>
                        <Text>{errorMock}</Text>
                    </ErrorBoundary>,
                );

                const header = component.getByText(t('header'));
                expect(header).not.toBeNull();

                const body = component.getByText(t('body'));
                expect(body).not.toBeNull();

                const resetBtn = component.getByTestId(RESET_BUTTON_ID);
                expect(resetBtn).not.toBeNull();

                const restartbtn = component.getByTestId(RESTART_BUTTON_ID);
                expect(restartbtn).not.toBeNull();

                expect(component).toMatchSnapshot();
            });

            it('Should fire onErrorHandler when pass as prop and error occured', async () => {
                const onErrorSpyOn = jest.fn();

                const component = await render(
                    <ErrorBoundary onError={onErrorSpyOn}>
                        <Text>{errorMock}</Text>
                    </ErrorBoundary>,
                );

                const resetBtn = component.getByTestId(RESET_BUTTON_ID);
                expect(resetBtn).not.toBeNull();

                fireEvent.press(resetBtn);
                expect(onErrorSpyOn).toBeCalled();

                expect(component).toMatchSnapshot();
            });
        });
    });

    afterAll(() => {
        consoleErrorSpyOn.mockRestore();
    });
});
