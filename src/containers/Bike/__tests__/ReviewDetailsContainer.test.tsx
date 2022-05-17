import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ReviewDetailsContainer from '@containers/Bike/ReviewDetailsContainer';
import {
    date,
    type,
    info,
    operations,
    warning,
} from '@containers/Bike/__mocks__/bikeWarrantyDetails';

const TEST_TYPE_SEASONAL = 'seasonal';
const TEST_OV_TITLE = 'Test overviews: ';
const TEST_WARNING_ID = 'warranty-icon-warning';
const TEST_APPROVE_ID = 'warranty-icon-approve';
const TEST_TILE_ID = 'services-tile-test-id';
const TEST_PAST_DATE = '2020-02-20';
const TEST_PARSED_DATE = '31.10.2022';

describe('<ReviewDetailsContainer /> - containers', () => {
    const onTilePress = jest.fn();
    const counterStartTime = 1633504705000; //2021-10-06T07:18:25.000Z

    beforeEach(() => {
        jest.spyOn(global.Date, 'now').mockReturnValue(counterStartTime);
    });
    it('Should not render the icon when there is a future date passed', () => {
        const {queryByTestId} = render(
            <ReviewDetailsContainer
                onServicesTilePress={onTilePress}
                date={date} //2022-10-31
                type={type}
                info={info}
                operations={operations}
                warning={warning}
                checkmark={true}
            />,
        );

        const warningIcon = queryByTestId(TEST_WARNING_ID);
        expect(warningIcon).toBe(null);
        const approveIcon = queryByTestId(TEST_APPROVE_ID);
        expect(approveIcon).toBe(null);
    });
    it('Should not render the icon when there is a seasonal type passed', () => {
        const {queryByTestId} = render(
            <ReviewDetailsContainer
                onServicesTilePress={onTilePress}
                date={TEST_PAST_DATE}
                type={TEST_TYPE_SEASONAL}
                info={info}
                operations={operations}
                warning={warning}
                checkmark={true}
            />,
        );

        const warningIcon = queryByTestId(TEST_WARNING_ID);
        expect(warningIcon).toBe(null);
        const approveIcon = queryByTestId(TEST_APPROVE_ID);
        expect(approveIcon).toBe(null);
    });
    it('Should render the approve icon when there is a checkmark value true passed', () => {
        const {queryByTestId} = render(
            <ReviewDetailsContainer
                onServicesTilePress={onTilePress}
                date={TEST_PAST_DATE}
                type={type}
                info={info}
                operations={operations}
                warning={warning}
                checkmark={true}
            />,
        );

        const warningIcon = queryByTestId(TEST_WARNING_ID);
        expect(warningIcon).toBe(null);
        const approveIcon = queryByTestId(TEST_APPROVE_ID);
        expect(approveIcon).not.toBe(null);
    });
    it('Should render the warning icon when there is a checkmark value false passed', () => {
        const {queryByTestId} = render(
            <ReviewDetailsContainer
                onServicesTilePress={onTilePress}
                date={TEST_PAST_DATE}
                type={type}
                info={info}
                operations={operations}
                warning={warning}
                checkmark={false}
            />,
        );

        const warningIcon = queryByTestId(TEST_WARNING_ID);
        expect(warningIcon).not.toBe(null);
        const approveIcon = queryByTestId(TEST_APPROVE_ID);
        expect(approveIcon).toBe(null);
    });
    it('Should not render the date when there is the seasonal type passed', () => {
        const {queryByText} = render(
            <ReviewDetailsContainer
                onServicesTilePress={onTilePress}
                date={date}
                type={TEST_TYPE_SEASONAL}
                info={info}
                operations={operations}
                warning={warning}
                checkmark={false}
            />,
        );

        const dateText = queryByText(TEST_PARSED_DATE);
        expect(dateText).toBe(null);
    });
    it('Should render the date when the type passed is other than seasonal', () => {
        const {queryByText} = render(
            <ReviewDetailsContainer
                onServicesTilePress={onTilePress}
                date={date}
                type={type}
                info={info}
                operations={operations}
                warning={warning}
                checkmark={false}
            />,
        );

        const dateText = queryByText(TEST_PARSED_DATE);
        expect(dateText).not.toBe(null);
    });
    it('Should render the passed overview title', () => {
        const {queryByText} = render(
            <ReviewDetailsContainer
                onServicesTilePress={onTilePress}
                date={date}
                type={type}
                info={info}
                operations={operations}
                warning={warning}
                checkmark={false}
                overviewsTitle={TEST_OV_TITLE}
            />,
        );

        const overviewsTitle = queryByText(TEST_OV_TITLE);
        expect(overviewsTitle).not.toBe(null);
    });
    it('Should fire the pressed onServicesTilePress function on tile press', () => {
        const {getByTestId} = render(
            <ReviewDetailsContainer
                onServicesTilePress={onTilePress}
                date={date}
                type={type}
                info={info}
                operations={operations}
                warning={warning}
                checkmark={false}
                overviewsTitle={TEST_OV_TITLE}
            />,
        );

        fireEvent.press(getByTestId(TEST_TILE_ID));

        expect(onTilePress).toBeCalledTimes(1);
    });
});
