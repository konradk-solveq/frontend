const fs = require('fs');
const path = require('path');

const path_in = path.join(__dirname, '..');
const path_out = __dirname.toString() + '/output';

const load = name => {
    const filePath = path_in + '/' + name;
    let data = null;

    try {
        if (fs.existsSync(filePath)) {
            data = fs.readFileSync(filePath);
        }
    } catch (err) {
        console.error(err);
    }

    console.log(' loaded: ' + name);

    return data;
};

const save = (name, data) => {
    if (!fs.existsSync(path_out)) {
        fs.mkdirSync(path_out);
    }

    const filePath = path_out + '/' + name + '.json';

    fs.writeFileSync(filePath, JSON.stringify(data));

    console.log(' saved: ' + name + '.json');
};

module.exports = {load, save};
