'use strict';

const auth = require('./auth');
const got = require('../../utils/request/got');
const {google, next} = require('../../../env');
const {win} = require('../../const/ua');

/**
 * @param {object} opts
 * @param {string} opts.path
 * @param {string} [opts.email]
 * @param {string} [opts.password]
 * @param {string} [opts.config]
 * @param {object} [opts.rest]
 * @returns {Array}
 */
module.exports = async ({
    path,
    rest,
    email = google.email,
    password = next.password,
    config = next.config,
} = {}) => {
    const cookie = await auth({email, password});
    const {body} = await got(`https://api.nextdns.io/configurations/${config}/${path}`, {
        headers: {
            'user-agent': win.chrome,
            cookie,
        },
        ...rest,
    });

    return body;
};
