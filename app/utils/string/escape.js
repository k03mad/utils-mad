'use strict';

/**
 * @param {string} str
 * @param {Array} chars
 * @returns {string}
 */
module.exports = (str, chars = '*_`[') => str.replace(
    new RegExp(`[${chars}]`, 'g'),
    '\\$&',
);
