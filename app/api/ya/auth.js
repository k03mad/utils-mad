'use strict';

const gotCache = require('../../utils/request/cache');
const {android} = require('../../const/ua');
const {yandex} = require('../../../env');

/**
 * @param {object} opts
 * @param {string} opts.login
 * @param {string} opts.password
 * @returns {Array}
 */
module.exports = async ({login = yandex.login, password = yandex.password} = {}) => {
    const {headers} = await gotCache('https://passport.yandex.ru/auth/', {
        method: 'POST',
        form: {
            login,
            passwd: password,
        },
        headers: {
            'user-agent': android.pp,
        },
        followRedirect: false,
    });

    return headers['set-cookie']
        .map(elem => elem.split('; ')[0])
        .join('; ');
};
