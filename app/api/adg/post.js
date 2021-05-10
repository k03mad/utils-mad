'use strict';

const got = require('../../utils/request/got');
const {adg} = require('../../../env');

/**
 * @param {string} path
 * @param {object} opts
 * @param {string} opts.url
 * @param {string} opts.auth
 * @param {object} opts.json
 * @returns {Promise<object>}
 */
module.exports = async (path, {

    url = adg.url,
    auth = adg.auth,
    json = {},

} = {}) => {
    const {body} = await got(url + path, {
        method: 'POST',
        headers: {Authorization: `Basic ${auth}`},
        timeout: 30_000,
        json,
    });
    return body;
};
