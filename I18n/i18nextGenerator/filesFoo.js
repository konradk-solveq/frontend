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

    // console.log(' loaded: ' + name);

    return data;
};

const loadByPat = path => {
    let data = null;

    try {
        if (fs.existsSync(path)) {
            data = fs.readFileSync(path);
        }
    } catch (err) {
        console.error(err);
    }

    // console.log(' loaded: ' + path);

    return data;
};

const readAllFiles = folder => {
    const getDir = dirPath => {
        var files = fs.readdirSync(dirPath);
        let res = [];

        for (let file of files) {
            if (file === '__test__') {
                continue;
            }
            if (file === 'mocks') {
                continue;
            }

            const newPath = dirPath + '/' + file;
            const obj = {};
            if (fs.lstatSync(newPath).isDirectory()) {
                const dir = getDir(newPath);
                obj[file] = dir;
                res.push(obj);
            } else {
                obj[file] = loadByPat(newPath).toString();
                res.push(obj);
            }
        }

        return res;
    };

    const filePath = path_in + '/' + folder;

    return getDir(filePath);
};

const save = (name, data) => {
    const filePath = path_out + '/' + name + '.json';
    fs.writeFileSync(filePath, JSON.stringify(data));
};

module.exports = { load, readAllFiles, save };