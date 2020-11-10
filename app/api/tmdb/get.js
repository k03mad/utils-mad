'use strict';

const got = require('../../utils/request/got');
const gotCache = require('../../utils/request/cache');
const {tmdb} = require('../../../env');

/**
 * @param {object} opts
 * @param {string} opts.path
 * @param {object} opts.params
 * @param {string} opts.key
 * @param {string} opts.language
 * @param {object} opts.gotOpts
 * @param {boolean} opts.cache
 * @param {string} opts.expire
 * @returns {Promise<object>}
 */
module.exports = async ({

    path, params = {},
    key = tmdb.key,
    language = 'ru-RU',
    gotOpts = {},
    cache,
    expire,

}) => {
    const request = [
        `https://api.themoviedb.org/3/${path}`, {
            searchParams: {
                api_key: key,
                language,
                ...params,
            },
            ...gotOpts,
        },
    ];

    const {body} = cache
        ? await gotCache(...request, {expire})
        : await got(...request);

    return body.results || body;
};
