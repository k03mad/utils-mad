'use strict';

const env = require('../../../env');
const now = require('nano-time');
const os = require('os');
const path = require('path');
const {promises: fs} = require('fs');

/**
 * @param {object} response
 */
module.exports = async response => {
    if (
        env.influx.request
        && env.influx.db
        && env.influx.url
    ) {
        response = response.response ? response.response : response;

        if (response?.requestUrl) {
            const parsed = new URL(response.requestUrl);

            if (!parsed.href.startsWith(env.influx.url)) {
                const timing = now();

                const data = {
                    statusCode: response?.statusCode,
                    method: response?.req?.method,
                    domain: parsed.hostname,
                    timing,
                };

                const cacheFile = path.join(
                    os.tmpdir(),
                    '_req_stats',
                    `${timing}.json`,
                );

                await fs.mkdir(path.dirname(cacheFile), {recursive: true});
                await fs.writeFile(cacheFile, JSON.stringify(data));
            }
        }
    }
};
