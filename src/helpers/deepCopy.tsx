// ***************************
// https://github.com/MichalAniol/deepCopy/blob/master/index.js
// MIT
//
// zamiast ... (destrukturyzacji) i składania arraja spowrotem.
// unika błedów płykiej kopi na zanieżdżeniach arraya
// ***************************

const deepCopy = obj => {
    let copy;

    // Handle the 3 simple types, and null or undefined
    if (obj == null || typeof obj !== 'object') {
        if (typeof obj === 'undefined') {
            return;
        }
        return obj;
    }

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (let i = 0, len = obj.length; i < len; i++) {
            copy[i] = deepCopy(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (let attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                let res = deepCopy(obj[attr]);
                if (typeof res !== 'undefined') {
                    copy[attr] = res;
                }
            }
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
};

export default deepCopy;
