'use strict';

const query = require('./query');
const write = require('./write');

/**
 * @param {object} data
 */
module.exports = async data => {
    const values = {};

    for (const [key, value] of Object.entries(data.values)) {
        const q = [`SELECT last("${key}") FROM "${data.meas}"`];

        const {results} = await query({...data, q: q.join(' ')});
        const [{series}] = results;

        if (series && series[0]) {
            values[key] = series[0].values[0][1] + value;
        } else {
            values[key] = value;
        }
    }

    await write({...data, values});
};
