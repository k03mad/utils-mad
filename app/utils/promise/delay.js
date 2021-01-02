'use strict';

const debug = require('debug')('utils-mad:promise:delay');

/**
 * @param {number} time
 * @returns {Promise}
 */
module.exports = (time = 1000) => {
    debug(time);
    return new Promise(resolve => setTimeout(resolve, time));
};
