import 'react-native';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Notification} from '@components/notifications';
import {MykrossIconFont} from '@theme/enums/iconFonts';

const NOTIFICATION_TITLE = 'Example Title';
const NOTIFICATION_SUBTITLE = 'Example subtitle';
const ACTION_TEXT = 'Action Text';

const NOTIFICATION_ICON = MykrossIconFont.MYKROSS_ICON_OK;

const NOTIFICATION_ACTION_TEST_ID = 'notification-action-button';
const SUBTITLE_TEST_ID = 'notification-subtitle';

const mockedAction = jest.fn();

describe('<Notification /> - components/notifications', () => {
    it("Shouldn't render action button or subtitle if they're not passed", () => {
        const {queryByTestId} = render(
            <Notification
                title={NOTIFICATION_TITLE}
                icon={NOTIFICATION_ICON}
            />,
        );

        const actionButton = queryByTestId(NOTIFICATION_ACTION_TEST_ID);
        const subtitle = queryByTestId(SUBTITLE_TEST_ID);

        expect(actionButton).toBeNull();
        expect(subtitle).toBeNull();
    });
    it('Should render action button if action and actionText are passed', () => {
        const {queryByTestId} = render(
            <Notification
                title={NOTIFICATION_TITLE}
                icon={NOTIFICATION_ICON}
                action={mockedAction}
                actionText={ACTION_TEXT}
            />,
        );

        const actionButton = queryByTestId(NOTIFICATION_ACTION_TEST_ID);
        const subtitle = queryByTestId(SUBTITLE_TEST_ID);

        expect(actionButton).not.toBeNull();
        expect(subtitle).toBeNull();
    });
    it("Should render a subtitle if it's passed", () => {
        const {queryByTestId} = render(
            <Notification
                title={NOTIFICATION_TITLE}
                icon={NOTIFICATION_ICON}
                subtitle={NOTIFICATION_SUBTITLE}
            />,
        );

        const actionButton = queryByTestId(NOTIFICATION_ACTION_TEST_ID);
        const subtitle = queryByTestId(SUBTITLE_TEST_ID);

        expect(actionButton).toBeNull();
        expect(subtitle).not.toBeNull();
    });
    it("Should render both action button or subtitle if they're both passed", () => {
        const {queryByTestId} = render(
            <Notification
                title={NOTIFICATION_TITLE}
                icon={NOTIFICATION_ICON}
                subtitle={NOTIFICATION_SUBTITLE}
                action={mockedAction}
                actionText={ACTION_TEXT}
            />,
        );

        const actionButton = queryByTestId(NOTIFICATION_ACTION_TEST_ID);
        const subtitle = queryByTestId(SUBTITLE_TEST_ID);

        expect(actionButton).not.toBeNull();
        expect(subtitle).not.toBeNull();
    });
    it('Should fire the action on action button pressed', () => {
        const {getByTestId} = render(
            <Notification
                title={NOTIFICATION_TITLE}
                icon={NOTIFICATION_ICON}
                action={mockedAction}
                actionText={ACTION_TEXT}
            />,
        );

        const actionButton = getByTestId(NOTIFICATION_ACTION_TEST_ID);

        expect(actionButton).not.toBeNull();

        fireEvent.press(actionButton);

        expect(mockedAction).toBeCalledTimes(1);
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });
});
