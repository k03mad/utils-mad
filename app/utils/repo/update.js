'use strict';

const run = require('../shell/run');

/**
 * @param {string} repo
 * @returns {Promise<string>}
 */
module.exports = repo => run([
    `cd ~/git/${repo}`,
    'git reset --hard',
    'git pull',
    'npm run setup',
]);
