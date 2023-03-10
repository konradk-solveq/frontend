import {Dimensions} from 'react-native';
import {BASE_HEIGHT, BASE_WIDTH, BASE_STACK_HEADER_HEIGHT} from '@theme/layout';

// funkcje wiliczające położenie elementów proporcje wg layoutu
// https://app.zeplin.io/project/5fbf658b936bbbb842e3c43c/dashboard?sid=60397836dc2eff2bfdde033a
const {width, height} = Dimensions.get('window');

let appSize: {
    width: number;
    height: number;
    ratio: number;
} | null = null;

let objSize: {
    width: number;
    height: number;
    ratio: number;
} | null = null;

const setAppSize = (w: number, h: number) => {
    appSize = {
        width: w,
        height: h,
        ratio: w / h,
    };
};

const initAppSize = () => {
    setAppSize(width, height);
};

const setObjSize = (w: number, h: number) => {
    objSize = {
        width: w,
        height: h,
        ratio: w / h,
    };
};

const showError = () => {
    console.error('');
    console.error('-----------!!!---------');
    if (!objSize) {
        console.error('objSize is not defined!');
    }
    if (!appSize) {
        console.error('appSize is not defined!');
    }
    console.error('-----------!!!---------');
    console.error('');
};

const getCenterLeftPx = () => {
    if (!objSize || !appSize) {
        showError();
        return 0;
    }
    let res: number =
        ((BASE_WIDTH - objSize.width) / 2 / BASE_WIDTH) * appSize.width;
    return res;
};

const getCenterTopPx = () => {
    if (!objSize || !appSize) {
        showError();
        return 0;
    }
    let res: number =
        ((BASE_HEIGHT - objSize.height) / 2 / BASE_HEIGHT) * appSize.height;
    return res;
};

const getHorizontal = (px: number) => {
    let res: number = (px / BASE_WIDTH) * 100;
    return res.toFixed(3) + '%';
};

const getHorizontalPx = (px: number) => {
    return (width / BASE_WIDTH) * px;
};

const getVertical = (px: number) => {
    let res: number = (px / BASE_HEIGHT) * 100;
    return res.toFixed(3) + '%';
};

const getVerticalPx = (px: number) => {
    return (height / BASE_HEIGHT) * px;
};

const getStackHeaderHeight = () => {
    return getVerticalPx(BASE_STACK_HEADER_HEIGHT);
};

const getWidth = () => {
    if (!objSize) {
        showError();
        return '0%';
    }
    let res: number = (objSize.width / BASE_WIDTH) * 100;
    return res.toFixed(3) + '%';
};

const getWidthPx = () => {
    if (!objSize || !appSize) {
        showError();
        return 0;
    }
    let res: number = (objSize.width / BASE_WIDTH) * appSize.width;
    return res;
};

const getWidthOf = (num: number) => {
    let res: number = (num / BASE_WIDTH) * 100;
    return res.toFixed(3) + '%';
};

const getWidthPxOf = (num: number) => {
    if (!appSize) {
        showError();
        return 0;
    }
    let res: number = (num / BASE_WIDTH) * appSize.width;
    return res;
};

const getHeight = () => {
    if (!objSize) {
        showError();
        return '0%';
    }
    let res: number = (objSize.height / BASE_HEIGHT) * 100;
    return res.toFixed(3) + '%';
};

const getHeightPx = () => {
    if (!objSize || !appSize) {
        showError();
        return 0;
    }
    let res: number = (objSize.height / BASE_HEIGHT) * appSize.height;
    return res;
};

const getHeightOfPx = (num: number) => {
    if (!appSize) {
        showError();
        return 0;
    }
    let res: number = (num / BASE_HEIGHT) * appSize.height;
    return res;
};

const getRelativeWidth = () => {
    if (!objSize || !appSize) {
        showError();
        return '0%';
    }
    let res: number = (objSize.width / BASE_HEIGHT / appSize.ratio) * 100;
    return res.toFixed(3) + '%';
};

