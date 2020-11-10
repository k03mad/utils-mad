'use strict';

const convert = require('../array/convert');

/**
 * @param {string} str
 * @param {Array} chars
 * @returns {string}
 */
module.exports = (str, chars = [',', ' ']) => {
    let escaped = str;

    convert(chars).forEach(char => {
        escaped = escaped.replace(new RegExp(char, 'g'), `\\${char}`);
    });

    return escaped;
};
