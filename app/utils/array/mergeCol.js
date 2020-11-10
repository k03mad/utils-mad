'use strict';

/**
 * @param {Array} arr
 * @returns {object}
 */
module.exports = arr => {
    const output = {};
    arr.forEach(elem => Object.assign(output, elem));

    return output;
};
