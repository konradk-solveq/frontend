import React from 'react';
import {View} from 'react-native';
import {render, fireEvent} from '@testing-library/react-native';

import {MoneySvg} from '@components/svg';
import {PopUp} from '@components/notifications';

const CONTENT_TEXT = 'Hold for 3 seconds\nto finish';

const POPUP_TEST_ID = 'popup-test-id';
/* TODO: add tests for animations - https://docs.swmansion.com/react-native-reanimated/docs/2.1.x/testing */
describe('<PopUp /> - components/notifications', () => {
    const onPressFn = jest.fn();

    it('Should not render any text', async () => {
        const {getByTestId} = render(<PopUp show />);

        const textComponent = getByTestId(`${POPUP_TEST_ID}-text`);
        expect(textComponent.props.children).toEqual('');
    });

    it('Should render passed text', async () => {
        const {getByTestId} = render(<PopUp show text={CONTENT_TEXT} />);
        const textComponent = getByTestId(`${POPUP_TEST_ID}-text`);

        expect(textComponent.props.children).toEqual(CONTENT_TEXT);
    });

    it('Should render passed icon', async () => {
        const testID = 'icon-test-id';

        const {getByTestId} = render(
            <PopUp
                show
                icon={
                    <View testID={testID}>
                        <MoneySvg />
                    </View>
                }
            />,
        );
        const iconComponent = getByTestId(testID);

        expect(iconComponent).not.toBeNull();
    });

    it('Should fire passed function when pressed', async () => {
        const {getByTestId} = render(<PopUp show onPress={onPressFn} />);
        const buttonComponent = getByTestId(`${POPUP_TEST_ID}-press`);

        fireEvent.press(buttonComponent);
        expect(onPressFn).toHaveBeenCalledTimes(1);
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });
});
