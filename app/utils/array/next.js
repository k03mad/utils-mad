'use strict';

/**
 * @param {Array} arr
 * @param {*} currentElem
 * @returns {*}
 */
module.exports = (arr, currentElem) => arr[arr.indexOf(currentElem) + 1] || arr[0];
