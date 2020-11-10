'use strict';

/**
 * @param {object} obj
 * @returns {object}
 */
module.exports = obj => Object.fromEntries(Object.entries(obj).map(elem => elem.reverse()));
