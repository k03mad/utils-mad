'use strict';

const moment = require('moment');

/**
 * @param {object} opts
 * @param {string} opts.format
 * @param {number} opts.count
 * @param {string} opts.period
 * @returns {string}
 */
module.exports = ({

    format = 'DD.MM.YYYY HH:mm:ss',
    count = 1,
    period = 'days',

} = {}) => moment().subtract(count, period).format(format);
