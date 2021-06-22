'use strict';

const now = require('../date/now');
const {green, yellow, red, blue} = require('chalk');

let errors = 0;

/**
 * @param {object} err
 * @param {object} opts
 * @param {boolean} opts.beforeline
 * @param {boolean} opts.afterline
 * @param {boolean} opts.time
 * @param {boolean} opts.full
 * @param {string} opts.after
 * @param {string} opts.before
 * @param {boolean} opts.exit
 * @param {number} opts.exitAfter
 */
module.exports = (err, {

    beforeline = true,
    afterline = true,
    time = true,
    full, after, before,
    exit, exitAfter,

} = {}) => {

    if (beforeline) {
        console.error('');
    }

    if (time) {
        console.error(green(now()));
    }

    if (before) {
        console.error(yellow(before));
    }

    if (full) {
        console.error(err);
    } else {
        console.error(err.toString());
    }

    const gotMessage = [];

    if (err.options && err.options.url) {
        if (err.response && err.response.statusCode) {
            gotMessage.push(`${red(err.response.statusCode)}:`);
        }

        if (err.options.method) {
            gotMessage.push(green(err.options.method));
        }

        gotMessage.push(blue(err.options.url));
    }

    if (gotMessage.length > 0) {
        console.error(`\n${gotMessage.join(' ')}`);
    }

    if (after) {
        console.error(yellow(after));
    }

    if (afterline) {
        console.error('');
    }

    if (exit) {
        process.exit(1);
    }

    if (exitAfter) {
        errors++;

        if (exitAfter > errors) {
            errors = 0;
            process.exit(1);
        }
    }
};
