const pointToComa = (num: Number) => num.toString().replace('.', ',');

const pointToComaString = (num: Number) => num.replace('.', ',');

const twoDigits = (num: Number) => (num < 10 ? '0' + num : '' + num);

const timer = (time: number) => {
    let sec = Math.round(time / 1000) % 60;
    let min = Math.floor((time + 1000) / (1000 * 60)) % 60;
    if (min < 0) {
        min = 0;
    }
    let hou = Math.floor((time + 1000) / (1000 * 60 * 60));
    if (hou < 0) {
        hou = 0;
    }

    let t1 = twoDigits(hou) + ':' + twoDigits(min);
    let t2 = ':' + twoDigits(sec);

    return t1 + t2;
};

const simplyTimer = (time: number) => {
    let min = Math.floor((time + 1000) / (1000 * 60)) % 60;
    if (min < 0) {
        min = 0;
    }
    let hou = Math.floor((time + 1000) / (1000 * 60 * 60));
    if (hou < 0) {
        hou = 0;
    }

    return hou + ':' + twoDigits(min);
};

export {pointToComa, pointToComaString, twoDigits, timer, simplyTimer};
