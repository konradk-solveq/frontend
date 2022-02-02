const ff = require('./saveLoadFiles');

const VALUE_WHEN_NO_DATA = '';
const MODEL_FILE = 'pl';
const FILE_TO_COMPLETE = 'en';

const modelFile = JSON.parse(ff.load(`${MODEL_FILE}.json`));
const fileToComplete = JSON.parse(ff.load(`${FILE_TO_COMPLETE}.json`));

const start = () => {
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
                            obj[Object.keys(modelItem[i])[0]] = '';
                            arr.push(obj);
                        } else {
                            arr.push('');
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
                    result[key] = VALUE_WHEN_NO_DATA;
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
