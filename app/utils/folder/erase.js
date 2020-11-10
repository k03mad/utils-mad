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
    for (const folder of convert(paths)) {
        debug(`Erasing folder (sync:${sync}):\n${folder}`);

        if (sync) {
            fs.rmdirSync(folder, {recursive: true});
            fs.mkdirSync(folder, {recursive: true});
        } else {
            await fs.promises.rmdir(folder, {recursive: true});
            await fs.promises.mkdir(folder, {recursive: true});
        }
    }
};
