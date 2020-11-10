'use strict';

/**
 * @param {*} elem
 * @returns {Array}
 */
module.exports = elem => Array.isArray(elem) ? elem : [elem];
