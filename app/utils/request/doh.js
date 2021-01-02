'use strict';

const gotCache = require('./cache');

/**
 * @param {string} domain
 * @returns {Promise<object>}
 */
module.exports = async domain => {
    const {body} = await gotCache('https://cloudflare-dns.com/dns-query', {
        headers: {accept: 'application/dns-json'},
        searchParams: {name: domain},
    }, {expire: '1h'});

    return body;
};
