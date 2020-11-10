'use strict';

const convert = require('../array/convert');
const cp = require('child_process');
const util = require('util');

const exec = util.promisify(cp.exec);

/**
 * @param {string|Array<string>} cmd
 * @returns {string}
 */
module.exports = async cmd => {
    const maxBuffer = 1024 * 5000;
    const cmdArray = convert(cmd);

    try {
        const {stdout, stderr} = await exec(cmdArray.join(' && '), {maxBuffer, shell: '/bin/bash'});
        return [stdout, stderr]
            .filter(Boolean)
            .map(elem => elem.trim())
            .join('\n\n');
    } catch (err) {
        throw new Error(`Error while trying to execute:\n> ${cmdArray.join('\n> ')}\n${err}`);
    }
};
