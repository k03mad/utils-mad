'use strict';

const gotCache = require('./cache');

/**
 * @param {object} opts
 * @param {string} opts.resolver
 * @param {string} opts.domain
 * @returns {Promise<object>}
 */
module.exports = async ({resolver = 'https://cloudflare-dns.com/dns-query', domain}) => {
    const {body} = await gotCache(resolver, {
        headers: {accept: 'application/dns-json'},
        searchParams: {name: domain},
    }, {expire: '1m'});

    return body;
};
