'use strict';

const env = require('../../../env');
const got = require('got');

/**
 * @param {object} response
 * @param {number} timing
 * @param {object} opts
 */
module.exports = (response, timing, opts) => {
    if (env.influx.request && env.influx.db && env.influx.url) {
        let body;

        try {
            const total = response?.timings?.phases?.total;

            if (total) {
                body = 'pi-node-request'
                    + ` ${response?.statusCode || 'code'}`
                    + `\\ ${response?.req?.method || 'method'}`
                    + `\\ ${response?.requestUrl ? new URL(response.requestUrl)?.hostname : 'domain'}`
                    + `=${total}`
                    + ` ${timing}`;

                got(`${env.influx.url}/write`, {
                    method: 'POST',
                    searchParams: {db: env.influx.db},
                    body, timeout: opts.timeout,
                }).catch(err => console.error(`Save stats to Influx failed\n${body}\n${err}`));
            } else {
                console.error(`Get timings for stats to Influx failed\n${total}`);
            }
        } catch (err) {
            console.error(`Generate body for stats to Influx failed\n${err}`);
        }
    }
};
