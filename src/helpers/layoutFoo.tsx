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



const getWidth = () => {
    let res: number = (objSize.width / layout.width) * 100;
    return res.toFixed(3) + '%';
}
const getHeight = () => {
    let res: number = (objSize.height / layout.height) * 100;
    return res.toFixed(3) + '%';
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

export {
    setAppSize, initAppSize, setObjSize,
    getCenterLeft, getCenterTop,
    getLeft, getTop,
    getWidth, getHeight,
    getRelativeWidth, getRelativeHeight,
    getStandard
}