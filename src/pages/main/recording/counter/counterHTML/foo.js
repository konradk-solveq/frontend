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
    let hou = Math.floor(diference / (1000 * 60 * 60));

    values.time1 = twoDigits(hou) + ':' + twoDigits(min)
    values.time2 = ':' + twoDigits(sec)

    if (!coolDown) countersUpdate();
}

const start = () => {
    startTime = Date.now();
    interval = setInterval(timer, 1000)
}

const setPauseOn = () => {
    if (!showed) return;
    paused = true;
    let shape = document.getElementById('shape');
    let value = 'M 0,0 ' + data.w + ',0 ' + data.w + ',' + data.h2 +
        ' C ' + data.w + ',' + data.h2 + ' ' + (data.w - data.w2) + ',' + data.h + ' ' + data.cw + ',' + data.h +
        ' C ' + data.w2 + ',' + data.h + ' 0,' + data.h2 + ' 0,' + data.h2 + ' Z';
    curentShapeOfHeader = 'M 0,0 ' + data.w + ',0 ' + data.w + ',' + data.hs +
        ' C ' + data.w + ',' + data.hs + ' ' + (data.w - data.w2) + ',' + data.hs + ' ' + data.cw + ',' + data.hs + '' +
        ' C ' + data.w2 + ',' + data.hs + ' 0,' + data.hs + ' 0,' + data.hs + ' Z'
    shape.setAttribute('values', value + ' ; ' + curentShapeOfHeader);
    shape.setAttribute('dur', '0.4s');
    shape.beginElement();

    let color = document.getElementById('color');
    color.setAttribute('dur', '0.4s');
    color.setAttribute('values', '#D8232A ; #F3A805');
    color.beginElement();

    pauseStart = Date.now();
    clearInterval(interval);
}

const setPauseOff = () => {
    if (!showed) return;
    paused = false;
    let shape = document.getElementById('shape');
    let value = 'M 0,0 ' + data.w + ',0 ' + data.w + ',' + data.hs +
        ' C ' + data.w + ',' + data.hs + ' ' + (data.w - data.w2) + ',' + data.hs + ' ' + data.cw + ',' + data.hs + '' +
        ' C ' + data.w2 + ',' + data.hs + ' 0,' + data.hs + ' 0,' + data.hs + ' Z';
    curentShapeOfHeader = 'M 0,0 ' + data.w + ',0 ' + data.w + ',' + data.h2 +
        ' C ' + data.w + ',' + data.h2 + ' ' + (data.w - data.w2) + ',' + data.h + ' ' + data.cw + ',' + data.h +
        ' C ' + data.w2 + ',' + data.h + ' 0,' + data.h2 + ' 0,' + data.h2 + ' Z'
    shape.setAttribute('values', value + ' ; ' + curentShapeOfHeader);
    shape.setAttribute('dur', '0.4s');
    shape.beginElement();

    let color = document.getElementById('color');
    color.setAttribute('dur', '0.4s');
    color.setAttribute('values', '#F3A805 ; #D8232A');
    color.beginElement();

    pauseTime += (Date.now() - pauseStart);
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
}

const setMaxi = () => {
    mapOff.forEach(f => f());
    coolDownFoo();
}

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



init(414, 700, trans, { lat: 53.009342618210624, lng: 20.890509251985964 });




let onOff = true;
document.addEventListener('keydown', e => {

    if (e.keyCode == 80) {
        if (paused) {
            setPauseOff()
        } else {
            setPauseOn()
        }
    } else if (e.keyCode == 65) {
        if (alerted) {
            hideAlert()
        } else {
            showAlert(1, 'test test test test test')
        }
    } else if (e.keyCode == 83) {
        showAlert(2, 'test test test test test test test test test test test test test')
    } else if (e.keyCode == 68) {
        showAlert(1, 'YES !!')
    } else {
        if (onOff) {
            setMini();
            onOff = false;
        } else {
            setMaxi();
            onOff = true;
        }
    }
})