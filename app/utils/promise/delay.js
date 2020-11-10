'use strict';

/**
 * @param {number} time
 * @returns {Promise}
 */
module.exports = (time = 1000) => new Promise(resolve => setTimeout(resolve, time));
