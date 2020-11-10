'use strict';

const cheerio = require('cheerio');

/**
 * @param {object} opts
 * @param {string} opts.selector
 * @param {string} opts.body
 * @returns {Array}
 */
module.exports = ({body, selector}) => {
    const $ = cheerio.load(body);

    return $(selector)
        .map((_, elem) => $(elem).text())
        .get()
        .map(elem => elem.trim());
};
