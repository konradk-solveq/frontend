import {Dimensions} from 'react-native';
import {FIGMA_HEIGHT, FIGMA_WIDTH} from '../globalValues/layout';

const {width, height} = Dimensions.get('window');

const getFHorizontal = (px: number) => {
    let res: number = (px / FIGMA_WIDTH) * 100;
    return res.toFixed(3) + '%';
};

const getFHorizontalPx = (px: number) => {
    return (width / FIGMA_WIDTH) * px;
};

const getFVertical = (px: number) => {
    let res: number = (px / FIGMA_HEIGHT) * 100;
    return res.toFixed(3) + '%';
};

const getFVerticalPx = (px: number) => {
    return (height / FIGMA_HEIGHT) * px;
};

const FONT_RATIO = width > FIGMA_WIDTH ? 1 : width / FIGMA_WIDTH;
const getFFontSize = (h: number) => h * FONT_RATIO;
const mainFButtonsHeight = (h: number) => h * FONT_RATIO;

export {
    getFHorizontal,
    getFHorizontalPx,
    getFVertical,
    getFVerticalPx,
    getFFontSize,
    mainFButtonsHeight,
};
