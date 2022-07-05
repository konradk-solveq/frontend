import {render, fireEvent} from '@testing-library/react-native';
import {NotificationMessage} from '@components/documents';
import {Linking} from 'react-native';
import React from 'react';
import {notifications} from '@components/documents/__mocks__/legalDocuments';

const TEST_REGULATIONS_TEXT = 'Regulations';
const TEST_REGULATIONS_LINK = 'https://kross.eu';
const TEST_EMAIL_TEXT = 'test@example.com';
const TEST_EMAIL_LINK = 'mailto:test@example.com';

describe('<NotificationMessage /> - components/documents', () => {
    const onLinkPressed = jest.fn();

    beforeEach(() => {
        jest.spyOn(Linking, 'openURL').mockImplementation(onLinkPressed);
        jest.mock('react-native-config', () => ({
            DEEPLINKING_NAMESPACE: 'mykross',
        }));
    });

    it('Should fire on press function when clicking on an URL', async () => {
        const {getByText} = render(
            <NotificationMessage message={notifications[0].content} />,
        );

        await fireEvent.press(getByText(TEST_REGULATIONS_TEXT));

        expect(onLinkPressed).toBeCalledWith(TEST_REGULATIONS_LINK);
    });

    it('Should fire on press function when clicking on a mail address', async () => {
        const {getByText} = render(
            <NotificationMessage message={notifications[0].content} />,
        );

        await fireEvent.press(getByText(TEST_EMAIL_TEXT));

        expect(onLinkPressed).toBeCalledWith(TEST_EMAIL_LINK);
    });
});
