import { Dimensions } from 'react-native';

// funkcje wiliczające położenie elementów proporcje wg layoutu 
// https://app.zeplin.io/project/5fbf658b936bbbb842e3c43c/dashboard?sid=60397836dc2eff2bfdde033a

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
    let res: number = (((414 - objSize.width) / 2) / 414) * appSize.width;
    return res;
}

const getCenterTopPx = () => {
    let res: number = (((896 - objSize.height) / 2) / 896) * appSize.height;
    return res;
}



const getHorizontal = (px: number) => {
    let res: number = (px / 414) * 100;
    return res.toFixed(3) + '%';
}
// const getHorizontalPx = (px: number) => {
//     let res: number = (px / 414) * appSize.width;
//     return res;
// }
const getHorizontalPixels = (px: number) => {
    return (width / 414) * px;
};

const getVertical = (px: number) => {
    let res: number = (px / 896) * 100;
    return res.toFixed(3) + '%'
}
// const getVerticalPx = (px: number) => {
//     let res: number = ((px) / 896) * appSize.height;
//     return res
// }
const getVerticalPx = (px: number) => {
    return (height / 896) * px;
};



const getWidth = () => {
    let res: number = (objSize.width / 414) * 100;
    return res.toFixed(3) + '%';
}
const getWidthPx = () => {
    let res: number = (objSize.width / 414) * appSize.width;
    return res;
}
const getWidthOf = (num: number) => {
    let res: number = (num / 414) * 100;
    return res.toFixed(3) + '%';
}
const getWidthPxOf = (num: number) => {
    let res: number = (num / 414) * appSize.width;
    return res;
}

const getHeight = () => {
    let res: number = (objSize.height / 896) * 100;
    return res.toFixed(3) + '%';
}
const getHeightPx = () => {
    let res: number = (objSize.height / 896) * appSize.height;
    return res;
}
const getHeightOfPx = (num: number) => {
    let res: number = (num / 896) * appSize.height;
    return res;
}



const getRelativeWidth = () => {
    let res: number = ((objSize.width / 896) / appSize.ratio) * 100;
    return res.toFixed(3) + '%';
}

const getRelativeHeight = () => {
    let res: number = ((objSize.height / 414) * appSize.ratio) * 100;
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
        top: getVerticalPx(t)
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
        top: getVerticalPx(t)
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
        left: getVerticalPx(l),
        top: getVerticalPx(t)
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
        left: number,
        top: string
    } = {
        position: 'absolute',
        width: getWidthPx(),
        height: (h / w) * width,
        left: getCenterLeftPx(),
        top: getVertical(t)
    }
    return res;
}

const getOnlyPos = (w: number, h: number, t: number) => {
    setObjSize(w, h);
    let res: {
        position: string,
        left: number,
        top: string
    } = {
        position: 'absolute',
        left: getCenterLeftPx(),
        top: getVertical(t)
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
        top: getVertical(t)
    }
    return res;
}

const getPosWithMinHeight = (w: number, h: number, t: number, min: number) => {
    setObjSize(w, h);
    let height = getHeightPx();
    let res: {
        position: string,
        width: number,
        height: number,
        left: number,
        top: string
    } = {
        position: 'absolute',
        width: getWidthPx(),
        height: height < min ? min : height,
        left: getCenterLeftPx(),
        top: getVertical(t)
    }
    return res;
}



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
    getHorizontalPixels,
    getVerticalPixels,
}