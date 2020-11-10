'use strict';

/**
 * @param {string|number} id
 * @param {string} type
 * @returns {string}
 */
module.exports = (id, type = 'items') => `https://orna.guide/${type}?show=${id}`;
