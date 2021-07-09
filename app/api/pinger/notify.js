'use strict';

const sendMessage = require('../telegram/sendMessage');
const {pinger} = require('../../../env');

/**
 * @param {object} opts
 * @param {string} token
 * @returns {object}
 */
module.exports = (opts, token = pinger.tg) => sendMessage(opts, token);
