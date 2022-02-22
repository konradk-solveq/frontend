import 'react-native';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import {initAppSize} from '@helpers/layoutFoo';
import {getFFontSize} from '@theme/utils/appLayoutDimensions';
import {MykrossIconFont} from '@theme/enums/iconFonts';

import {IconButton} from '@components/buttons';

const ICON_BUTTON = MykrossIconFont.MYKROSS_ICON_USER;

describe('<IconButton /> - components/buttons', () => {
    const onPressFn = jest.fn();
    beforeAll(() => {
        initAppSize();
    });

    it('When button is pressed should fire callback function', () => {
        const {getByTestId} = render(
            <IconButton icon={ICON_BUTTON} onPress={onPressFn} />,
        );

        fireEvent.press(getByTestId('icon-btn-test-id'));
    });

    it('Should change color when passed', () => {
        const {getByTestId} = render(
            <IconButton
                icon={ICON_BUTTON}
                onPress={onPressFn}
                iconColor="#ededed"
            />,
        );

        const iconElement = getByTestId('icon-btn-test-id-icon');
        expect(iconElement.props.style[1].color).toEqual('#ededed');
    });

    it('Should change icon size when passed new value', () => {
        const fontSize = 40;
        const {getByTestId} = render(
            <IconButton
                icon={ICON_BUTTON}
                onPress={onPressFn}
                iconSize={fontSize}
            />,
        );

        const iconElement = getByTestId('icon-btn-test-id-icon');
        expect(iconElement.props.style[1].fontSize).toEqual(
            getFFontSize(fontSize),
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });
});
