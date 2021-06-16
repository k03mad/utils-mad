'use strict';

const got = require('../../utils/request/got');
const {tinkoff} = require('../../../env');

/**
 * @param {string} token
 * @returns {object}
 */
module.exports = async (token = tinkoff.token) => {
    const api = 'https://api-invest.tinkoff.ru/openapi';

    const handlers = {
        portfolio: `${api}/portfolio`,
        currencies: `${api}/portfolio/currencies`,
    };

    const params = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const [{body: portfolio}, {body: currencies}] = await Promise.all(
        Object
            .values(handlers)
            .map(handler => got(handler, params)),
    );

    return {
        portfolio: portfolio.payload.positions,
        currencies: currencies.payload.currencies,
    };
};
