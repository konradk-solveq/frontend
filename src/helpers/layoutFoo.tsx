import {Dimensions} from 'react-native';

// funkcje wiliczające położenie elementów proporcje wg layoutu
// https://app.zeplin.io/project/5fbf658b936bbbb842e3c43c/dashboard?sid=60397836dc2eff2bfdde033a
const {width, height} = Dimensions.get('window');

const baseHeight = 896;
const baseWidth = 414;
const baseStackHeaderHeight = 100;

let appSize: {
    width: number;
    height: number;
    ratio: number;
};

let objSize: {
    width: number;
    height: number;
    ratio: number;
};

const setAppSize = (w: number, h: number) => {
    appSize = {
        width: w,
        height: h,
        ratio: w / h,
    };
};

const initAppSize = () => {
    const ww = Dimensions.get('window').width;
    const wh = Dimensions.get('window').height;
    setAppSize(ww, wh);
};

const setObjSize = (w: number, h: number) => {
    objSize = {
        width: w,
        height: h,
        ratio: w / h,
    };
};

const getCenterLeftPx = () => {
    let res: number =
        ((baseWidth - objSize.width) / 2 / baseWidth) * appSize.width;
    return res;
};

const getCenterTopPx = () => {
    let res: number =
        ((baseHeight - objSize.height) / 2 / baseHeight) * appSize.height;
    return res;
};

const getHorizontal = (px: number) => {
    let res: number = (px / baseWidth) * 100;
    return res.toFixed(3) + '%';
};
// const getHorizontalPx = (px: number) => {
//     let res: number = (px / baseWidth) * appSize.width;
//     return res;
// }
const getHorizontalPx = (px: number) => {
    return (width / baseWidth) * px;
};

const getVertical = (px: number) => {
    let res: number = (px / baseHeight) * 100;
    return res.toFixed(3) + '%';
};
// const getVerticalPx = (px: number) => {
//     let res: number = ((px) / baseHeight) * appSize.height;
//     return res
// }
const getVerticalPx = (px: number) => {
    return (height / baseHeight) * px;
};

const getStackHeaderHeight = () => {
    return getVerticalPx(baseStackHeaderHeight);
};

const getWidth = () => {
    let res: number = (objSize.width / baseWidth) * 100;
    return res.toFixed(3) + '%';
};
const getWidthPx = () => {
    let res: number = (objSize.width / baseWidth) * appSize.width;
    return res;
};
const getWidthOf = (num: number) => {
    let res: number = (num / baseWidth) * 100;
    return res.toFixed(3) + '%';
};
const getWidthPxOf = (num: number) => {
    let res: number = (num / baseWidth) * appSize.width;
    return res;
};

const getHeight = () => {
    let res: number = (objSize.height / baseHeight) * 100;
    return res.toFixed(3) + '%';
};
const getHeightPx = () => {
    let res: number = (objSize.height / baseHeight) * appSize.height;
    return res;
};
const getHeightOfPx = (num: number) => {
    let res: number = (num / baseHeight) * appSize.height;
    return res;
};

const getRelativeWidth = () => {
    let res: number = (objSize.width / baseHeight / appSize.ratio) * 100;
    return res.toFixed(3) + '%';
};

const getRelativeHeight = () => {
    let res: number = (objSize.height / baseWidth) * appSize.ratio * 100;
    return res.toFixed(3) + '%';
};

const getStandard = (w: number, h: number, t: number) => {
    // nazwy pełnych kompozycji bez kontestu, abstrakcujne, nie miałęm pomysłu na okeślniki
    setObjSize(w, h);
    let res: {
        position: string;
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
        position: string;
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
        position: string;
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
    let width = getWidthPx();
    let res: {
        position: string;
        width: number;
        height: number;
        left: number;
        top: string;
    } = {
        position: 'absolute',
        width: getWidthPx(),
        height: (h / w) * width,
        left: getCenterLeftPx(),
        top: getVertical(t),
    };
    return res;
};

const getOnlyPos = (w: number, h: number, t: number) => {
    setObjSize(w, h);
    let res: {
        position: string;
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
        position: string;
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
    let height = getHeightPx();
    let res: {
        position: string;
        width: number;
        height: number;
        left: number;
        top: string;
    } = {
        position: 'absolute',
        width: getWidthPx(),
        height: height < min ? min : height,
        left: getCenterLeftPx(),
        top: getVertical(t),
    };
    return res;
};

const fontRatio = width > 414 ? 1 : width / 414;
const getFontSize = (h: number) => h * fontRatio;
const mainButtonsHeight = (h: number) => h * fontRatio;

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
