'use strict';

const moment = require('moment');

/**
 * @param {object} opts
 * @param {object} opts.date
 * @param {string} opts.period
 * @returns {number}
 */
module.exports = ({

    date = moment(),
    period = 'days',

} = {}) => moment().diff(moment(date), period);
