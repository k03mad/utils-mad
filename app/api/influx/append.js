'use strict';

const convert = require('../../utils/array/convert');
const query = require('./query');
const write = require('./write');

/**
 * @param {object} append
 */
module.exports = async append => {
    const prepared = [];

    for (const data of convert(append)) {
        const measOriginal = data.meas;
        const measAppend = `${data.meas}_append`;
        const measMax = `${data.meas}_max`;

        const valuesMax = {};
        const valuesAppend = {...data.values};

        for (const [key, value] of Object.entries(data.values)) {

            const queries = {
                original: [`SELECT last("${key}") FROM "${measOriginal}"`],
                max: [`SELECT last("${key}") FROM "${measMax}"`],
            };

            const [original, max] = await Promise.all(Object.values(queries).map(async q => {
                const {results} = await query({...data, q: q.join(' ')});
                const [{series}] = results;

                if (series && series[0]) {
                    return series[0].values[0][1];
                }

                return 0;
            }));

            if (value < original) {
                valuesMax[key] = original + max;
            }

            const maxValue = valuesMax[key] ? valuesMax[key] : max;
            valuesAppend[key] = value + maxValue;

        }

        const sendData = {
            original: [data.values, data.meas],
            max: [valuesMax, measMax],
            append: [valuesAppend, measAppend],
        };

        for (const elem in sendData) {
            if (Object.keys(sendData[elem][0]).length > 0) {
                [data.values, data.meas] = sendData[elem];
                prepared.push(data);
            }
        }
    }

    await write(prepared);
};
