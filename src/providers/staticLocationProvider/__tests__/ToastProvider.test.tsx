import React from 'react';
import {Pressable} from 'react-native';
import {fireEvent} from '@testing-library/react-native';
import asyncEvent from '@jestUtils/asyncEvent';
import {staticLocationProviderWrapper} from '@jestUtils/render';
import ToastProvider, {
    useToastContext,
    ToastContext,
} from '@providers/ToastProvider/ToastProvider';
import {MykrossIconFont} from '@src/theme/enums/iconFonts';

const mockedToastData = {
    key: 'toast-test',
    title: 'Test title',
    icon: MykrossIconFont.MYKROSS_ICON_DISCOVERY,
};

const TestComponent: React.FC = () => {
    const {addToast} = useToastContext();

    const onPressHandler = () => addToast(mockedToastData);

    return <Pressable testID="provider-test-button" onPress={onPressHandler} />;
};

const customRender = (
    children: React.ReactNode,
    {providerProps, ...renderOptions}: any,
) => {
    return staticLocationProviderWrapper(
        <ToastContext.Provider {...providerProps}>
            {children}
        </ToastContext.Provider>,
        renderOptions,
    );
};

describe('[ToastProvider]', () => {
    it('Should render provider', async () => {
        const provider = await asyncEvent(
            staticLocationProviderWrapper(ToastProvider),
        );
        expect(provider).toBeTruthy();
    });

    it("Should render component with callable provider's addToast method", async () => {
        const onPressMock = jest
            .fn()
            .mockImplementationOnce(mockedToastData => {});

        const providerProps = {
            value: {
                toastList: [],
                addToast: onPressMock,
                removeAllToast: onPressMock,
            },
        };

        const {getByTestId} = await asyncEvent(
            customRender(<TestComponent />, {
                providerProps,
            }),
        );

        const pressable = getByTestId('provider-test-button');
        fireEvent.press(pressable);

        expect(onPressMock).toBeCalledTimes(1);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});
