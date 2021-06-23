import {getHorizontalPx} from './layoutFoo';

export const createSvgShadow = (b: number, w: number, h: number): string => {
    let svg =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' +
        -b +
        ' ' +
        -b +
        ' ' +
        (w + b * 2) +
        ' ' +
        (h + b * 2) +
        '" width="' +
        (w + b + b) +
        '" height="' +
        (h + b + b) +
        '">';
    svg +=
        '<filter id="filter" x="-1" width="3" y="-1" height="3"><feGaussianBlur stdDeviation="' +
        b * 0.4 +
        '"/></filter>';
    svg +=
        '<rect filter="url(#filter)" opacity=".12" fill="#000" stroke="none" width="' +
        w +
        '" height="' +
        h +
        '" x="' +
        0 +
        '" y="' +
        0 +
        '" ry="24"/>';
    svg +=
        '<rect fill="#fff" stroke="none" width="' +
        w +
        '" height="' +
        h +
        '" x="' +
        0 +
        '" y="' +
        0 +
        '" ry="' +
        getHorizontalPx(32) +
        '"/>';
    svg += '</svg>';

    return svg;
};
