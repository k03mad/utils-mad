'use strict';

/**
 * @param {string} str
 * @param {number} l
 * @returns {Array}
 */
module.exports = (str, l) => {
    const strs = [];

    while (str.length > l) {
        let pos = str.slice(0, l).lastIndexOf('\n');
        pos = pos <= 0 ? l : pos;
        strs.push(str.slice(0, pos));

        let i = str.indexOf('\n', pos) + 1;

        if (i < pos || i > pos + l) {
            i = pos;
        }

        str = str.slice(i);
    }

    strs.push(str);
    return strs;
};
