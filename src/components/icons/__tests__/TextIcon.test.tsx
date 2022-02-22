import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import {initAppSize} from '@helpers/layoutFoo';
import {getFFontSize, getFHorizontalPx} from '@theme/utils/appLayoutDimensions';
import {TextIcon} from '@components/icons';
import {MykrossIconFont} from '@theme/enums/iconFonts';

const TEXT_ICON_TEST_ID = 'text-icon-test-id';
const TEXT_ICON_COLOR = '#ededed';
const TEXT_ICON_SIZE = 40;
const TEXT_ICON = MykrossIconFont.MYKROSS_ICON_USER;

describe('<TextIcon /> - components/icons', () => {
    beforeAll(() => {
        initAppSize();
    });

    it('Should change icon default color when passed', () => {
        const {getByTestId} = render(
            <TextIcon icon={TEXT_ICON} iconColor={TEXT_ICON_COLOR} />,
        );

        const textIconElement = getByTestId(TEXT_ICON_TEST_ID);
        expect(textIconElement.props.style[1].color).toEqual(TEXT_ICON_COLOR);
    });

    it('Should change icons size when passed', () => {
        const expectedIconSize = getFFontSize(TEXT_ICON_SIZE);
        const {getByTestId} = render(
            <TextIcon icon={TEXT_ICON} iconSize={TEXT_ICON_SIZE} />,
        );

        const textIconElement = getByTestId(TEXT_ICON_TEST_ID);
        expect(textIconElement.props.style[1].fontSize).toEqual(
            expectedIconSize,
        );
    });

    it('Should apply style to icon when passed', () => {
        const expectedWith = getFHorizontalPx(100);
        const style = {width: expectedWith};
        const {getByTestId} = render(
            <TextIcon icon={TEXT_ICON} style={style} />,
        );

        const textIconElement = getByTestId(TEXT_ICON_TEST_ID);
        expect(textIconElement.props.style[2].width).toEqual(expectedWith);
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });
});
