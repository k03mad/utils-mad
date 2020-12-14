'use strict';

const auth = require('./auth');
const got = require('../../utils/request/got');
const {google, next} = require('../../../env');
const {win} = require('../../const/ua');

/**
 * @param {object} opts
 * @param {string} opts.path
 * @param {string} [opts.method]
 * @param {string} [opts.email]
 * @param {string} [opts.password]
 * @param {string} [opts.config]
 * @param {object} [opts.searchParams]
 * @returns {Array}
 */
module.exports = async ({
    path,
    method = 'GET',
    email = google.email,
    password = next.password,
    config = next.config,
    searchParams = {
        from: '-30d',
        timezoneOffset: '-180',
        selector: true,
    },
} = {}) => {
    const cookie = await auth({email, password});
    const {body} = await got(`https://api.nextdns.io/configurations/${config}/${path}`, {
        method,
        searchParams,
        headers: {
            'user-agent': win.chrome,
            cookie,
        },
    });

    return body;
};
