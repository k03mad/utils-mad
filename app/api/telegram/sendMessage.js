'use strict';

const got = require('../../utils/request/got');
const {telegram} = require('../../../env');

/**
 * @param {object} opts
 * @param {string} token
 * @returns {object}
 */
module.exports = (opts, token) => got(
    `https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        json: {
            chat_id: telegram.me,
            parse_mode: 'Markdown',
            disable_web_page_preview: true,
            ...opts,
        },
    },
);