const getRelativeHeight = () => {
    if (!objSize || !appSize) {
        showError();
        return '0%';
    }
    let res: number = (objSize.height / BASE_WIDTH) * appSize.ratio * 100;
    return res.toFixed(3) + '%';
};

const getStandard = (w: number, h: number, t: number) => {
    setObjSize(w, h);
    let res: {
        position: 'relative' | 'absolute' | undefined;
        width: string;
        height: string;
        left: number;
        top: number;
    } = {
        position: 'absolute',
        width: getWidth(),
        height: getHeight(),
        left: getCenterLeftPx(),
        top: getVerticalPx(t),
    };
    return res;
};

const getStandardPx = (w: number, h: number, t: number) => {
    setObjSize(w, h);
    let res: {
        position: 'relative' | 'absolute' | undefined;
        width: number;
        height: number;
        left: number;
        top: number;
    } = {
        position: 'absolute',
        width: getWidthPx(),
        height: getHeightPx(),
        left: getCenterLeftPx(),
        top: getVerticalPx(t),
    };
    return res;
};

const getPerfectPx = (w: number, h: number, l: number, t: number) => {
    setObjSize(w, h);
    let res: {
        position: 'relative' | 'absolute' | undefined;
        width: number;
        height: number;
        left: number;
        top: number;
    } = {
        position: 'absolute',
        width: getWidthPx(),
        height: getHeightPx(),
        left: getVerticalPx(l),
        top: getVerticalPx(t),
    };
    return res;
};

const getPosStaticHeight = (w: number, h: number, t: number) => {
    setObjSize(w, h);
    let widthObj = getWidthPx();
    let res: {
        position: 'relative' | 'absolute' | undefined;
        width: number;
        height: number;
        left: number;
        top: string;
    } = {
        position: 'absolute',
        width: getWidthPx(),
        height: (h / w) * widthObj,
        left: getCenterLeftPx(),
        top: getVertical(t),
    };
    return res;
};

const getOnlyPos = (w: number, h: number, t: number) => {
    setObjSize(w, h);
    let res: {
        position: 'relative' | 'absolute' | undefined;
        left: number;
        top: string;
    } = {
        position: 'absolute',
        left: getCenterLeftPx(),
        top: getVertical(t),
    };
    return res;
};

const getPosAndWid = (w: number, h: number, t: number) => {
    setObjSize(w, h);
    let res: {
        position: 'relative' | 'absolute' | undefined;
        width: string;
        left: number;
        top: string;
    } = {
        position: 'absolute',
        width: getWidth(),
        left: getCenterLeftPx(),
        top: getVertical(t),
    };
    return res;
};

const getPosWithMinHeight = (w: number, h: number, t: number, min: number) => {
    setObjSize(w, h);
    let heightObj = getHeightPx();
    let res: {
        position: 'relative' | 'absolute' | undefined;
        width: number;
        height: number;
        left: number;
        top: string;
    } = {
        position: 'absolute',
        width: getWidthPx(),
        height: heightObj < min ? min : heightObj,
        left: getCenterLeftPx(),
        top: getVertical(t),
    };
    return res;
};

const FONT_RATIO = width > BASE_WIDTH ? 1 : width / BASE_WIDTH;
const getFontSize = (h: number) => h * FONT_RATIO;
const mainButtonsHeight = (h: number) => h * FONT_RATIO;

export {
    setAppSize,
    initAppSize,
    setObjSize,
    getCenterLeftPx,
    getCenterTopPx,
    getHorizontal,
    getHorizontalPx,
    getVertical,
    getVerticalPx,
    getWidth,
    getWidthOf,
    getWidthPx,
    getWidthPxOf,
    getHeight,
    getHeightPx,
    getHeightOfPx,
    getRelativeWidth,
    getRelativeHeight,
    getStandard,
    getStandardPx,
    getPerfectPx,
    getPosStaticHeight,
    getOnlyPos,
    getPosAndWid,
    getPosWithMinHeight,
    getStackHeaderHeight,
    getFontSize,
    mainButtonsHeight,
};
