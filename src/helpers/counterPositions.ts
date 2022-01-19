import {Dimensions} from 'react-native';
import {
    getHorizontalPx,
    getVerticalPx,
    getFontSize,
    mainButtonsHeight,
} from '@helpers/layoutFoo';
import {counterPositionsT} from '@type/helpers/counterPositions';

const {width, height} = Dimensions.get('window');
const ACTION_BUTTONS_TOP = mainButtonsHeight(50) + getVerticalPx(65);

const constrainerHeight = {
    getMapOff: () => getVerticalPx(896),
    getMapOn: () => ACTION_BUTTONS_TOP + getHorizontalPx(80 + 26),
};

const constrainerBottom = {
    getMapOff: () => 0,
    getMapOn: () => 0,
    getAplaShow: () => getHorizontalPx(100),
};

const CENTER_VERTICAL_POS_OF_CROSS = getVerticalPx(896 / 2);
const crossBtnBottom = {
    getMapOff: () => CENTER_VERTICAL_POS_OF_CROSS - getHorizontalPx(51 / 2),
    getMapOn: () => constrainerHeight.getMapOn() + getHorizontalPx(-23),
    getAplaShow: () => constrainerHeight.getMapOn() + getHorizontalPx(-26),
};

const wrapHeight = {
    getMapOff: () => getVerticalPx(334),
    getMapOn: () => getVerticalPx(50),
};

const wrapTop = {
    getMapOff: () => CENTER_VERTICAL_POS_OF_CROSS - wrapHeight.getMapOff() / 2,
    getMapOn: () => getHorizontalPx(36),
    getAplaShow: () => getHorizontalPx(24),
};

const cellRowHeight = {
    getMapOff: () => wrapHeight.getMapOff() / 2,
    getMapOn: () => wrapHeight.getMapOn(),
};

const font = {
    getBig: () => getFontSize(57),
    getSmall: () => getFontSize(23),
    getLabel: () => getFontSize(18),
};

const findMeBottom = {
    getMapOn: () => ACTION_BUTTONS_TOP + getHorizontalPx(140),
    getAplaShow: () => ACTION_BUTTONS_TOP + getHorizontalPx(240),
};

const LOWER_LINE_PROPORTIONS = 1.08;
const cellWidth = {
    getMapOff: () => (width - getHorizontalPx(80)) / 2,
    getMapOn: () =>
        ((width - getHorizontalPx(80)) / 4) * LOWER_LINE_PROPORTIONS,
};

const cellRowLeft = {
    getMapOff: () => 0,
    getMapOn: () =>
        ((width - getHorizontalPx(80)) / 2) * LOWER_LINE_PROPORTIONS,
};

const cellRowTop = {
    getMapOff: () => getVerticalPx(12),
    getMapOn: () => getVerticalPx(-50),
};

const plugBottom = {
    getMapOff: () => 0,
    getMapOn: () => -height + constrainerHeight.getMapOn(),
};

export const counterPositions: counterPositionsT = {
    constrainerHeight,
    constrainerBottom,
    crossBtnBottom,
    wrapHeight,
    wrapTop,
    cellRowHeight,
    font,
    findMeBottom,
    cellWidth,
    cellRowLeft,
    cellRowTop,
    plugBottom,
};
