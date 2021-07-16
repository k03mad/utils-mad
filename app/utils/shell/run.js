'use strict';

const convert = require('../array/convert');
const cp = require('child_process');
const debug = require('debug')('utils-mad:shell:run');
const util = require('util');

const exec = util.promisify(cp.exec);

/**
 * @param {string|Array<string>} cmd
 * @returns {string}
 */
module.exports = async cmd => {
    const maxBuffer = 1024 * 5000;

    const run = convert(cmd).join(' && ');
    debug('%o', run);

    try {
        const {stdout, stderr} = await exec(run, {maxBuffer, shell: '/bin/bash'});
        return [stdout, stderr]
            .filter(Boolean)
            .map(elem => elem.trim())
            .join('\n\n');
    } catch (err) {
        throw new Error([
            'Error while trying to execute:',
            `$ ${run}`,
            `# code: ${err?.code}`,
            `# stdout: ${err?.stdout}`,
            `# stderr: ${err?.stderr}`,
        ].join('\n'));
    }
};
