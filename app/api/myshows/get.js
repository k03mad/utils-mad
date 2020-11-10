'use strict';

const auth = require('./auth');
const gotCache = require('../../utils/request/cache');

/**
 * @param {object} opts
 * @param {string} opts.method
 * @param {object} opts.cred
 * @param {object} opts.params
 * @param {object} opts.gotOpts
 * @returns {object}
 */
module.exports = async ({

    method, cred,
    params = {},
    gotOpts = {},

}) => {
    const {token, type, login} = await auth({cred, gotOpts});

    const {body} = await gotCache('https://api.myshows.me/v2/rpc/', {
        method: 'POST',
        headers: {
            authorization: `${type} ${token}`,
        },
        json: {
            id: 1,
            jsonrpc: '2.0',
            params: {login, ...params},
            method,
        },
        ...gotOpts,
    }, {expire: '30m'});

    return body.result;
};
