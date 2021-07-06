import {Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');

export default `<script>
const svg = document.querySelector('svg');
const cover = document.querySelector('.cover');
let w = 0;
let h = 0;
const wrapParam = {
    v: 0,
    c: 0,
};
let wrap;
const obj = {};
const mapOn = [];
const mapOff = [];
let data = {};
let mapBtnPos = {};
const getSVGelem = type =>
    document.createElementNS('http://www.w3.org/2000/svg', type);
const getX = n => w * (n / 414);
const getY = n => h * (n / 896);
const getYwrap = n => wrapParam.h * (n / 305);
const alert1 = document.getElementById('alert1');
const alert2 = document.getElementById('alert2');
let curentShapeOfHeader = null;
let curentColorOfHeader = null;
let alertApla;
let alertCurrentPos = 0;
const googleMap = document.getElementById('map');
let values = {
    distance: '00,00',
    time1: '00:00',
    time2: ':00',
    speed: '00,0',
    averageSpeed: '00,0',
};
const animDur = '0.6s'; // czas animacji pokazania mapy #animtime
// w .css show i hide
// w .js #animtime
let showed = false;

const getXless = (n, min) => (w * (n / 414) < min ? min : w * (n / 414));
const getYless = (n, min) => (w * (n / 896) < min ? min : w * (n / 896));

const getYlessCorect = (n, min) => {
    let res = h * (n / 896);
    if (res < min) {
        wrapParam.h = min;
        wrapParam.c = (min - res) * 0.666;
    } else {
        wrapParam.h = res;
        wrapParam.c = 0;
    }
    wrapParam.w = getX(414 - 80);
    return wrapParam;
};

// -------------------------------------------------------------------------
const setAnimation = (parent, attr, keys = null, id = null) => {
    let a = getSVGelem('animate');
    a.setAttribute('attributeName', attr);
    a.setAttribute('dur', animDur);
    a.setAttribute('repeatCount', '1');
    a.setAttribute('fill', 'freeze');
    if (keys) {
        a.setAttribute('keyTimes', keys);
    }
    if (id) {
        a.setAttribute('id', id);
    }
    parent.append(a);
    return a;
};

const checkAnimation = (id, parent, attr, keys = null) => {
    let elem = document.getElementById(id);
    if (elem) {
        return elem;
    }
    return setAnimation(parent, attr, keys, id);
};

// -------------------------------------------------------------------------
const setAnimaTrans = (parent, attr) => {
    let a = getSVGelem('animateTransform');
    a.setAttribute('attributeName', attr);
    a.setAttribute('attributeType', 'XML');
    a.setAttribute('type', 'translate');
    a.setAttribute('dur', animDur);
    a.setAttribute('attributeName', 'transform');
    a.setAttribute('repeatCount', '1');
    a.setAttribute('fill', 'freeze');
    parent.append(a);
    return a;
};

const counters = () => {
    // liczniki
    let index = 0;
    const setOneCounter = (name, value, unit, x, y) => {
        let cx = x;
        let cy = y + getYwrap(6 + 18) + 20 + 45;
        let xl = getX(334) / 4;
        let posX = xl * index;

        // -------------------------------------------------------------------------
        // opis danego licznika
        let t1 = getSVGelem('text');
        t1.setAttribute('x', x);
        t1.setAttribute('y', y + getYwrap(6) + 20);
        t1.setAttribute('class', 'name');
        let t1N = document.createTextNode(name);
        t1.append(t1N);
        wrap.append(t1);

        // animacja znikania
        mapOn.push(() => {
            t1.setAttribute('class', 'name hide');
        });
        mapOff.push(() => {
            setTimeout(() => {
                t1.setAttribute('class', 'name show');
            }, 400);
        });

        // -------------------------------------------------------------------------
        // wartośc licznikka
        let t2 = getSVGelem('text');
        t2.setAttribute('x', x);
        t2.setAttribute('y', cy);
        t2.setAttribute('class', 'value');
        t2.setAttribute('font-size', '57');
        let t2N = document.createTextNode(value);
        t2.append(t2N);
        wrap.append(t2);

        // animacja font size

        mapOn.push(() => {
            let a = checkAnimation(name + '_a2', t2, 'font-size');
            a.setAttribute('values', '57 ; 23');
            a.beginElement();
            t2.setAttribute('font-size', '23');
        });
        mapOff.push(() => {
            let a = checkAnimation(name + '_a2', t2, 'font-size');
            a.setAttribute('values', '23 ; 57');
            a.beginElement();
            t2.setAttribute('font-size', '57');
        });

        // animacja X
        let one5th = (cx - posX) / 5;
        let v1a =
            '' +
            cx +
            ' ; ' +
            (one5th * 4 + posX) +
            ' ; ' +
            (one5th * 3 + posX) +
            ' ; ' +
            (one5th * 2 + posX) +
            ' ; ' +
            (one5th + posX) +
            ' ; ' +
            posX;
        mapOn.push(() => {
            let a = checkAnimation(
                name + '_a3',
                t2,
                'x',
                '0 ; 0.05 ; 0.15 ; 0.35 ; 0.65 ; 1',
            );
            a.setAttribute('values', v1a);
            a.beginElement();
            t2.setAttribute('x', posX);
        });

        let v1b =
            '' +
            posX +
            ' ; ' +
            (one5th + posX) +
            ' ; ' +
            (one5th * 2 + posX) +
            ' ; ' +
            (one5th * 3 + posX) +
            ' ; ' +
            (one5th * 4 + posX) +
            ' ; ' +
            cx;
        mapOff.push(() => {
            let a = checkAnimation(
                name + '_a3',
                t2,
                'x',
                '0 ; 0.05 ; 0.15 ; 0.35 ; 0.65 ; 1',
            );
            a.setAttribute('values', v1b);
            a.beginElement();
            t2.setAttribute('x', cx);
        });

        // animacje Y
        one5th = cy / 5;
        let v2a =
            '' +
            cy +
            ' ; ' +
            one5th * 4 +
            ' ; ' +
            one5th * 3 +
            ' ; ' +
            one5th * 2 +
            ' ; ' +
            one5th +
            ' ; ' +
            0;
        mapOn.push(() => {
            let a = checkAnimation(
                name + '_a4',
                t2,
                'y',
                '0 ; 0.05 ; 0.15 ; 0.35 ; 0.65 ; 1',
            );
            a.setAttribute('values', v2a);
            a.beginElement();
            t2.setAttribute('y', 0);
        });

        let v2b =
            '0 ; ' +
            one5th +
            ' ; ' +
            one5th * 2 +
            ' ; ' +
            one5th * 3 +
            ' ; ' +
            one5th * 4 +
            ' ; ' +
            cy;
        mapOff.push(() => {
            let a = checkAnimation(
                name + '_a4',
                t2,
                'y',
                '0 ; 0.05 ; 0.15 ; 0.35 ; 0.65 ; 1',
            );
            a.setAttribute('values', v2b);
            a.beginElement();
            t2.setAttribute('y', cy);
        });

        // -------------------------------------------------------------------------
        // jednostka licznika
        let t3 = getSVGelem('tspan');
        t3.setAttribute('class', 'unit');
        let u2N = document.createTextNode(unit);
        t3.append(u2N);
        t2.append(t3);

        index++;

        return {
            name: t1,
            value: t2,
            unit: t3,
        };
    };

    obj.distance = setOneCounter(
        trans.distance,
        values.distance,
        trans.distanceUnit,
        0,
        0,
    );
    let x = getX(198);
    obj.time = setOneCounter(trans.time, values.time1, values.time2, x, 0);
    let y = getYwrap(6 + 18 + 90 + 20 + 45);
    obj.speed = setOneCounter(trans.speed, values.speed, trans.speedUnit, 0, y);
    obj.averageSpeed = setOneCounter(
        trans.averageSpeed,
        values.averageSpeed,
        trans.averageSpeedUnit,
        x,
        y,
    );
};

const init = () => {
    // trans = t;
    w = ` +
    width +
    `;
    h = ` +
    height +
    `;
    getYlessCorect(305, 220);
    data = {
        w,
        h: getY(116),
        hs: getY(60),
        h2: getY(94),
        cw: 414 / 2,
        w2: getX(81),
        alertBottom: getY(896 - 94) - 50,
        alertHide: getY(896) + 70,
    };

    cover.style.backgroundColor = '#fff';

    // -------------------------------------------------------------------------
    // POCZĄTEK RYSOWANIA
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    svg.setAttribute('width', w);
    svg.setAttribute('height', h);

    { // tylna apla
        // wraper apli
        let apla = getSVGelem('g');
        let y1 = getY(-22);
        let y2 = getY(896 - 94 - 22 - 12) - 50 - 23 - 25.5;
        apla.setAttribute('transform', 'translate(0,' + y1 + ')');
        svg.append(apla);

        //animacja apli
        aplaA = setAnimaTrans(apla, 'transform');
        let v9a = '0, ' + y1;
        let v9b = '0, ' + y2;
        mapOn.push(() => {
            aplaA.setAttribute('from', v9a);
            aplaA.setAttribute('to', v9b);
            aplaA.beginElement();
            apla.style.setProperty('pointer-events', 'none');
        });
        mapOff.push(() => {
            aplaA.setAttribute('from', v9b);
            aplaA.setAttribute('to', v9a);
            aplaA.beginElement();
            apla.style.setProperty('pointer-events', 'initial');
        });

        // -------------------------------------------------------------------------
        // cien pod aplą
        // let filter = getSVGelem('filter');
        // filter.setAttribute('id', 'f2');
        // filter.setAttribute('x', '-1');
        // filter.setAttribute('y', '-1');
        // filter.setAttribute('width', '3');
        // filter.setAttribute('height', '3');
        // apla.append(filter);

        // let blur = getSVGelem('feGaussianBlur');
        // blur.setAttribute('stdDeviation', '39');
        // filter.append(blur);

        // let path = getSVGelem('path');
        // path.setAttribute('fill', '#aaa');
        // path.setAttribute('fill-rule', 'evenodd');
        let h1 = getY(22);
        let h2 = h + getY(32);
        let d =
            'M 0,0' +
            ' C 0,0 ' +
            data.w2 +
            ',' +
            h1 +
            ' ' +
            data.cw +
            ',' +
            h1 +
            ' C ' +
            (data.w - data.w2) +
            ',' +
            h1 +
            ' ' +
            w +
            ',0 ' +
            w +
            ',0' +
            ' L ' +
            w +
            ',0 ' +
            w +
            ',' +
            h2 +
            ' 0,' +
            h2 +
            ' Z';

        // path.setAttribute('d', d);
        // path.setAttribute('filter', 'url(#f2)');
        // apla.append(path);

        // -------------------------------------------------------------------------
        // kształt apli
        path = getSVGelem('path');
        path.setAttribute('fill', '#fff');
        path.setAttribute('fill-rule', 'evenodd');
        path.setAttribute('d', d);
        apla.append(path);
    }

    // wraper liczników
    wrap = getSVGelem('g'); {
        wrap.setAttribute(
            'transform',
            'translate(' + getX(40) + ',' + (getY(287) - wrapParam.c) + ')',
        );
        svg.append(wrap);

        mapBtnPos.y1 = getY(287) - wrapParam.c;
        mapBtnPos.y2 = getY(896 - 94) - 50;

        // animacja wrapera
        wrapA = setAnimaTrans(wrap, 'transform');
        let v0a = '' + getX(40) + ',' + mapBtnPos.y1;
        let v0b = '' + getX(40) + ',' + mapBtnPos.y2;
        mapOn.push(() => {
            wrapA.setAttribute('from', v0a);
            wrapA.setAttribute('to', v0b);
            wrapA.beginElement();
        });
        mapOff.push(() => {
            wrapA.setAttribute('from', v0b);
            wrapA.setAttribute('to', v0a);
            wrapA.beginElement();
        });
    }

    counters();

    { // kros z buttonem
        // -------------------------------------------------------------------------
        // wraper buttona do mapy
        let btnWrap = getSVGelem('g');
        btnWrap.setAttribute(
            'transform',
            'translate(' + getX(414 - 80) / 2 + ',' + wrapParam.h / 2 + ')',
        );
        wrap.append(btnWrap);
        btnWrapA = setAnimaTrans(btnWrap, 'transform');

        // dane do toucha w RN
        let cy1 = wrapParam.h / 2;
        let cy2 = -(23 + 25.5 + getY(12));
        window.ReactNativeWebView.postMessage('mapBtn;[' + (mapBtnPos.y1 + cy1) + ', ' + (mapBtnPos.y2 + cy2) + ']');

        // animacja całej grupy buttona z krzyżakiem
        let v3a = '' + getX(414 - 80) / 2 + ',' + cy1;
        let v3b = '' + getX(414 - 80) / 2 + ',' + cy2;
        mapOn.push(() => {
            btnWrapA.setAttribute('from', v3a);
            btnWrapA.setAttribute('to', v3b);
            btnWrapA.beginElement();
        });
        mapOff.push(() => {
            btnWrapA.setAttribute('from', v3b);
            btnWrapA.setAttribute('to', v3a);
            btnWrapA.beginElement();
        });

        // -------------------------------------------------------------------------
        // cien pod buttonem
        let filter = getSVGelem('filter');
        filter.setAttribute('id', 'f1');
        filter.setAttribute('x', '-1');
        filter.setAttribute('y', '-1');
        filter.setAttribute('width', '3');
        filter.setAttribute('height', '3');
        btnWrap.append(filter);

        let blur = getSVGelem('feGaussianBlur');
        blur.setAttribute('stdDeviation', '16');
        filter.append(blur);

        let shadow = getSVGelem('circle');
        shadow.setAttribute('r', '25.5');
        shadow.setAttribute('fill', '#ddd');
        shadow.setAttribute('filter', 'url(#f1)');
        btnWrap.append(shadow);

        // -------------------------------------------------------------------------
        // pozioma linia
        let rectH = getSVGelem('rect');
        rectH.setAttribute('x', -(wrapParam.w / 2));
        rectH.setAttribute('y', -0.5);
        rectH.setAttribute('width', wrapParam.w);
        rectH.setAttribute('height', 1);
        rectH.setAttribute('fill', '#ddd');
        btnWrap.append(rectH);

        // animacja linii poziomej
        let rectHax = setAnimation(rectH, 'x');
        let rectHaw = setAnimation(rectH, 'width');
        let v4a = -(wrapParam.w / 2);
        let v4b = 0;
        let v5a = wrapParam.w;
        let v5b = 0;
        mapOn.push(() => {
            rectHax.setAttribute('values', '' + v4a + ' ; ' + v4b);
            rectHax.beginElement();
            rectHaw.setAttribute('values', '' + v5a + ' ; ' + v5b);
            rectHaw.beginElement();
        });
        mapOff.push(() => {
            rectHax.setAttribute('values', '' + v4b + ' ; ' + v4a);
            rectHax.beginElement();
            rectHaw.setAttribute('values', '' + v5b + ' ; ' + v5a);
            rectHaw.beginElement();
        });

        // -------------------------------------------------------------------------
        // pionowa linia
        let rectW = getSVGelem('rect');
        rectW.setAttribute('x', -0.5);
        rectW.setAttribute('y', -(wrapParam.h / 2));
        rectW.setAttribute('width', 1);
        rectW.setAttribute('height', wrapParam.h);
        rectW.setAttribute('fill', '#ddd');
        btnWrap.append(rectW);

        // animacja linii pionowej
        let rectWay = setAnimation(rectW, 'y');
        let rectWah = setAnimation(rectW, 'height');
        let v6a = -(wrapParam.h / 2);
        let v6b = 0;
        let v7a = wrapParam.h;
        let v7b = 0;
        mapOn.push(() => {
            rectWay.setAttribute('values', '' + v6a + ' ; ' + v6b);
            rectWay.beginElement();
            rectWah.setAttribute('values', '' + v7a + ' ; ' + v7b);
            rectWah.beginElement();
        });
        mapOff.push(() => {
            rectWay.setAttribute('values', '' + v6b + ' ; ' + v6a);
            rectWay.beginElement();
            rectWah.setAttribute('values', '' + v7b + ' ; ' + v7a);
            rectWah.beginElement();
        });

        // -------------------------------------------------------------------------
        // button
        let btn = getSVGelem('circle');
        btn.setAttribute('class', 'mapBtn');
        btn.setAttribute('r', '25.5');
        btn.setAttribute('fill', '#fff');
        btnWrap.append(btn);

        // -------------------------------------------------------------------------
        // strałka
        let arrow = getSVGelem('path');
        arrow.setAttribute('d', 'M -5,-2 L 0,3 5,-2');
        arrow.setAttribute('class', 'arrow');
        btnWrap.append(arrow);

        // animacja strałki
        let arrowA = setAnimation(arrow, 'd');
        let v8a = 'M -5,-2 L 0,3 5,-2';
        let v8b = 'M -5,2 L 0,-3 5,2';
        mapOn.push(() => {
            arrowA.setAttribute('values', '' + v8a + ' ; ' + v8b);
            arrowA.beginElement();
        });
        mapOff.push(() => {
            arrowA.setAttribute('values', '' + v8b + ' ; ' + v8a);
            arrowA.beginElement();
        });
    }

    { // górna alpa
        let path = getSVGelem('path');
        path.setAttribute('fill', '#D8232A');
        path.setAttribute('fill-rule', 'evenodd');
        path.setAttribute('d', '');
        svg.append(path);

        let animate = getSVGelem('animate');
        animate.setAttribute('id', 'shape');
        animate.setAttribute('attributeName', 'd');
        animate.setAttribute('dur', '0.5s');
        animate.setAttribute('repeatCount', '1');
        animate.setAttribute('fill', 'freeze');

        const zeroVal =
            'M 0,0 ' +
            data.w +
            ',0 ' +
            data.w +
            ',0' +
            ' C ' +
            data.w +
            ',0 ' +
            (data.w - data.w2) +
            ',0 ' +
            data.cw +
            ',0' +
            ' C ' +
            data.w2 +
            ',0 0,0 0,0 Z';
        curentShapeOfHeader =
            // 'M 0,0 ' + data.w + ',0 ' + data.w + ',' + data.h2 +
            //     ' C ' + data.w + ',' + data.h2 + ' ' + (data.w - data.w2) + ',' + data.h + ' ' + data.cw + ',' + data.h +
            //     ' C ' + data.w2 + ',' + data.h + ' 0,' + data.h2 + ' 0,' + data.h2 + ' Z';
            'M 0,0 ' +
            data.w +
            ',0 ' +
            data.w +
            ',' +
            data.hs +
            ' C ' +
            data.w +
            ',' +
            data.hs +
            ' ' +
            (data.w - data.w2) +
            ',' +
            data.hs +
            ' ' +
            data.cw +
            ',' +
            data.hs +
            '' +
            ' C ' +
            data.w2 +
            ',' +
            data.hs +
            ' 0,' +
            data.hs +
            ' 0,' +
            data.hs +
            ' Z';

        curentColorOfHeader = '#F3A805';

        animate.setAttribute('values', zeroVal + ' ; ' + curentShapeOfHeader);
        path.append(animate);

        let animate2 = getSVGelem('animate');
        animate2.setAttribute('id', 'color');
        animate2.setAttribute('attributeName', 'fill');
        animate2.setAttribute('dur', '0.5s');
        animate2.setAttribute('repeatCount', '1');
        animate2.setAttribute('fill', 'freeze');
        animate2.setAttribute('values', '#ffffff ; ' + curentColorOfHeader);
        path.append(animate2);

        setTimeout(() => {
            showed = true;

            mapOn.push(() => {
                animate.setAttribute(
                    'values',
                    '' + curentShapeOfHeader + ' ; ' + zeroVal,
                );
                animate.setAttribute('dur', '0.3s');
                animate.beginElement();
                animate2.setAttribute(
                    'values',
                    '' + curentColorOfHeader + ' ; ' + curentColorOfHeader,
                );
                animate2.setAttribute('dur', '0.001s');
                animate2.beginElement();
                cover.style.backgroundColor = '';
            });
            mapOff.push(() => {
                animate.setAttribute(
                    'values',
                    '' + zeroVal + ' ; ' + curentShapeOfHeader,
                );
                animate.setAttribute('dur', '0.3s');
                animate.beginElement();
                animate2.setAttribute(
                    'values',
                    '' + curentColorOfHeader + ' ; ' + curentColorOfHeader,
                );
                animate2.setAttribute('dur', '0.001s');
                animate2.beginElement();
            });
        }, 600);

        // animacja przy pokazaniu mapy
    }

    { // tylna przednia
        // wraper apli
        alertApla = getSVGelem('g');
        alertCurrentPos = data.alertHide;
        alertApla.setAttribute(
            'transform',
            'translate(0,' + alertCurrentPos + ')',
        );
        svg.append(alertApla);

        //animacja apli
        alertAplaA = setAnimaTrans(alertApla, 'transform');

        // -------------------------------------------------------------------------
        // cien pod aplą
        let filter = getSVGelem('filter');
        filter.setAttribute('id', 'f2');
        filter.setAttribute('x', '-1');
        filter.setAttribute('y', '-1');
        filter.setAttribute('width', '3');
        filter.setAttribute('height', '3');
        alertApla.append(filter);

        let blur = getSVGelem('feGaussianBlur');
        blur.setAttribute('stdDeviation', '39');
        filter.append(blur);

        let path = getSVGelem('path');
        path.setAttribute('fill', '#aaa');
        path.setAttribute('fill-rule', 'evenodd');
        let h1 = getY(22);
        let d =
            'M ' +
            data.w +
            ',' +
            0 +
            ' C ' +
            data.w +
            ',' +
            0 +
            ' ' +
            (data.w - data.w2) +
            ',' +
            h1 +
            ' ' +
            data.cw +
            ',' +
            h1 +
            ' C ' +
            data.w2 +
            ',' +
            h1 +
            ' 0,' +
            0 +
            ' 0,' +
            0 +
            ' L 0,' +
            h +
            ' ' +
            w +
            ',' +
            h +
            ' Z';
        path.setAttribute('d', d);
        path.setAttribute('filter', 'url(#f2)');
        alertApla.append(path);

        // -------------------------------------------------------------------------
        // kształt apli
        path = getSVGelem('path');
        path.setAttribute('fill', '#fff');
        path.setAttribute('fill-rule', 'evenodd');
        path.setAttribute('d', d);
        alertApla.append(path);

        alert1.style.top = data.alertBottom - 23 + 'px';
        alert1.style.left = getX(40) + 'px';
        alert1.style.width = getX(334) + 'px';
        alert1.style.opacity = '0';

        alert2.style.bottom = data.alertBottom - 23 + 'px';
        alert2.style.left = getX(40) + 'px';
        alert2.style.width = getX(334) + 'px';
        alert2.style.opacity = '0';
    }

    googleMap.style.width = getX(414) + 'px';
    googleMap.style.height = getY(896) + 'px';
};

init();
</script>
`;
