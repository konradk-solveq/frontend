import { Dimensions } from 'react-native';

// funkcje wiliczające położenie elementów proporcje wg layoutu 
// https://app.zeplin.io/project/5fbf658b936bbbb842e3c43c/dashboard?sid=60397836dc2eff2bfdde033a

let layout: {
    width: number;
    height: number;
    ratio: number;
} = {
    width: 414, // wartości pełnego ekranu wg designu
    height: 896,
    ratio: 414 / 896
}

let appSize: {
    width: number,
    height: number,
    ratio: number
};

let objSize: {
    width: number,
    height: number,
    ratio: number
}

const setAppSize = (w: number, h: number) => {
    appSize = {
        width: w,
        height: h,
        ratio: w / h
    }
}

const initAppSize = () => {
    const ww = Dimensions.get('window').width;
    const wh = Dimensions.get('window').height;
    setAppSize(ww, wh);
}

const setObjSize = (w: number, h: number) => {
    objSize = {
        width: w,
        height: h,
        ratio: w / h
    }
}

const getCenterLeftPx = () => {
    let res: number = (((layout.width - objSize.width) / 2) / layout.width) * appSize.width;
    return res;
}

const getCenterTopPx = () => {
    let res: number = (((layout.height - objSize.height) / 2) / layout.height) * appSize.height;
    return res;
}



const getLeft = (left: number) => {
    let res: number = (left / layout.width) * 100;
    return res.toFixed(3) + '%';
}
const getLeftPx = (left: number) => {
    let res: number = (left / layout.width) * appSize.width;
    return res;
}

const getTop = (top: number) => {
    let res: number = ((top) / layout.height) * 100;
    return res.toFixed(3) + '%'
}
const getTopPx = (top: number) => {
    let res: number = ((top) / layout.height) * appSize.height;
    return res
}



const getWidth = () => {
    let res: number = (objSize.width / layout.width) * 100;
    return res.toFixed(3) + '%';
}
const getWidthPx = () => {
    let res: number = (objSize.width / layout.width) * appSize.width;
    return res;
}
const getWidthOf = (num: number) => {
    let res: number = (num / layout.width) * 100;
    return res.toFixed(3) + '%';
}
const getWidthPxOf = (num: number) => {
    let res: number = (num / layout.width) * appSize.width;
    return res;
}

const getHeight = () => {
    let res: number = (objSize.height / layout.height) * 100;
    return res.toFixed(3) + '%';
}
const getHeightPx = () => {
    let res: number = (objSize.height / layout.height) * appSize.height;
    return res;
}
const getHeightOfPx = (num: number) => {
    let res: number = (num / layout.height) * appSize.height;
    return res;
}



const getRelativeWidth = () => {
    let res: number = ((objSize.width / layout.height) / appSize.ratio) * 100;
    return res.toFixed(3) + '%';
}

const getRelativeHeight = () => {
    let res: number = ((objSize.height / layout.width) * appSize.ratio) * 100;
    return res.toFixed(3) + '%';
}

const getStandard = (w: number, h: number, t: number) => { // nazwy pełnych kompozycji bez kontestu, abstrakcujne, nie miałęm pomysłu na okeślniki
    setObjSize(w, h);
    let res: {
        position: string,
        width: string,
        height: string,
        left: number,
        top: number
    } = {
        position: 'absolute',
        width: getWidth(),
        height: getHeight(),
        left: getCenterLeftPx(),
        top: getTopPx(t)
    }
    return res;
}

const getStandardPx = (w: number, h: number, t: number) => {
    setObjSize(w, h);
    let res: {
        position: string,
        width: number,
        height: number,
        left: number,
        top: number
    } = {
        position: 'absolute',
        width: getWidthPx(),
        height: getHeightPx(),
        left: getCenterLeftPx(),
        top: getTopPx(t)
    }
    return res;
}

const getPerfectPx = (w: number, h: number, l: number, t: number) => {
    setObjSize(w, h);
    let res: {
        position: string,
        width: number,
        height: number,
        left: number,
        top: number
    } = {
        position: 'absolute',
        width: getWidthPx(),
        height: getHeightPx(),
        left: getTopPx(l),
        top: getTopPx(t)
    }
    return res;
}

const getPosStaticHeight = (w: number, h: number, t: number) => {
    setObjSize(w, h);
    let width = getWidthPx();
    let res: {
        position: string,
        width: number,
        height: number,
        left: string,
        top: string
    } = {
        position: 'absolute',
        width,
        height: (h / w) * width,
        left: getCenterLeftPx(),
        top: getTop(t)
    }
    return res;
}

const getOnlyPos = (w: number, h: number, t: number) => {
    setObjSize(w, h);
    let res: {
        position: string,
        left: string,
        top: string
    } = {
        position: 'absolute',
        left: getCenterLeftPx(),
        top: getTop(t)
    }
    return res;
}

const getPosAndWid = (w: number, h: number, t: number) => {
    setObjSize(w, h);
    let res: {
        position: string,
        width: string,
        left: number,
        top: string
    } = {
        position: 'absolute',
        width: getWidth(),
        left: getCenterLeftPx(),
        top: getTop(t)
    }
    return res;
}

const getPosWithMinHeight = (w: number, h: number, t: number, min: number) => {
    setObjSize(w, h);
    let height = getHeightPx();
    let res: {
        position: string,
        width: string,
        height: number,
        left: string,
        top: string
    } = {
        position: 'absolute',
        width: getWidthPx(),
        height: height < min ? min : height,
        left: getCenterLeftPx(),
        top: getTop(t)
    }
    return res;
}

export {
    setAppSize,
    initAppSize,
    setObjSize,
    getCenterLeftPx,
    getCenterTopPx,
    getLeft,
    getLeftPx,
    getTop,
    getTopPx,
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
    getPosWithMinHeight
}