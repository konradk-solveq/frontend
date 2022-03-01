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
    const t = isNaN(time) ? 0 : time;
    let min = Math.floor((t + 1000) / (1000 * 60)) % 60;
    if (min < 0) {
        min = 0;
    }
    let hou = Math.floor((t + 1000) / (1000 * 60 * 60));
    if (hou < 0) {
        hou = 0;
    }

    return hou + ':' + twoDigits(min);
};

const timeWithHandM = (time: string) => {
    const splited = time.split(':');
    return {
        h: splited[0],
        m: splited[1],
    };
};

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export {
    pointToComa,
    pointToComaString,
    twoDigits,
    timer,
    simplyTimer,
    timeWithHandM,
    capitalize,
};
