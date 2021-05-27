let interval = null;
let startTime = 0;
let pauseTime = 0;
let pauseStart = 0;
let alerted = false;
let alert1H = null;
let alert2H = null;
let alertH = 0;
let paused = false;
const coolDownT = 630; // update wartości licznika #animtime
let coolDown = false;
let mapView = false;

const pointToComa = num => num.toString().replace('.', ',');

const twoDigits = num => (num < 10 ? '0' + num : '' + num);

const countersUpdate = () => {
    // liczniki
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
    };

    setOneCounter(obj.distance, values.distance, trans.distanceUnit, 0, 0);
    let x = getX(198);
    setOneCounter(obj.time, values.time1, values.time2, x, 0);
    let y = getYwrap(6 + 18 + 90 + 20 + 45);
    setOneCounter(obj.speed, values.speed, trans.speedUnit, 0, y);
    setOneCounter(
        obj.averageSpeed,
        values.averageSpeed,
        trans.averageSpeedUnit,
        x,
        y,
    );
};

const timer = () => {
    let diference = Date.now() - startTime - pauseTime;
    let sec = Math.round(diference / 1000) % 60;
    let min = Math.floor((diference + 1000) / (1000 * 60)) % 60;
    if (min < 0) {
        min = 0;
    }
    let hou = Math.floor((diference + 1000) / (1000 * 60 * 60));
    if (hou < 0) {
        hou = 0;
    }

    values.time1 = twoDigits(hou) + ':' + twoDigits(min);
    values.time2 = ':' + twoDigits(sec);

    if (!coolDown) {
        countersUpdate();
    }
    let val = values.time1 + values.time2;
};

let started = false;
const start = () => {
    if (started) {
        return;
    }
    started = true;
    startTime = Date.now();
    pauseStart = Date.now();
    interval = setInterval(timer, 1000);
};

const setPauseOn = () => {
    if (!showed) {
        return;
    }
    paused = true;
    let shape = document.getElementById('shape');
    let value = curentShapeOfHeader;
    curentShapeOfHeader =
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
};

const setPauseOff = () => {
    if (!showed) {
        return;
    }
    paused = false;
    let shape = document.getElementById('shape');
    let value = curentShapeOfHeader;
    curentShapeOfHeader =
        'M 0,0 ' +
        data.w +
        ',0 ' +
        data.w +
        ',' +
        data.h2 +
        ' C ' +
        data.w +
        ',' +
        data.h2 +
        ' ' +
        (data.w - data.w2) +
        ',' +
        data.h +
        ' ' +
        data.cw +
        ',' +
        data.h +
        ' C ' +
        data.w2 +
        ',' +
        data.h +
        ' 0,' +
        data.h2 +
        ' 0,' +
        data.h2 +
        ' Z';
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

    pauseTime += Date.now() - pauseStart;
    if (!interval) {
        interval = setInterval(timer, 1000);
    }
};

const coolDownFoo = () => {
    coolDown = true;
    setTimeout(() => {
        coolDown = false;
        countersUpdate();
    }, coolDownT);
};

const setMini = () => {
    mapOn.forEach(f => f());
    coolDownFoo();
    mapView = true;
};

const setMaxi = () => {
    mapOff.forEach(f => f());
    coolDownFoo();
    mapView = false;
};

const showAlert = (num, txt) => {
    alerted = true;

    alert1.style.opacity = 0;
    alert2.style.opacity = 0;
    alert1.innerHTML = '';
    alert2.innerHTML = '';

    let alert = num == 1 ? alert1 : alert2;
    alert.innerHTML = txt;
    setTimeout(() => {
        alertH = alert.getBoundingClientRect().height;
        if (num == 1 && alert1H) {
            alertH = alert1H;
        } else {
            alert1H = alertH;
        }
        if (num == 2 && alert2H) {
            alertH = alert2H;
        } else {
            alert2H = alertH;
        }

        alert.style.top = data.alertBottom - alertH + 'px';
        let startFrom = alertCurrentPos;
        alertCurrentPos = data.alertBottom - alertH - getY(38);

        alertAplaA.setAttribute('from', '0, ' + startFrom);
        alertAplaA.setAttribute('to', '0, ' + alertCurrentPos);
        alertAplaA.beginElement();

        setTimeout(() => {
            alert.style.opacity = 1;
        }, 300);
    }, 100);
};

const hideAlert = () => {
    alerted = false;

    alert1.style.opacity = 0;
    alert2.style.opacity = 0;
    setTimeout(() => {
        alertAplaA.setAttribute('from', '0, ' + alertCurrentPos);
        alertAplaA.setAttribute('to', '0, ' + data.alertHide);
        alertCurrentPos = data.alertHide;
        alertAplaA.beginElement();
    }, 300);
};

const setValues = v => {
    if (coolDown) {
        return;
    }

    if (v.distance) {
        values.distance = pointToComa(v.distance);
    }
    if (v.speed) {
        values.speed = pointToComa(v.speed);
    }
    if (v.averageSpeed) {
        values.averageSpeed = pointToComa(v.averageSpeed);
    }

    countersUpdate();
};

const sleep = () => {}

const awake = () => {
    interval = setInterval(timer, 1000);

}