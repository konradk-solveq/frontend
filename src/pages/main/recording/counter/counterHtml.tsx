import { Dimensions, PixelRatio, Platform, StatusBar } from 'react-native';

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const { height, width } = Dimensions.get('window');

const isIPhoneX = () => Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS
    ? width === X_WIDTH && height === X_HEIGHT || width === XSMAX_WIDTH && height === XSMAX_HEIGHT
    : false;

const StatusBarHeight = Platform.select({
    ios: isIPhoneX() ? 44 : 20,
    android: StatusBar.currentHeight,
    default: 0
})

console.log('%c StatusBarHeight:', StatusBarHeight)

let w = Dimensions.get('window').width;
let h = Dimensions.get('window').height;

let sbh = StatusBarHeight * PixelRatio.get();

if (Platform.OS === 'ios') {
    h = Dimensions.get('window').height - sbh;
}


export default `
<style>
@font-face {
    font-family: 'DIN2014Narrow-Light';
    font-style: normal;
    font-weight: 400;
    src: url('DIN2014Narrow-Light.eot');
    src: local('open sans extralight'), local('open-sans-extralight'), url('DIN2014Narrow-Light.eot?#iefix') format('embedded-opentype'), url('DIN2014Narrow-Light.woff2') format('woff2'), url('DIN2014Narrow-Light.woff') format('woff'), url('DIN2014Narrow-Light.ttf') format('truetype'), url('DIN2014Narrow-Light.svg#Barlow') format('svg'), url('DIN2014Narrow-Light.otf') format('otf');
}

@font-face {
    font-family: 'DIN2014Narrow-Regular';
    font-style: normal;
    font-weight: 400;
    src: url('DIN2014Narrow-Regular.eot');
    src: local('open sans extralight'), local('open-sans-extralight'), url('DIN2014Narrow-Regular.eot?#iefix') format('embedded-opentype'), url('DIN2014Narrow-Regular.woff2') format('woff2'), url('DIN2014Narrow-Regular.woff') format('woff'), url('DIN2014Narrow-Regular.ttf') format('truetype'), url('DIN2014Narrow-Regular.svg#Barlow') format('svg'), url('DIN2014Narrow-Regular.otf') format('otf');
}

@font-face {
    font-family: 'DIN2014Narrow-Bold';
    font-style: normal;
    font-weight: 400;
    src: url('DIN2014Narrow-Bold.eot');
    src: local('open sans extralight'), local('open-sans-extralight'), url('DIN2014Narrow-Bold.eot?#iefix') format('embedded-opentype'), url('DIN2014Narrow-Bold.woff2') format('woff2'), url('DIN2014Narrow-Bold.woff') format('woff'), url('DIN2014Narrow-Bold.ttf') format('truetype'), url('DIN2014Narrow-Bold.svg#Barlow') format('svg'), url('DIN2014Narrow-Bold.otf') format('otf');
}

body {
    margin: 0;
    padding: 0;
    background-color: #ffffff;
    /* overflow: hidden; */
    background-color: #fff;
    position: relative;
    // pointer-events: none;
}

.wrap {
    margin: 0 9.6618% 0 9.6618%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: green;
}

#wrap {
    fill: yellow;
}

svg {
    margin: 0;
    padding: 0;
}

.counter {
    width: calc(50% - 7.246377%);
    padding-left: 7.246377%;
    background-color: yellow;
}

.cou-left {
    width: calc(50% - 1px);
    padding-left: 0;
    border-right: 1px solid #aaa;
}

.cou-top {
    border-bottom: 1px solid #aaa;
}

.name {
    font-family: 'DIN2014Narrow-Light';
    font-size: 23px;
    fill: #555555;
}

.value {
    font-family: 'DIN2014Narrow-Regular';
    fill: #313131;
}

.unit {
    font-family: 'DIN2014Narrow-Regular';
    font-size: 18px;
    fill: #555555;
}

.mapBtn {
    cursor: pointer;
    pointer-events: initial;
}

.arrow {
    stroke: #313131;
    stroke-width: 2px;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
}

.alert {
    position: absolute;
    font-family: 'DIN2014Narrow-Regular';
    font-size: 23px;
    color: #313131;
    text-align: center;
    transition: opacity .3s;
}

#map {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
}

.cover {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 999;
    pointer-events: none;
}

.test {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1999;
    font-size: 35px;
}
</style>
<div id="map"></div>
<div class="cover">
<svg></svg>
<div id="alert1" class="alert"></div>
<div id="alert2" class="alert"></div>
<div class="test">`+ sbh + `</div>
</div>

<script>
const trans = {
    headerRecord: 'Trwa nagrywanie',
    headerPause: 'Pauza',
    distance: 'Dystans',
    distanceUnit: ' km',
    time: 'Czas',
    speed: 'Prędkość',
    speedUnit: ' km/h',
    averageSpeed: 'Średnia prędkość',
    averageSpeedUnit: ' km/h',
    btnPauza: 'PAUZA',
    btnPauzaOff: 'WZNÓW',
    btnEnd: 'ZAKOŃCZ',
    endText: 'Czy chcesz zakończyć nagrywanie trasy?',
    btnCancel: 'ANULUJ',
    btnBreak: 'PRZERWIJ',
};

const svg = document.querySelector('svg');
const cover = document.querySelector('.cover');
let w = 0;
let h = 0;
const wrapParam = {
    v: 0,
    c: 0
};
let wrap;
const obj = {};
const mapOn = [];
const mapOff = [];
let data = {};
const getSVGelem = type => document.createElementNS('http://www.w3.org/2000/svg', type);
const getX = n => w * (n / 414);
const getY = n => h * (n / 896);
const getYwrap = n => wrapParam.h * (n / 305);
let paused = false;
const alert1 = document.getElementById('alert1');
const alert2 = document.getElementById('alert2');
let alerted = false;
let alert1H = null;
let alert2H = null;
let curentShapeOfHeader = null;
let curentColorOfHeader = null;
let alertApla;
let alertH = 0;
let alertCurrentPos = 0;
const googleMap = document.getElementById('map');
let values = {
    distance: '00,00',
    time1: '00:00',
    time2: ':00',
    speed: '00,0',
    averageSpeed: '00,0',
};
let mapView = false;
let map;



const animDur = '0.4s';
const coolDownT = 430;
let coolDown = false;
let showed = false;

const setValues = v => {
    if (v.distance) values.distance = v.distance;
    if (v.speed) values.speed = v.speed;
    if (v.averageSpeed) values.averageSpeed = v.averageSpeed;
}

const getXless = (n, min) => w * (n / 414) < min ? min : w * (n / 414);
const getYless = (n, min) => w * (n / 896) < min ? min : w * (n / 896);

const getYlessCorect = (n, min) => {
    let res = h * (n / 896);
    if (res < min) {
        wrapParam.h = min;
        wrapParam.c = (min - res) * .666;
    } else {
        wrapParam.h = res;
        wrapParam.c = 0;
    }
    wrapParam.w = getX(414 - 80);
    return wrapParam
}

// -------------------------------------------------------------------------
const setAnimation = (parent, attr, keys = null) => {
    let a = getSVGelem('animate');
    a.setAttribute('attributeName', attr);
    a.setAttribute('dur', animDur);
    a.setAttribute('repeatCount', '1');
    a.setAttribute('fill', 'freeze');
    if (keys) a.setAttribute('keyTimes', keys);
    parent.append(a);
    return a;
}

const checkAnimation = (id, parent, attr, keys = null) => {
    let elem = document.getElementById(id);
    if (elem) return elem;
    return setAnimation(parent, attr, keys);
}

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
}

const counters = () => { // liczniki
    let index = 0;
    const setOneCounter = (name, value, unit, x, y) => {
        let cx = x;
        let cy = y + getYwrap(6 + 18) + 20 + 45
        let xl = getX(334) / 4;
        let posX = (xl * index);

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
            let a = checkAnimation(name + '_a1', t1, 'opacity')
            a.setAttribute('values', '1 ; 0 ; 0');
            a.setAttribute('keyTimes', '0 ; 0.15 ; 1');
            a.beginElement();
        })
        mapOff.push(() => {
            let a = checkAnimation(name + '_a1', t1, 'opacity')
            a.setAttribute('values', '0 ; 0 ; 1');
            a.setAttribute('keyTimes', '0 ; 0.85 ; 1');
            a.beginElement();
        })

        // -------------------------------------------------------------------------
        // wartośc licznikka
        let t2 = getSVGelem('text');
        t2.setAttribute('x', x)
        t2.setAttribute('y', cy);
        t2.setAttribute('class', 'value');
        t2.setAttribute('font-size', '57');
        let t2N = document.createTextNode(value);
        t2.append(t2N);
        wrap.append(t2);

        // animacja font size

        mapOn.push(() => {
            let a = checkAnimation(name + '_a2', t2, 'font-size')
            a.setAttribute('values', '57 ; 23');
            a.beginElement();
            t2.setAttribute('font-size', '23');
        })
        mapOff.push(() => {
            let a = checkAnimation(name + '_a2', t2, 'font-size')
            a.setAttribute('values', '23 ; 57');
            a.beginElement();
            t2.setAttribute('font-size', '57');
        })

        // animacja X
        let one5th = (cx - posX) / 5;
        let v1a = '' + cx + ' ; ' +
            ((one5th * 4) + posX) + ' ; ' +
            ((one5th * 3) + posX) + ' ; ' +
            ((one5th * 2) + posX) + ' ; ' +
            (one5th + posX) + ' ; ' +
            posX;
        mapOn.push(() => {
            let a = checkAnimation(name + '_a3', t2, 'x', '0 ; 0.05 ; 0.15 ; 0.35 ; 0.65 ; 1');
            a.setAttribute('values', v1a);
            a.beginElement();
            t2.setAttribute('x', posX);
        })

        let v1b = '' + posX + ' ; ' +
            (one5th + posX) + ' ; ' +
            ((one5th * 2) + posX) + ' ; ' +
            ((one5th * 3) + posX) + ' ; ' +
            ((one5th * 4) + posX) + ' ; ' +
            cx;
        mapOff.push(() => {
            let a = checkAnimation(name + '_a3', t2, 'x', '0 ; 0.05 ; 0.15 ; 0.35 ; 0.65 ; 1');
            a.setAttribute('values', v1b);
            a.beginElement();
            t2.setAttribute('x', cx);
        })

        // animacje Y
        one5th = cy / 5;
        let v2a = '' + cy + ' ; ' + (one5th * 4) + ' ; ' + (one5th * 3) + ' ; ' + (one5th * 2) + ' ; ' + one5th + ' ; ' + 0;
        mapOn.push(() => {
            let a = checkAnimation(name + '_a4', t2, 'y', '0 ; 0.05 ; 0.15 ; 0.35 ; 0.65 ; 1')
            a.setAttribute('values', v2a);
            a.beginElement();
            t2.setAttribute('y', 0);
        })

        let v2b = '0 ; ' + one5th + ' ; ' + (one5th * 2) + ' ; ' + (one5th * 3) + ' ; ' + (one5th * 4) + ' ; ' + cy;
        mapOff.push(() => {
            let a = checkAnimation(name + '_a4', t2, 'y', '0 ; 0.05 ; 0.15 ; 0.35 ; 0.65 ; 1')
            a.setAttribute('values', v2b);
            a.beginElement();
            t2.setAttribute('y', cy);
        })

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
        }
    }

    obj.distance = setOneCounter(trans.distance, values.distance, trans.distanceUnit, 0, 0);
    let x = getX(198)
    obj.time = setOneCounter(trans.time, values.time1, values.time2, x, 0);
    let y = getYwrap(6 + 18 + 90 + 20 + 45);
    obj.speed = setOneCounter(trans.speed, values.speed, trans.speedUnit, 0, y);
    obj.averageSpeed = setOneCounter(trans.averageSpeed, values.averageSpeed, trans.averageSpeedUnit, x, y);

}

const countersUpdate = () => { // liczniki
    let index = 0;
    const setOneCounter = (hook, value, unit, x, y) => {
        // wartośc licznikka
        hook.value.textContent = value;

        // jednostka licznika
        hook.unit = getSVGelem('tspan');
        hook.unit.setAttribute('class', 'unit');
        let u2N = document.createTextNode(unit);
        hook.unit.append(u2N);
        hook.value.append(hook.unit);

        index++;
    }

    setOneCounter(obj.distance, values.distance, trans.distanceUnit, 0, 0);
    let x = getX(198)
    setOneCounter(obj.time, values.time1, values.time2, x, 0);
    let y = getYwrap(6 + 18 + 90 + 20 + 45);
    setOneCounter(obj.speed, values.speed, trans.speedUnit, 0, y);
    setOneCounter(obj.averageSpeed, values.averageSpeed, trans.averageSpeedUnit, x, y);
}

const init = () => {
    // trans = t;
    w = ` + w + `;
    h = ` + h + `;
    getYlessCorect(305, 220);
    data = {
        w,
        h: getY(116),
        hs: getY(60),
        h2: getY(94),
        cw: 414 / 2,
        w2: getX(81),
        alertBottom: (getY(896 - 94) - 50),
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
        let y2 = (getY(896 - 94 - 22 - 12) - 50 - 23 - 25.5);
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
        })
        mapOff.push(() => {
            aplaA.setAttribute('from', v9b);
            aplaA.setAttribute('to', v9a);
            aplaA.beginElement();
            apla.style.setProperty('pointer-events', 'initial');
        })

        // -------------------------------------------------------------------------
        // cien pod aplą
        let filter = getSVGelem('filter');
        filter.setAttribute('id', 'f2');
        filter.setAttribute('x', '-1');
        filter.setAttribute('y', '-1');
        filter.setAttribute('width', '3');
        filter.setAttribute('height', '3');
        apla.append(filter);

        let blur = getSVGelem('feGaussianBlur');
        blur.setAttribute('stdDeviation', '39');
        filter.append(blur);

        let path = getSVGelem('path');
        path.setAttribute('fill', '#aaa');
        path.setAttribute('fill-rule', 'evenodd');
        let h1 = getY(22);
        let h2 = h + getY(32);
        let d = 'M 0,0' +
            ' C 0,0 ' + data.w2 + ',' + h1 + ' ' + data.cw + ',' + h1 +
            ' C ' + (data.w - data.w2) + ',' + h1 + ' ' + w + ',0 ' + w + ',0' +
            ' L ' + w + ',0 ' + w + ',' + h2 + ' 0,' + h2 +
            ' Z';

        path.setAttribute('d', d);
        path.setAttribute('filter', 'url(#f2)');
        apla.append(path);

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
        wrap.setAttribute('transform', 'translate(' + getX(40) + ',' + (getY(287) - wrapParam.c) + ')');
        svg.append(wrap)

        // animacja wrapera
        wrapA = setAnimaTrans(wrap, 'transform');
        let v0a = '' + getX(40) + ',' + (getY(287) - wrapParam.c);
        let v0b = '' + getX(40) + ',' + (getY(896 - 94) - 50);
        mapOn.push(() => {
            wrapA.setAttribute('from', v0a);
            wrapA.setAttribute('to', v0b);
            wrapA.beginElement();
        })
        mapOff.push(() => {
            wrapA.setAttribute('from', v0b);
            wrapA.setAttribute('to', v0a);
            wrapA.beginElement();
        })
    }

    counters();

    { // kros z buttonem
        // -------------------------------------------------------------------------
        // wraper buttona do mapy
        let btnWrap = getSVGelem('g');
        btnWrap.setAttribute('transform', 'translate(' + (getX(414 - 80) / 2) + ',' + (wrapParam.h / 2) + ')');
        wrap.append(btnWrap);
        btnWrapA = setAnimaTrans(btnWrap, 'transform');

        // animacja całej grupy buttona z krzyżakiem
        let v3a = '' + (getX(414 - 80) / 2) + ',' + (wrapParam.h / 2);
        let v3b = '' + (getX(414 - 80) / 2) + ',' + (-(23 + 25.5 + getY(12)));
        mapOn.push(() => {
            btnWrapA.setAttribute('from', v3a);
            btnWrapA.setAttribute('to', v3b);
            btnWrapA.beginElement();
        })
        mapOff.push(() => {
            btnWrapA.setAttribute('from', v3b);
            btnWrapA.setAttribute('to', v3a);
            btnWrapA.beginElement();
        })

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
        rectH.setAttribute('x', -((wrapParam.w / 2)));
        rectH.setAttribute('y', -.5);
        rectH.setAttribute('width', wrapParam.w);
        rectH.setAttribute('height', 1);
        rectH.setAttribute('fill', '#ddd');
        btnWrap.append(rectH);

        // animacja linii poziomej
        let rectHax = setAnimation(rectH, 'x');
        let rectHaw = setAnimation(rectH, 'width')
        let v4a = -((wrapParam.w / 2));
        let v4b = 0;
        let v5a = wrapParam.w;
        let v5b = 0;
        mapOn.push(() => {
            rectHax.setAttribute('values', '' + v4a + ' ; ' + v4b);
            rectHax.beginElement();
            rectHaw.setAttribute('values', '' + v5a + ' ; ' + v5b);
            rectHaw.beginElement();
        })
        mapOff.push(() => {
            rectHax.setAttribute('values', '' + v4b + ' ; ' + v4a);
            rectHax.beginElement();
            rectHaw.setAttribute('values', '' + v5b + ' ; ' + v5a);
            rectHaw.beginElement();
        })

        // -------------------------------------------------------------------------
        // pionowa linia
        let rectW = getSVGelem('rect');
        rectW.setAttribute('x', -.5);
        rectW.setAttribute('y', -((wrapParam.h / 2)));
        rectW.setAttribute('width', 1);
        rectW.setAttribute('height', wrapParam.h);
        rectW.setAttribute('fill', '#ddd');
        btnWrap.append(rectW);

        // animacja linii pionowej
        let rectWay = setAnimation(rectW, 'y');
        let rectWah = setAnimation(rectW, 'height')
        let v6a = -((wrapParam.h / 2));
        let v6b = 0;
        let v7a = wrapParam.h;
        let v7b = 0;
        mapOn.push(() => {
            rectWay.setAttribute('values', '' + v6a + ' ; ' + v6b);
            rectWay.beginElement();
            rectWah.setAttribute('values', '' + v7a + ' ; ' + v7b);
            rectWah.beginElement();
        })
        mapOff.push(() => {
            rectWay.setAttribute('values', '' + v6b + ' ; ' + v6a);
            rectWay.beginElement();
            rectWah.setAttribute('values', '' + v7b + ' ; ' + v7a);
            rectWah.beginElement();
        })

        // -------------------------------------------------------------------------
        // button
        let btn = getSVGelem('circle');
        btn.setAttribute('class', 'mapBtn');
        btn.setAttribute('r', '25.5');
        btn.setAttribute('fill', '#fff');
        btnWrap.append(btn);

        btn.addEventListener('click', e => {
            clickMapShower();
        })


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
        })
        mapOff.push(() => {
            arrowA.setAttribute('values', '' + v8b + ' ; ' + v8a);
            arrowA.beginElement();
        })
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

        const zeroVal = 'M 0,0 ' + data.w + ',0 ' + data.w + ',0' +
            ' C ' + data.w + ',0 ' + (data.w - data.w2) + ',0 ' + data.cw + ',0' +
            ' C ' + data.w2 + ',0 0,0 0,0 Z';
        curentShapeOfHeader =
            // 'M 0,0 ' + data.w + ',0 ' + data.w + ',' + data.h2 +
            //     ' C ' + data.w + ',' + data.h2 + ' ' + (data.w - data.w2) + ',' + data.h + ' ' + data.cw + ',' + data.h +
            //     ' C ' + data.w2 + ',' + data.h + ' 0,' + data.h2 + ' 0,' + data.h2 + ' Z';
            'M 0,0 ' + data.w + ',0 ' + data.w + ',' + data.hs +
            ' C ' + data.w + ',' + data.hs + ' ' + (data.w - data.w2) + ',' + data.hs + ' ' + data.cw + ',' + data.hs + '' +
            ' C ' + data.w2 + ',' + data.hs + ' 0,' + data.hs + ' 0,' + data.hs + ' Z';

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
                animate.setAttribute('values', '' + curentShapeOfHeader + ' ; ' + zeroVal);
                animate.setAttribute('dur', '0.3s');
                animate.beginElement();
                animate2.setAttribute('values', '' + curentColorOfHeader + ' ; ' + curentColorOfHeader);
                animate2.setAttribute('dur', '0.001s');
                animate2.beginElement();
                cover.style.backgroundColor = '';
            })
            mapOff.push(() => {
                animate.setAttribute('values', '' + zeroVal + ' ; ' + curentShapeOfHeader);
                animate.setAttribute('dur', '0.3s');
                animate.beginElement();
                animate2.setAttribute('values', '' + curentColorOfHeader + ' ; ' + curentColorOfHeader);
                animate2.setAttribute('dur', '0.001s');
                animate2.beginElement();
            })

        }, 600);

        // animacja przy pokazaniu mapy
    }

    { // tylna przednia
        // wraper apli
        alertApla = getSVGelem('g');
        alertCurrentPos = data.alertHide;
        alertApla.setAttribute('transform', 'translate(0,' + alertCurrentPos + ')');
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
        let d = 'M ' + data.w + ',' + 0 +
            ' C ' + data.w + ',' + 0 + ' ' + (data.w - data.w2) + ',' + h1 + ' ' + data.cw + ',' + h1 +
            ' C ' + data.w2 + ',' + h1 + ' 0,' + 0 + ' 0,' + 0 +
            ' L 0,' + h + ' ' + w + ',' + h +
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

        alert1.style.top = (data.alertBottom - 23) + 'px';
        alert1.style.left = getX(40) + 'px';
        alert1.style.width = getX(334) + 'px';
        alert1.style.opacity = '0';

        alert2.style.bottom = (data.alertBottom - 23) + 'px';
        alert2.style.left = getX(40) + 'px';
        alert2.style.width = getX(334) + 'px';
        alert2.style.opacity = '0';
    }

    googleMap.style.width = getX(414) + 'px';
    googleMap.style.height = getY(896) + 'px';


    mapOn.push(() => {
        map.setOptions({
            draggable: true,
            zoomControl: true,
            scrollwheel: true,
            disableDoubleClickZoom: false
        });
    })
    mapOff.push(() => {
        map.setOptions({
            draggable: false,
            zoomControl: false,
            scrollwheel: false,
            disableDoubleClickZoom: true
        });
    })
};

init();

function initMap() {
    map = new google.maps.Map(googleMap);

    const icons = {
        parking: {
            icon: "icon.png",
        },
        library: {
            icon: "icon2.png",
        },
        info: {
            icon: "icon3.png",
        },
    };

    const features = [{
        position: new google.maps.LatLng(-33.91721, 151.2263),
        type: "info",
    }, {
        position: new google.maps.LatLng(-33.91539, 151.2282),
        type: "info",
    }, ];

    // Create markers.
    for (let i = 0; i < features.length; i++) {
        const marker = new google.maps.Marker({
            position: features[i].position,
            icon: icons[features[i].type].icon,
            map: map,
        });
    }

    map.setOptions({
        draggable: false,
        zoomControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: true
    });

    window.ReactNativeWebView.postMessage("map is ready");
}

const setPositionOnMap = pos => {
    map = new google.maps.Map(googleMap, {
        center: new google.maps.LatLng(pos.lat, pos.lng),
        zoom: 15,
    });
}


let interval = null;
let startTime = 0;
let pauseTime = 0;
let pauseStart = 0;

const pointToComa = num => num.toString().replace('.', ',');

const twoDigits = num => num < 10 ? '0' + num : '' + num;

const timer = () => {
    let diference = Date.now() - startTime - pauseTime;
    let sec = Math.round(diference / 1000) % 60;
    let min = Math.floor(diference / (1000 * 60)) % 60;
    if (min < 0) min = 0;
    let hou = Math.floor(diference / (1000 * 60 * 60));
    if (hou < 0) hou = 0;

    values.time1 = twoDigits(hou) + ':' + twoDigits(min)
    values.time2 = ':' + twoDigits(sec)

    if (!coolDown) countersUpdate();
    let val = values.time1 + values.time2;
}

let started = false;
const start = () => {
    if (started) return;
    started = true;
    startTime = Date.now();
    pauseStart = Date.now();
    interval = setInterval(timer, 1000)
}

const setPauseOn = () => {
    if (!showed) return;
    paused = true;
    let shape = document.getElementById('shape');
    let value = curentShapeOfHeader;
    curentShapeOfHeader = 'M 0,0 ' + data.w + ',0 ' + data.w + ',' + data.hs +
        ' C ' + data.w + ',' + data.hs + ' ' + (data.w - data.w2) + ',' + data.hs + ' ' + data.cw + ',' + data.hs + '' +
        ' C ' + data.w2 + ',' + data.hs + ' 0,' + data.hs + ' 0,' + data.hs + ' Z';
    if (!mapView) {
        shape.setAttribute('values', value + ' ; ' + curentShapeOfHeader);
        shape.setAttribute('dur', '0.4s');
        shape.beginElement();
    }

    let color = document.getElementById('color');
    color.setAttribute('dur', '0.4s');
    value = curentColorOfHeader;
    curentColorOfHeader = '#F3A805';
    if (!mapView) {
        color.setAttribute('values', value + ' ; ' + curentColorOfHeader);
        color.beginElement();
    }

    pauseStart = Date.now();
    clearInterval(interval);
    interval = null;
}

const setPauseOff = () => {
    if (!showed) return;
    paused = false;
    let shape = document.getElementById('shape');
    let value = curentShapeOfHeader;
    curentShapeOfHeader = 'M 0,0 ' + data.w + ',0 ' + data.w + ',' + data.h2 +
        ' C ' + data.w + ',' + data.h2 + ' ' + (data.w - data.w2) + ',' + data.h + ' ' + data.cw + ',' + data.h +
        ' C ' + data.w2 + ',' + data.h + ' 0,' + data.h2 + ' 0,' + data.h2 + ' Z';
    if (!mapView) {
        shape.setAttribute('values', value + ' ; ' + curentShapeOfHeader);
        shape.setAttribute('dur', '0.4s');
        shape.beginElement();
    }

    let color = document.getElementById('color');
    color.setAttribute('dur', '0.4s');
    value = curentColorOfHeader;
    curentColorOfHeader = '#D8232A';
     if (!mapView) {
        color.setAttribute('values', value + ' ; ' + curentColorOfHeader);
        color.beginElement();
    }

    pauseTime += (Date.now() - pauseStart);
    if (!interval)
        interval = setInterval(timer, 1000)
}

const coolDownFoo = () => {
    coolDown = true;
    setTimeout(() => {
        coolDown = false;
        countersUpdate();
    }, coolDownT);
}

const setMini = () => {
    mapOn.forEach(f => f());
    coolDownFoo();
    mapView = true;
}

const setMaxi = () => {
    mapOff.forEach(f => f());
    coolDownFoo();
    mapView = false;
}

let onOff = true;
const clickMapShower = () => {
    if (onOff) {
        setMini();
        onOff = false;
    } else {
        setMaxi();
        onOff = true;
    }
}

const showAlert = (num, txt) => {
    alerted = true;

    alert1.style.opacity = 0;
    alert2.style.opacity = 0;
    alert1.innerHTML = '';
    alert2.innerHTML = '';

    let alert = (num == 1) ? alert1 : alert2;
    alert.innerHTML = txt;
    setTimeout(() => {
        alertH = alert.getBoundingClientRect().height;
        if (num == 1 && alert1H) {alertH = alert1H} else {alert1H = alertH}
        if (num == 2 && alert2H) {alertH = alert2H} else {alert2H = alertH}

        alert.style.top = (data.alertBottom - alertH) + 'px';
        let startFrom = alertCurrentPos;
        alertCurrentPos = (data.alertBottom - alertH - getY(38));

        alertAplaA.setAttribute('from', '0, ' + startFrom);
        alertAplaA.setAttribute('to', '0, ' + alertCurrentPos);
        alertAplaA.beginElement();

        setTimeout(() => {
            alert.style.opacity = 1;
        }, 300);
    }, 100);
}

const hideAlert = () => {
    alerted = false;

    alert1.style.opacity = 0;
    alert2.style.opacity = 0;
    setTimeout(() => {
        alertAplaA.setAttribute('from', '0, ' + alertCurrentPos);
        alertAplaA.setAttribute('to', '0, ' + data.alertHide);
        alertCurrentPos = data.alertHide;
        alertAplaA.beginElement();
    }, 300)
}


</script>

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBcuDhYsJJqOBvWppdbLf5y75V8OdNOevQ&map_ids=2ffa275ecc610735&callback=initMap">
</script>
`