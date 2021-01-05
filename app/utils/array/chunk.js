'use strict';

/**
 * @param {Array} arr
 * @param {number} size
 * @returns {Array}
 */
module.exports = (arr, size) => {
    const tempArr = arr.slice(0);
    const results = [];

    while (tempArr.length > 0) {
        results.push(tempArr.splice(0, size));
    }

    return results;
};
