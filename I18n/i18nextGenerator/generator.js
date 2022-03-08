const ff = require('./saveLoadFiles');

const valueFromRun = process.env.VAL;
const VALUE_WHEN_NO_DATA = valueFromRun ? valueFromRun : '__';

const MODEL_FILE = 'pl';
const FILE_TO_COMPLETE = 'en';

const modelFile = JSON.parse(ff.load(`${MODEL_FILE}.json`));
const fileToComplete = JSON.parse(ff.load(`${FILE_TO_COMPLETE}.json`));

const start = () => {
    const getValueWithAttributes = value => {
        if (typeof value === 'boolean') {
            return value;
        }

        const splitted = value.split('{{');
        if (splitted.length > 1) {
            let competeValue = '';

            if (splitted[0].length > 0) {
                competeValue += VALUE_WHEN_NO_DATA;
            }

            for (const s of splitted) {
                if (s.indexOf('}}') < 0) {
                    continue;
                }
                const secondSplit = s.split('}}');
                competeValue += `{{${secondSplit[0]}}}`;
                if (secondSplit[1].length > 0) {
                    competeValue += VALUE_WHEN_NO_DATA;
                }
            }
            return competeValue;
        }
        return VALUE_WHEN_NO_DATA;
    };

    const complete = (model, toComplete) => {
        let result = {};

        for (const key in model) {
            const modelItem = model[key];
            let toCompleteItem;

            if (
                typeof toComplete !== 'undefined' &&
                !Array.isArray(toCompleteItem)
            ) {
                toCompleteItem = toComplete[key];
            }

            if (Array.isArray(modelItem)) {
                let arr = [];
                for (let i = 0; i < modelItem.length; ++i) {
                    if (
                        typeof toCompleteItem === 'undefined' ||
                        typeof toCompleteItem[i] === 'undefined'
                    ) {
                        if (typeof modelItem[i] === 'object') {
                            const obj = {};

                            const keys = Object.keys(modelItem[i]);
                            for (const k of keys) {
                                obj[k] = getValueWithAttributes(
                                    modelItem[i][k],
                                );
                            }

                            arr.push(obj);
                        } else {
                            arr.push(getValueWithAttributes(modelItem[i]));
                        }
                    } else {
                        arr.push(toCompleteItem[i]);
                    }
                }
                result[key] = arr;
                continue;
            }

            if (typeof modelItem !== 'object') {
                if (typeof toCompleteItem === 'undefined') {
                    const translation = modelItem;
                    result[key] = getValueWithAttributes(translation);
                } else {
                    result[key] = toCompleteItem;
                }
            } else {
                result[key] = complete(modelItem, toCompleteItem);
            }
        }

        return result;
    };

    const completed = complete(modelFile, fileToComplete);

    console.log('---------------------------------');
    console.log('---------------------------------');
    console.log('THE FILE HAS BEEN SUCCESSFULLY CREATED ');
    console.log('---------------------------------');
    console.log('---------------------------------');

    ff.save(FILE_TO_COMPLETE, completed);
};

module.exports = {start};
