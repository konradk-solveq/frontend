import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import SavingPanel from '../components/SavingPanel';
import {LeafSvg} from '@src/components/svg';

const SAVING_PANEL_TEST_TEXT = 'TEST TITLE';
const SAVING_PANEL_TEST_BG = '#BDBDBD';
const SAVING_PANEL_TEST_ID = 'saving-panel';

describe('<SavingPanel /> - containers/Recording/components/SavingPanel', () => {
    it('Should render icon if provided prop', () => {
        const {getByTestId} = render(
            <SavingPanel
                text={SAVING_PANEL_TEST_TEXT}
                background={SAVING_PANEL_TEST_BG}
                icon={<LeafSvg />}
            />,
        );

        const iconElement = getByTestId(`${SAVING_PANEL_TEST_ID}-icon`);
        expect(iconElement.children).not.toBeNull();
    });

    it('Should display background equal to passed prop', () => {
        const {getByTestId} = render(
            <SavingPanel
                text={SAVING_PANEL_TEST_TEXT}
                background={SAVING_PANEL_TEST_BG}
                icon={<LeafSvg />}
            />,
        );

        const wrapper = getByTestId(`${SAVING_PANEL_TEST_ID}-wrapper`);
        expect(wrapper.props.style[0].backgroundColor).toEqual(
            SAVING_PANEL_TEST_BG,
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });
});
