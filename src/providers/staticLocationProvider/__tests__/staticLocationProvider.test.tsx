import {Text, Pressable} from 'react-native';
import React from 'react';

import renderComponent, {
    staticLocationProviderWrapper,
} from '@jestUtils/render';
import StaticLocationProvider, {
    useLocationProvider,
    LocationDataContext,
} from '@providers/staticLocationProvider/staticLocationProvider';
import asyncEvent from '@jestUtils/asyncEvent';
import {fireEvent} from '@testing-library/react-native';

const customRender = (
    children: React.ReactNode,
    {providerProps, ...renderOptions}: any,
) => {
    return staticLocationProviderWrapper(
        <LocationDataContext.Provider {...providerProps}>
            {children}
        </LocationDataContext.Provider>,
        renderOptions,
    );
};

const locationData = {
    latitude: 53.008773556173104,
    longitude: 20.89136063395526,
};

interface TestComponentIProps {
    started?: boolean;
}
const TestComponent: React.FC<TestComponentIProps> = ({
    started,
}: TestComponentIProps) => {
    const {location, isTrackingActivatedHandler} = useLocationProvider();

    const onPressHandler = () => {
        isTrackingActivatedHandler(!!started);
    };

    return (
        <>
            <Text testID="testComponentText">{JSON.stringify(location)}</Text>
            <Pressable testID="testComponentButton" onPress={onPressHandler} />
        </>
    );
};

describe('<StaticLocationProvider />', () => {
    describe('Rendering', () => {
        it('Should render provider', async () => {
            const provider = await asyncEvent(
                staticLocationProviderWrapper(<StaticLocationProvider />),
            );

            expect(provider).toBeTruthy();
        });
    });

    it('Should render component with provider', async () => {
        const component = await asyncEvent(renderComponent(<TestComponent />));

        expect(component).toBeTruthy();
        expect(component).toMatchSnapshot();
    });

    it("Should render component with provider's values", async () => {
        const onPress = jest.fn().mockImplementationOnce((a: boolean) => {});

        const providerProps = {
            value: {
                location: locationData,
                isTrackingActivatedHandler: onPress,
            },
        };
        const {getByText, getByTestId} = await asyncEvent(
            customRender(<TestComponent />, {providerProps}),
        );

        const textElement = getByText(JSON.stringify(locationData));

        expect(textElement).toBeTruthy();

        const button = getByTestId('testComponentButton');
        fireEvent.press(button);

        expect(onPress).toHaveBeenCalledTimes(1);
    });
});
