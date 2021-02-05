'use strict';

const convert = require('../../utils/array/convert');
const delay = require('../../utils/promise/delay');
const escape = require('../../utils/string/escape');
const got = require('../../utils/request/got');
const now = require('nano-time');
const {influx} = require('../../../env');

/**
 * @param {object} data
 */
module.exports = async data => {
    const RETRIES_COUNT = 3;
    const RETRIES_DELAY = 10000;

    const errors = [];

    for (const {
        url = influx.url,
        db = influx.db,
        meas, values,
        timestamp = now(),
    } of convert(data)) {
        try {
            const writeData = Object.entries(values).map(elem => {
                const [key, prop] = elem;
                return [
                    escape(key, ', '),
                    typeof prop === 'string' ? `"${escape(prop, '"').trim()}"` : prop,
                ].join('=');
            }).join();

            if (writeData) {
                const path = `${url}/write`;
                const body = `${meas} ${writeData} ${timestamp}`;

                for (let i = 1; i <= RETRIES_COUNT; i++) {
                    try {
                        await got(path, {method: 'POST', searchParams: {db}, body});
                        break;
                    } catch (err) {
                        if (i === RETRIES_COUNT) {
                            throw new Error([`InfluxDB "${db}" write error:`, path, body, err].join('\n').trim());
                        } else {
                            await delay(RETRIES_DELAY);
                        }
                    }
                }
            }
        } catch (err) {
            errors.push(err);
        }
    }

    if (errors.length > 0) {
        throw errors.join('\n\n');
    }
};
