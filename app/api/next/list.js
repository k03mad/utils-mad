'use strict';

const query = require('./query');
const {google, next} = require('../../../env');

/**
 * @param {object} opts
 * @param {string} opts.path
 * @param {string} [opts.email]
 * @param {string} [opts.password]
 * @param {string} [opts.config]
 * @returns {Array}
 */
module.exports = async ({
    path,
    email = google.email,
    password = next.password,
    config = next.config,
} = {}) => {
    const list = await query({path, email, password, config});
    return list.map(({domain}) => domain);
};
