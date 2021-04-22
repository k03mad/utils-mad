'use strict';

const convert = require('../array/convert');
const debug = require('debug')('utils-mad:folder:erase');
const fs = require('fs');

/**
 * @param {string|Array<string>} paths
 * @param {object} opts
 * @param {boolean} opts.sync
 */
module.exports = async (paths, {sync = false} = {}) => {
    const options = {force: true, recursive: true};

    for (const folder of convert(paths)) {
        debug(`Erasing folder (sync:${sync}):\n${folder}`);

        if (sync) {
            fs.rmSync(folder, options);
            fs.mkdirSync(folder, options);
            return;
        }

        await fs.promises.rm(folder, options);
        await fs.promises.mkdir(folder, options);
    }
};
