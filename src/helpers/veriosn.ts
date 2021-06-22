export const getVersion = v => {
    let splited = v.split('.');
    let num = '';
    for (let s of splited) {
        if (s.length == 2) {
            num += '0' + s;
        }
        if (s.length == 1) {
            num += '00' + s;
        }
    }
    return Number(num);
};
