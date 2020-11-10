'use strict';

const moment = require('moment');

/**
 * @param {string} format
 * @returns {string}
 */
module.exports = (format = 'DD.MM.YYYY HH:mm:ss') => moment().format(format);
