'use strict';

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @returns {Array}
 */
module.exports = (arr1, arr2) => [
    ...arr1.filter(x => !arr2.includes(x)),
    ...arr2.filter(x => !arr1.includes(x)),
];
