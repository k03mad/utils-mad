'use strict';

const gotCache = require('../../utils/request/cache');

/**
 * @param {string} type
 * @param {object} json
 * @returns {Promise<object>}
 */
module.exports = async (type, json) => {
    const {body} = await gotCache(`https://orna.guide/api/v1/${type}`, {
        method: 'POST',
        json,
    });

    return body;
};
