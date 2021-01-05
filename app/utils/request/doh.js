'use strict';

const got = require('./got');

/**
 * @param {object} opts
 * @param {string} opts.resolver
 * @param {string} opts.domain
 * @returns {Promise<object>}
 */
module.exports = async ({resolver = 'https://cloudflare-dns.com/dns-query', domain}) => {
    const {body} = await got(resolver, {
        headers: {accept: 'application/dns-json'},
        searchParams: {name: domain},
    });

    return body;
};
