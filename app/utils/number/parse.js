'use strict';

/**
 * @param {string} str
 * @returns {number}
 */
module.exports = str => Number(str.replace(',', '.').match(/^-|\d+(\.\d+)?/g).join(''));
