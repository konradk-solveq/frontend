import { Dimensions } from 'react-native';

let layout: {
    width: number;
    height: number;
    ratio: number;
} = {
    width: 414,
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

const getCenterLeft = () => {
    let res: number = (((layout.width - objSize.width) / 2) / layout.width) * 100;
    return res.toFixed(3) + '%';
}
const getCenterLeftPx = () => {
    let res: number = (((layout.width - objSize.width) / 2) / layout.width) * appSize.width;
    return res;
}

const getCenterTop = () => {
    let res: number = (((layout.height - objSize.height) / 2) / layout.height) * 100;
    return res.toFixed(3) + '%'
}



const getLeft = (left: number) => {
    let res: number = (left / layout.width) * 100;
    return res.toFixed(3) + '%';
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



const getRelativeWidth = () => {
    let res: number = ((objSize.width / layout.height) / appSize.ratio) * 100;
    return res.toFixed(3) + '%';
}

const getRelativeHeight = () => {
    let res: number = ((objSize.height / layout.width) * appSize.ratio) * 100;
    return res.toFixed(3) + '%';
}

const getStandard = (w: number, h: number, t: number) => {
    setObjSize(w, h);
    let res: {
        position: string,
        width: string,
        height: string,
        left: string,
        top: string
    } = {
        position: 'absolute',
        width: getWidth(),
        height: getHeight(),
        left: getCenterLeft(),
        top: getTop(t)
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

const getPerfect = (w: number, h: number, l: number, t: number) => {
    setObjSize(w, h);
    let res: {
        position: string,
        width: string,
        height: string,
        left: string,
        top: string
    } = {
        position: 'absolute',
        width: getWidth(),
        height: getHeight(),
        left: getLeft(l),
        top: getTop(t)
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
        left: getCenterLeft(),
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
        left: getCenterLeft(),
        top: getTop(t)
    }
    return res;
}

const getPosAndWid = (w: number, h: number, t: number) => {
    setObjSize(w, h);
    let res: {
        position: string,
        width: string,
        left: string,
        top: string
    } = {
        position: 'absolute',
        width: getWidth(),
        left: getCenterLeft(),
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
        width: getWidth(),
        height: height < min ? min : height,
        left: getCenterLeft(),
        top: getTop(t)
    }
    return res;
}

export {
    setAppSize, initAppSize, setObjSize,
    getCenterLeft, getCenterTop,
    getLeft, getTop, getTopPx,
    getWidth, getWidthOf, getWidthPx, getWidthPxOf,
    getHeight, getHeightPx,
    getRelativeWidth, getRelativeHeight,

    getStandard, getStandardPx,
    getPerfect, getPerfectPx,
    getPosStaticHeight,
    getOnlyPos,
    getPosAndWid,
    getPosWithMinHeight
}