'use strict';

const convert = require('../array/convert');
const run = require('../shell/run');
const update = require('./update');

/**
 * @param {string} repo
 * @param {string|Array<string>}scripts
 * @returns {Promise<string>}
 */
module.exports = async (repo, scripts) => {
    const updateLog = await update(repo);

    const logs = [];

    for (const script of convert(scripts)) {
        const log = await run([
            `cd ~/git/${repo}`,
            `npm run ${script}`,
        ]);
        logs.push(log);
    }

    return `${updateLog}\n${logs.join('\n\n')}`;
};
