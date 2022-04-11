import 'react-native';
import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';

import asyncEvent from '@jestUtils/asyncEvent';
import {AddBikeModal} from '@pages/main/bike/components/modal';

const ADD_BIKE_MODAL_ID = 'add-bike-modal-id';
const ADD_BIKE_MODAL_TILE_ID = `${ADD_BIKE_MODAL_ID}-add-bike-tile`;

const onAddBikeFn = jest.fn();
const onAddOtherBikeFn = jest.fn();
const onCloseFn = jest.fn();

describe('<AddBikeModal /> - @pages/main/bike/components/modal', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    it('Should render visible modal', async () => {
        const {getByTestId} = await renderComponent(TestComponent);
        jest.advanceTimersByTime(0);

        const component = getByTestId(ADD_BIKE_MODAL_ID);

        expect(component.props.visible).toBeTruthy();
    });

    it('Should call action on press addBike', async () => {
        const {getByTestId} = await renderComponent(TestComponent);

        const component = getByTestId(
            `${ADD_BIKE_MODAL_TILE_ID}-primary-button`,
        );

        fireEvent.press(component);
        expect(onAddBikeFn).toBeCalledTimes(1);
    });

    it('Should call action on press addOtherBike', async () => {
        const {getByTestId} = await renderComponent(TestComponent);

        const component = getByTestId(
            `${ADD_BIKE_MODAL_TILE_ID}-secondary-button`,
        );

        fireEvent.press(component);
        expect(onAddOtherBikeFn).toBeCalledTimes(1);
    });

    it('Should call action on press close', async () => {
        const {getByTestId} = await renderComponent(TestComponent);

        const component = getByTestId('icon-btn-test-id');

        fireEvent.press(component);
        expect(onCloseFn).toBeCalledTimes(1);
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
        jest.clearAllTimers();
    });
});

interface IProps {
    showModal?: boolean;
    height?: number;
}

const TestComponent = ({showModal = true, height}: IProps) => (
    <AddBikeModal
        showModal={showModal}
        onAddBike={onAddBikeFn}
        onAddOtherBike={onAddOtherBikeFn}
        onClose={onCloseFn}
        height={height}
    />
);

const renderComponent = async (
    Component: React.FunctionComponent<IProps>,
    props?: IProps,
) => {
    return await asyncEvent(render(<Component {...props} />));
};
