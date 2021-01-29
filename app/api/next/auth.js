'use strict';

const gotCache = require('../../utils/request/cache');
const {google, next} = require('../../../env');
const {win} = require('../../const/ua');

/**
 * @param {object} opts
 * @param {string} opts.email
 * @param {string} opts.password
 * @returns {Array}
 */
module.exports = async ({email = google.email, password = next.password} = {}) => {
    const {body, headers} = await gotCache('https://api.nextdns.io/accounts/@login', {
        method: 'POST',
        json: {email, password},
        headers: {
            'user-agent': win.chrome,
            'origin': 'https://my.nextdns.io',
        },
    }, {expire: '1d'});

    const errors = body?.errors;

    if (errors) {
        throw new Error(JSON.stringify(errors));
    }

    return headers['set-cookie']
        .map(elem => elem.split('; ')[0])
        .join('; ');
};
