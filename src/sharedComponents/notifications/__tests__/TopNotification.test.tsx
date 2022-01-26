import 'react-native';
import React from 'react';
import {cleanup, render} from '@testing-library/react-native';

import TopNotification from '@sharedComponents/notifications/TopNotification';

import {renderHook} from '@testing-library/react-hooks';
import useStatusBarHeight from '@src/hooks/statusBarHeight';
import {hookWrapper} from '@jestUtils/render';

const TEST_MESSAGE = 'Test message';

describe('<TopNotification />', () => {
    describe('Rendering', () => {
        beforeEach(() => {
            const {waitForNextUpdate} = renderHook(() => useStatusBarHeight(), {
                wrapper: hookWrapper,
            });

            waitForNextUpdate();
        });

        it('Should match snapshot', async () => {
            const onHide = jest.fn();

            const component = await render(
                <TopNotification
                    content={TEST_MESSAGE}
                    onHideNotification={onHide}
                />,
            );

            expect(component).toMatchSnapshot();

            const notification = component.getByText('Test message');
            expect(notification).not.toBeNull();
        });

        it('Should not show notification without message content', async () => {
            const onHide = jest.fn();

            const component = await render(
                <TopNotification content={''} onHideNotification={onHide} />,
            );

            expect(component).toMatchSnapshot();

            try {
                component.getByText('Test message');
            } catch (error) {
                expect(error.message).toEqual(
                    'Unable to find an element with text: Test message',
                );
            }
        });
    });

    afterAll(() => {
        cleanup();
    });
});
