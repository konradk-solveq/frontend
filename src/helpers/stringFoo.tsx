const pointToComa = (num: Number) => num.toString().replace('.', ',');

const twoDigits = (num: Number) => (num < 10 ? '0' + num : '' + num);

export {pointToComa, twoDigits};
