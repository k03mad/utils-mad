'use strict';

/**
 * @param {Array} arr
 * @returns {Array}
 */
module.exports = arr => arr
    .slice(0)
    .map(a => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map(a => a[1]);
