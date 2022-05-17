import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';
import {MykrossIconFont} from '@theme/enums/iconFonts';
import RadioButton from '../RadioButton';
import colors from '@src/theme/colors';

const RADIO_BUTTON_TEST_TEXT = 'Test button';
const RADIO_BUTTON_TEST_IS_SELECTED = true;
const RADIO_BUTTON_BODY_TEST_ID = 'radio-button-test-id-body';
const RADIO_BUTTON_TEXT_COLOR = colors.red;
const RADIO_BUTTON_TEXT_COLOR_DEFAULT = colors.black;

describe('<RadioButton /> - components/buttons', () => {
    const onPressFn = jest.fn();

    it('Should change text color if passed prop', () => {
        const {getByTestId} = render(
            <RadioButton
                text={RADIO_BUTTON_TEST_TEXT}
                textColor={RADIO_BUTTON_TEXT_COLOR}
                icon={
                    RADIO_BUTTON_TEST_IS_SELECTED
                        ? MykrossIconFont.MYKROSS_ICON_RADIAL_ON
                        : MykrossIconFont.MYKROSS_ICON_RADIAL_OFF
                }
                onPress={onPressFn}
            />,
        );

        const radioButtonBody = getByTestId(RADIO_BUTTON_BODY_TEST_ID);
        expect(radioButtonBody.props.style[0].color).toBe(
            RADIO_BUTTON_TEXT_COLOR,
        );
    });

    it('Should render text color as black if not prop is passed', () => {
        const {getByTestId} = render(
            <RadioButton
                text={RADIO_BUTTON_TEST_TEXT}
                icon={
                    RADIO_BUTTON_TEST_IS_SELECTED
                        ? MykrossIconFont.MYKROSS_ICON_RADIAL_ON
                        : MykrossIconFont.MYKROSS_ICON_RADIAL_OFF
                }
                onPress={onPressFn}
            />,
        );

        const radioButtonBody = getByTestId(RADIO_BUTTON_BODY_TEST_ID);
        expect(radioButtonBody.props.style[0].color).toBe(
            RADIO_BUTTON_TEXT_COLOR_DEFAULT,
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });
});
