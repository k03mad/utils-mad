'use strict';

/**
 * @param {object} obj
 * @param {string} path
 * @returns {*}
 */
module.exports = (obj, path) => {
    let objClone = JSON.parse(JSON.stringify(obj));

    const deep = path.split('.');

    for (const element of deep) {
        objClone = objClone[element];
    }

    return objClone;
};
