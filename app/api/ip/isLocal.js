'use strict';

/**
 * @param {string} ip
 * @returns {boolean}
 */
module.exports = ip => /^(127|10|172\.1[6-9]|172\.2\d|172\.3[01]|192\.168)\./.test(ip);
