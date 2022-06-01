import 'react-native';
import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {act} from 'react-test-renderer';
import EditForm from '@containers/World/EditDetailsContainer';
import {
    imagesData,
    options,
    alertData,
} from '@containers/World/__mocks__/editDetailsData';

const ROUTE_NAME_TEST_ID = 'edit-form-id-name-input';
const ROUTE_DESC_TEST_ID = 'edit-form-id-description-input';
const SUBMIT_BUTTON_TEST_ID = 'edit-form-id-submit-button';

const VALID_NAME = 'Test name';
const VALID_DESCRIPTION = 'Test description';

describe('<EditDetailsContainer /> - containers/AddBike/containers/EditDetailsContainer', () => {
    const onPressSubmit = jest.fn();
    const onScrollTop = jest.fn();

    it('Should pass validation when publish is not passed', async () => {
        const {getByTestId} = render(
            <EditForm
                onSubmit={onPressSubmit}
                imagesData={imagesData}
                scrollTop={onScrollTop}
                mapData={undefined}
                options={options}
                alertData={alertData}
            />,
        );

        const nameInput = getByTestId(`${ROUTE_NAME_TEST_ID}-input-value`);
        const descriptionInput = getByTestId(
            `${ROUTE_DESC_TEST_ID}-input-value`,
        );
        const submitButton = getByTestId(SUBMIT_BUTTON_TEST_ID);
        await act(async () => fireEvent.press(submitButton));
        expect(nameInput.props.style[1]?.borderColor).toBeFalsy();
        expect(descriptionInput.props.style[1]?.borderColor).toBeFalsy();
    });

    it('Should not pass validation when publish is passed', async () => {
        const {getByTestId} = render(
            <EditForm
                onSubmit={onPressSubmit}
                imagesData={imagesData}
                scrollTop={onScrollTop}
                mapData={undefined}
                options={options}
                alertData={alertData}
                publish
            />,
        );

        const nameInput = getByTestId(`${ROUTE_NAME_TEST_ID}-input-value`);
        const descriptionInput = getByTestId(
            `${ROUTE_DESC_TEST_ID}-input-value`,
        );
        const submitButton = getByTestId(SUBMIT_BUTTON_TEST_ID);
        await act(async () => fireEvent.press(submitButton));
        expect(nameInput.props.style[1]?.borderColor).toBeTruthy();
        expect(descriptionInput.props.style[1]?.borderColor).toBeTruthy();
    });

    it('Should pass validation when publish is passed and correct values are passed', async () => {
        const {getByTestId} = render(
            <EditForm
                onSubmit={onPressSubmit}
                imagesData={imagesData}
                scrollTop={onScrollTop}
                mapData={undefined}
                options={options}
                alertData={alertData}
                publish
            />,
        );

        const nameInput = getByTestId(`${ROUTE_NAME_TEST_ID}-input-value`);
        fireEvent.changeText(nameInput, VALID_NAME);
        const descriptionInput = getByTestId(
            `${ROUTE_DESC_TEST_ID}-input-value`,
        );
        fireEvent.changeText(descriptionInput, VALID_DESCRIPTION);
        const submitButton = getByTestId(SUBMIT_BUTTON_TEST_ID);
        await act(async () => fireEvent.press(submitButton));
        expect(nameInput.props.style[1]?.borderColor).toBeFalsy();
        expect(descriptionInput.props.style[1]?.borderColor).toBeFalsy();
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });
});
