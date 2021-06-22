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
    const msg = [];

    if (beforeline) {
        msg.push('');
    }

    if (time) {
        msg.push(green(now()));
    }

    if (before) {
        msg.push(yellow(before));
    }

    if (full) {
        msg.push(err);
    } else {
        msg.push(err.toString());
    }

    if (err.options && err.options.url) {
        if (err.response && err.response.statusCode) {
            msg.push(`${red(err.response.statusCode)}:`);
        }

        if (err.options.method) {
            msg.push(green(err.options.method));
        }

        msg.push(blue(err.options.url));
    }

    if (after) {
        msg.push(yellow(after));
    }

    if (afterline) {
        msg.push('');
    }

    if (exitAfter) {
        errors++;
        msg.push(`> errors count: ${errors}/${exitAfter}`);

        if (exitAfter > errors) {
            errors = 0;
            exit = true;
        }
    }

    console.error(msg);

    if (exit) {
        msg.push('> kill process');
        process.exit(1);
    }
};
