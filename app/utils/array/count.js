'use strict';

const convert = require('./convert');

/**
 * @param {Array|*} arr
 * @param {object} values
 * @returns {object}
 */
module.exports = (arr, values = {}) => {
    convert(arr).forEach(elem => {
        values[elem] = ++values[elem] || 1;
    });

    return values;
};
