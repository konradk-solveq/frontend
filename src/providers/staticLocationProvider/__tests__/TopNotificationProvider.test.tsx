import React from 'react';
import {Text, Pressable} from 'react-native';
import {fireEvent} from '@testing-library/react-native';

import renderComponent, {
    staticLocationProviderWrapper,
} from '@jestUtils/render';
import asyncEvent from '@jestUtils/asyncEvent';
import TopNotificationProvider, {
    NotificationContext,
    useNotificationContext,
} from '@providers/topNotificationProvider/TopNotificationProvider';

const customRender = (
    children: React.ReactNode,
    {providerProps, ...renderOptions}: any,
) => {
    return staticLocationProviderWrapper(
        <NotificationContext.Provider {...providerProps}>
            {children}
        </NotificationContext.Provider>,
        renderOptions,
    );
};

interface TestComponentIProps {
    message?: string;
}
const TestComponent: React.FC<TestComponentIProps> = ({
    message,
}: TestComponentIProps) => {
    const {
        notificationContennt,
        setNotificationVisibility,
    } = useNotificationContext();

    const onPressHandler = () => {
        if (message) {
            setNotificationVisibility(message);
        }
    };

    return (
        <>
            <Text testID="testComponentText">{notificationContennt}</Text>
            <Pressable testID="testComponentButton" onPress={onPressHandler} />
        </>
    );
};

describe('<TopNotificationProvider />', () => {
    describe('Rendering', () => {
        it('Should render provider', async () => {
            const provider = await asyncEvent(
                staticLocationProviderWrapper(<TopNotificationProvider />),
            );
            expect(provider).toBeTruthy();
        });
    });

    it("Should call context provider's method", async () => {
        const onPress = jest
            .fn()
            .mockImplementationOnce((message: string) => {});

        const providerProps = {
            value: {
                notificationContennt: undefined,
                setNotificationVisibility: onPress,
            },
        };

        const {getByTestId} = await asyncEvent(
            customRender(<TestComponent message="Test message" />, {
                providerProps,
            }),
        );

        const button = getByTestId('testComponentButton');
        fireEvent.press(button);

        expect(onPress).toHaveBeenCalledTimes(1);
    });

    it("Should render context provider's value", async () => {
        const onPress = jest
            .fn()
            .mockImplementationOnce((message: string) => {});

        const providerProps = {
            value: {
                notificationContennt: 'Test message',
                setNotificationVisibility: onPress,
            },
        };

        const {getByText} = await asyncEvent(
            customRender(<TestComponent />, {
                providerProps,
            }),
        );

        const textElement = getByText('Test message');

        expect(textElement).toBeTruthy();
    });

    it("Should render component with provider's value", async () => {
        const component = await asyncEvent(
            renderComponent(<TestComponent message="Test message" />),
        );

        const button = component.getByTestId('testComponentButton');
        fireEvent.press(button);

        const textElement = component.getByTestId('testComponentText');
        expect(textElement).not.toBeNull();

        const text = textElement.props.children;
        expect(text).toEqual('Test message');
    });

    /* TODO: check notification visbility */

    afterAll(() => {
        jest.resetAllMocks();
    });
});
