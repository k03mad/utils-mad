'use strict';

/**
 * @param {Array|Set} arr
 * @returns {Array}
 */
module.exports = arr => [...arr]
    .map(elem => elem.split('.').reverse())
    .sort()
    .map(elem => elem.reverse().join('.'));
