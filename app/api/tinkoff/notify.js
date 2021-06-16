'use strict';

const sendMessage = require('../telegram/sendMessage');
const {tinkoff} = require('../../../env');

/**
 * @param {object} opts
 * @param {string} token
 * @returns {object}
 */
module.exports = (opts, token = tinkoff.tg) => sendMessage(opts, token);
