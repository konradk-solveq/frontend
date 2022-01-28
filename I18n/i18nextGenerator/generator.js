const ff = require('./filesFoo');

const pl_i18n = JSON.parse(ff.load('pl.json'));
const en_i18n = JSON.parse(ff.load('en.json'));

const VALUE_WHEN_NO_DATA = '';

const start = () => {
    const mix = (model, toComplete) => {
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
                result[key] = mix(modelItem, toCompleteItem);
            }
        }

        return result;
    };

    const mixed = mix(pl_i18n, en_i18n);

    console.log('---------------------------------');
    console.log('---------------------------------');
    console.log('mixed:', mixed);

    ff.save('en', mixed);
};

module.exports = {start};
