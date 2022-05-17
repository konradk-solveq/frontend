import React from 'react';
import 'react-native';
import LanguageButton from '../languageChange/languageButton';
import asyncEvent from '@jestUtils/asyncEvent';
import renderComponent from '@jestUtils/render';
import {MOCK_COUNTRY_ICON} from './__mocks__/svgMock';

const LANGUAGE_BUTTON_TEST_KEY = 'LANG_BUTTON_KEY';
const LANGUAGE_BUTTON_TEST_ACTIVE = true;
const LANGUAGE_BUTTON_TEST_ONPRESS = jest.fn();
const LANGUAGE_BUTTON_TEST_TITLE = 'Românesc';
const LANGUAGE_BUTTON_TEST_SVG = MOCK_COUNTRY_ICON;
const LANGUAGE_BUTTON_TEST_SEPARATOR = false;

describe('LanguageButton', () => {
    it('Should render country icon when passed svg prop', async () => {
        const {getByTestId} = await asyncEvent(
            renderComponent(
                <LanguageButton
                    key={LANGUAGE_BUTTON_TEST_KEY}
                    active={LANGUAGE_BUTTON_TEST_ACTIVE}
                    onPress={LANGUAGE_BUTTON_TEST_ONPRESS}
                    title={LANGUAGE_BUTTON_TEST_TITLE}
                    svg={LANGUAGE_BUTTON_TEST_SVG}
                    separator={LANGUAGE_BUTTON_TEST_SEPARATOR}
                />,
            ),
        );

        const countryIcon = getByTestId('language-button-test-country-icon');
        expect(countryIcon).not.toBeNull();
    });

    it('Should render passed title', async () => {
        const {getByTestId} = await asyncEvent(
            renderComponent(
                <LanguageButton
                    key={LANGUAGE_BUTTON_TEST_KEY}
                    active={LANGUAGE_BUTTON_TEST_ACTIVE}
                    onPress={LANGUAGE_BUTTON_TEST_ONPRESS}
                    title={LANGUAGE_BUTTON_TEST_TITLE}
                    svg={LANGUAGE_BUTTON_TEST_SVG}
                    separator={LANGUAGE_BUTTON_TEST_SEPARATOR}
                />,
            ),
        );

        const languageText = getByTestId('language-button-test-country-text');
        expect(languageText.props.children).toEqual(LANGUAGE_BUTTON_TEST_TITLE);
    });

    it('Should render checkbox if active', async () => {
        const {getByTestId} = await asyncEvent(
            renderComponent(
                <LanguageButton
                    key={LANGUAGE_BUTTON_TEST_KEY}
                    active={LANGUAGE_BUTTON_TEST_ACTIVE}
                    onPress={LANGUAGE_BUTTON_TEST_ONPRESS}
                    title={LANGUAGE_BUTTON_TEST_TITLE}
                    svg={LANGUAGE_BUTTON_TEST_SVG}
                    separator={LANGUAGE_BUTTON_TEST_SEPARATOR}
                />,
            ),
        );

        const activeCheckbox = getByTestId('language-button-test-active-icon');
        expect(activeCheckbox).not.toBeNull();
    });
});
